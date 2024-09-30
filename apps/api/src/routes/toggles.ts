import { CACHE_CONTROL, ERROR_MESSAGE } from "@dragverse/constants";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { object, string } from "zod";

const app = new Hono();

app.get(
  "/:profileId",
  zValidator(
    "param",
    object({
      profileId: string()
    })
  ),
  async (c) => {
    const { profileId } = c.req.param();
    c.header("Cache-Control", CACHE_CONTROL.FOR_FIVE_MINUTE);

    // const cacheKey = `${REDIS_KEYS.PROFILE_TOGGLES}:${profileId}`;
    // const cachedValue = await rGet(cacheKey);
    // if (cachedValue) {
    //   console.info("CACHE HIT");
    //   return c.json({ success: true, toggles: JSON.parse(cachedValue) });
    // }
    // console.info("CACHE MISS");

    try {
      // const result = await dragverseDb.profile.findUnique({
      //   where: {
      //     profileId
      //   },
      //   select: {
      //     isSuspended: true,
      //     isLimited: true
      //   }
      // });

      const toggles = {
        // suspended: Boolean(result?.isSuspended),
        // limited: Boolean(result?.isLimited)
        suspended: false,
        limited: false
      };

      // await rSet(cacheKey, JSON.stringify(toggles), REDIS_EXPIRY.ONE_DAY);
      return c.json({
        success: true,
        toggles
      });
    } catch (error) {
      console.error("[TOGGLES] Error:", error);
      return c.json({ success: false, message: ERROR_MESSAGE });
    }
  }
);

export default app;
