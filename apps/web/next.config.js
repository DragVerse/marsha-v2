/** @type {import('next').NextConfig} */
const allowedBots =
  ".*(bot|telegram|baidu|bing|yandex|iframely|whatsapp|facebook|metainspector|twitterbot|trendictionbot|Applebot|PetalBot).*";
const headers = [{ key: "Cache-Control", value: "public, max-age=3600" }];

const moduleExports = {
  transpilePackages: [
    "@dragverse/lens",
    "@dragverse/browser",
    "@dragverse/generic",
    "@dragverse/ui"
  ],
  reactStrictMode: process.env.NODE_ENV === "production",
  rewrites() {
    return [
      {
        source: "/sitemaps/:match*",
        destination: "https://static.dragverse.app/sitemaps/:match*"
      },
      {
        source: "/u/:match*",
        has: [{ key: "user-agent", type: "header", value: allowedBots }],
        destination: "https://og.dragverse.app/u/:match*"
      },
      {
        source: "/watch/:match*",
        has: [{ key: "user-agent", type: "header", value: allowedBots }],
        destination: "https://og.dragverse.app/watch/:match*"
      }
    ];
  },
  redirects() {
    return [
      {
        source: "/channel/:handle(.+).lens",
        destination: "/u/:handle",
        permanent: true
      },
      {
        source: "/channel/:handle(.+).test",
        destination: "/u/:handle",
        permanent: true
      },
      {
        source: "/channel/:handle",
        destination: "/u/:handle",
        permanent: true
      },
      {
        source: "/channel/:namespace/:handle",
        destination: "/u/:namespace/:handle",
        permanent: true
      },
      {
        source: "/signup",
        destination: "/login?signup=true",
        permanent: true
      },
      {
        source: "/discord",
        destination: "https://discord.gg/TbjTTgTh",
        permanent: true
      },
      {
        source: "/donate",
        destination: "https://giveth.io/project/dragverse",
        permanent: true
      },
      {
        source: "/gitcoin",
        destination: "https://explorer.gitcoin.co/#/round/42161/25/50",
        permanent: true
      },
      {
        source: "/decentraland",
        destination: "https://play.decentraland.org/?realm=dragverse.dcl.eth",
        permanent: true
      },
      {
        source: "/spatial",
        destination:
          "https://www.spatial.io/s/Dragverse-6330ebb42e62cd0001922a97?share=6796815018867406198",
        permanent: true
      }
    ];
  },
  headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin" }
        ]
      },
      { source: "/terms", headers },
      { source: "/privacy", headers },
      { source: "/thanks", headers }
    ];
  }
};

module.exports = moduleExports;
