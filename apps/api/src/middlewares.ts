import type { Context, HonoRequest, Next } from "hono";
import { cors as corsMiddleware } from "hono/cors";

const allowedOrigins = [
  "https://dragverse.app",
  "https://www.dragverse.app",
  "https://embed.dragverse.app",
  "https://og.dragverse.app"
];

const getIp = (req: HonoRequest) =>
  req.header("x-forwarded-for") || req.header("remote-addr");

export const originLogger = async (c: Context, next: Next) => {
  const origin = c.req.header("Origin");
  const ua = c.req.header("User-Agent");
  const ip = getIp(c.req);
  console.info(
    `[${c.req.method}] method from [${origin ?? ua}] with ip [${ip}] to [${c.req.path}]`
  );
  await next();
};

export const cors = corsMiddleware({
  // origin: IS_PRODUCTION ? allowedOrigins : ["*"],
  origin: ["*"],
  allowMethods: ["GET", "POST", "OPTIONS"]
});
