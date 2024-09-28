import {
  ERROR_MESSAGE,
  IRYS_GATEWAY_URL,
  TAPE_APP_NAME
} from "@dragverse/constants";
import { Uploader } from "@irys/upload";
import { Matic } from "@irys/upload-ethereum";
import { signMetadata } from "@lens-protocol/metadata";
import { Hono } from "hono";
import { privateKeyToAccount } from "viem/accounts";

const app = new Hono();

const { WALLET_PRIVATE_KEY } = process.env;
const getIrysUploader = async () =>
  await Uploader(Matic).withWallet(WALLET_PRIVATE_KEY);

app.post("/", async (c) => {
  try {
    const payload = await c.req.json();

    const irys = await getIrysUploader();

    const account = privateKeyToAccount(`0x${WALLET_PRIVATE_KEY}`);
    const signedMetadata = await signMetadata(payload, (message) =>
      account.signMessage({ message })
    );

    const startTime = performance.now();
    const receipt = await irys.upload(JSON.stringify(signedMetadata), {
      tags: [
        { name: "Content-Type", value: "application/json" },
        { name: "App-Name", value: TAPE_APP_NAME }
      ]
    });
    const took = performance.now() - startTime;
    console.log(`[METADATA] irys upload took ${took}ms`);

    if (!receipt.id) {
      return c.json({
        success: true,
        message: ERROR_MESSAGE,
        irysRes: JSON.stringify(receipt)
      });
    }

    return c.json({
      success: true,
      id: receipt.id,
      url: `${IRYS_GATEWAY_URL}/${receipt.id}`
    });
  } catch (error) {
    console.error("[METADATA] Error:", error);
    return c.json({ success: false, message: ERROR_MESSAGE });
  }
});

export default app;
