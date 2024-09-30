import { CACHE_CONTROL, ERROR_MESSAGE, REDIS_KEYS } from "@dragverse/constants";
import { REDIS_EXPIRY, dragverseDb, rSet } from "@dragverse/server";
import { Hono } from "hono";

const app = new Hono();

app.get("/", async (c) => {
  try {
    c.header("Cache-Control", CACHE_CONTROL.FOR_FIVE_MINUTE);

    const cachedValue = [
      "0x01b89c",
      "0x25bb",
      "0x01b98e",
      "0x01ec9c",
      "0x01ed5f",
      "0x01ecc3",
      "0x4bed"
    ];
    // const cachedValue = await rGet(REDIS_KEYS.VERIFIED_PROFILES);
    if (cachedValue) {
      console.info("CACHE HIT");
      return c.json({ success: true, ids: cachedValue });
    }
    console.info("CACHE MISS");

    const results = await dragverseDb.profile.findMany({
      where: {
        isVerified: true
      },
      select: {
        profileId: true
      }
    });

    const ids = results.map(({ profileId }) => profileId);

    await rSet(
      REDIS_KEYS.VERIFIED_PROFILES,
      JSON.stringify(ids),
      REDIS_EXPIRY.ONE_DAY
    );
    return c.json({ success: true, ids });
  } catch (error) {
    console.error("[VERIFIED] Error:", error);
    return c.json({ success: false, message: ERROR_MESSAGE });
  }
});

export default app;
