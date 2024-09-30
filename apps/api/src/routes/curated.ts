import { CACHE_CONTROL, ERROR_MESSAGE, REDIS_KEYS } from "@dragverse/constants";
import { REDIS_EXPIRY, dragverseDb, rSet } from "@dragverse/server";
import { Hono } from "hono";

const app = new Hono();

app.get("/profiles", async (c) => {
  try {
    c.header("Cache-Control", CACHE_CONTROL.FOR_FIVE_MINUTE);

    // const cachedValue = await rGet(REDIS_KEYS.CURATED_PROFILES);
    const cachedValue = ["0x01b89c"];
    if (cachedValue) {
      console.info("CACHE HIT");
      // return c.json({ success: true, ids: JSON.parse(cachedValue) });
      return c.json({ success: true, ids: cachedValue });
    }
    console.info("CACHE MISS");

    const results: { profileId: string }[] =
      await dragverseDb.$queryRaw`SELECT "profileId" FROM "Profile" WHERE "isCurated" = TRUE ORDER BY RANDOM() LIMIT 50;`;

    const ids = results.map(({ profileId }) => profileId);

    await rSet(
      REDIS_KEYS.CURATED_PROFILES,
      JSON.stringify(ids),
      REDIS_EXPIRY.THREE_HOURS
    );
    return c.json({ success: true, ids });
  } catch (error) {
    console.error("[CURATED PROFILES] Error:", error);
    return c.json({ success: false, message: ERROR_MESSAGE });
  }
});

export default app;
