import { LensEndpoint } from "./endpoints";

export const TAPE_APP_NAME = "Dragverse";
export const TAPE_APP_DESCRIPTION = "Empowering Drag Creators";
export const TAPE_USER_AGENT =
  "Dragverse/1.0 (compatible; DragverseMedia/1.0; +https://dragverse.app)";

export const LENS_ENV = process.env.NEXT_PUBLIC_ENVIRONMENT ?? "mainnet";
export const IS_MAINNET = LENS_ENV === "mainnet";

export const IS_DEVELOPMENT = process.env.NODE_ENV === "development";
export const IS_PRODUCTION = !IS_DEVELOPMENT;

export const STATIC_ASSETS = "https://dragverse.4everland.store";
export const TAPE_WEBSITE_URL = IS_MAINNET
  ? "https://dragverse.app"
  : "https://testnet.dragverse.app";
export const LENS_IMAGEKIT_SNAPSHOT_URL = "https://ik.imagekit.io/ltxyz";
export const TAPE_CURATOR_ID = "0x01b89c";
export const TAPE_ADMIN_ADDRESS = "0x571f4905641E1E55f1f1ea56a9bbb797275afD01";

// infinite scroll
export const INFINITE_SCROLL_ROOT_MARGIN = "800px";

export const IMAGE_TRANSFORMATIONS = {
  AVATAR: "tr:w-60,h-60",
  AVATAR_LG: "tr:w-300,h-300",
  THUMBNAIL: "tr:w-720,h-404",
  THUMBNAIL_V: "tr:w-404,h-720",
  SQUARE: "tr:w-200,h-200"
};

// lens
export const MAINNET_API_URL = LensEndpoint.Mainnet;
export const TESTNET_API_URL = LensEndpoint.Testnet;
export const LENS_API_URL = IS_MAINNET ? MAINNET_API_URL : TESTNET_API_URL;

// api urls
export const TAPE_EMBED_URL = IS_MAINNET
  ? "https://embed.dragverse.app"
  : "https://embed-testnet.dragverse.app";
export const TAPE_API_URL = IS_PRODUCTION
  ? "https://api.dragverse.app"
  : "http://localhost:3000";

// tape addresses
export const TAPE_SIGNUP_PROXY_ADDRESS = IS_MAINNET
  ? "0xD0f6d9676d36F5f4AF5765fCb78c388B51577327"
  : "0xe6869F02F97229E95116A9647b1b005140c80A49";

// lens addresses
export const LENS_PERMISSIONLESS_CREATOR_ADDRESS = IS_MAINNET
  ? "0x0b5e6100243f793e480DE6088dE6bA70aA9f3872"
  : "0xCb4FB63c3f13CB83cCD6F10E9e5F29eC250329Cc";
export const LENSHUB_PROXY_ADDRESS = IS_MAINNET
  ? "0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d"
  : "0xC1E77eE73403B8a7478884915aA599932A677870";
export const WMATIC_TOKEN_ADDRESS = IS_MAINNET
  ? "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270"
  : "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889";
export const BONSAI_TOKEN_ADDRESS = IS_MAINNET
  ? "0x3d2bD0e15829AA5C362a4144FdF4A1112fa29B5c"
  : "0x3d2bD0e15829AA5C362a4144FdF4A1112fa29B5c";

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
export const TESTNET_ALLOWED_TOKENS = [
  {
    address: "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889",
    decimals: 18,
    name: "Wrapped Matic",
    symbol: "WMATIC"
  },
  {
    address: "0x001B3B4d0F3714Ca98ba10F6042DaEbF0B1B7b6F",
    decimals: 18,
    name: "DAI Stablecoin",
    symbol: "DAI"
  },
  {
    address: "0x0FA8781a83E46826621b3BC094Ea2A0212e71B23",
    decimals: 18,
    name: "USD Coin",
    symbol: "USDC"
  }
];

// polygon
export const POLYGON_RPC_URLS = IS_MAINNET
  ? [
      "https://rpc.ankr.com/polygon",
      "https://polygon.llamarpc.com",
      "https://polygon-bor-rpc.publicnode.com"
    ]
  : [
      "https://rpc.ankr.com/polygon_amoy",
      "https://rpc-amoy.polygon.technology",
      "https://polygon-amoy-bor-rpc.publicnode.com"
    ];
export const POLYGONSCAN_URL = IS_MAINNET
  ? "https://polygonscan.com"
  : "https://amoy.polygonscan.com";
export const ETHERSCAN_URL = IS_MAINNET
  ? "https://etherscan.io"
  : "https://goerli.etherscan.io";
export const POLYGON_CHAIN_ID = IS_MAINNET ? 137 : 80002;

// ipfs
export const IPFS_FREE_UPLOAD_LIMIT = IS_MAINNET ? 10000 : 0; // in MB
export const IPFS_GATEWAY_URL = "https://gw.ipfs-lens.dev/ipfs";
export const EVER_ENDPOINT = "https://endpoint.4everland.co";
export const EVER_REGION = "4EVERLAND";
export const EVER_BUCKET_NAME = "tape-2024";

// walletconnect
export const WC_PROJECT_ID = "6c98e7b769b4ccd8dd7a5533cb65d34b";
export const EXPLORER_RECOMMENDED_WALLET_IDS = [
  "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96", // metamask
  "ecc4036f814562b41a5268adc86270fba1365471402006302e70169465b7ac18", // zerion
  "1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369", // rainbow
  "c03dfee351b6fcc421b4494ea33b9d4b92a984f87aa76d1663bb28705e95034a", // uniswap
  "19177a98252e07ddfc9af2083ba8e07ef627cb6103467ffebb3f8f4205fd7927" // ledger live
];

// livepeer
export const LIVEPEER_STUDIO_API_KEY = IS_PRODUCTION
  ? "6a7a905f-72d9-4303-adda-09679b3f5f8c"
  : "cf2eb693-e25c-42fe-b5d9-a8ce29124ae6";

// livestream
export const DRAGVERSE_LIVESTREAM_PLAYBACK_ID = "b15bdkzvzbpnhk64";
export const DRAGVERSE_LIVESTREAM_PLAYBACK_URL =
  "https://livepeercdn.studio/hls/b15bdkzvzbpnhk64/index.m3u8";
export const DRAGVERSE_LIVESTREAM_STREAM_ID =
  "b15bafcf-995d-4992-99ec-b52162a50ac8";

// privy
export const PRIVY_APP_ID = IS_PRODUCTION
  ? "cluxpw8z700qricqh0nu9urw5"
  : "clt93hfel08df9kmxfmnb7t3r";

// api urls
export const WORKER_TRAILS_URL = `${TAPE_API_URL}/trails`;
export const WORKER_IRYS_METADATA_UPLOAD_URL = `${TAPE_API_URL}/metadata`;
export const WORKER_LOGTAIL_INGEST_URL = `${TAPE_API_URL}/tail`;
export const WORKER_STS_TOKEN_URL = `${TAPE_API_URL}/sts`;
export const WORKER_DID_URL = `${TAPE_API_URL}/did`;
export const WORKER_TOWER_URL = `${TAPE_API_URL}/tower`;
export const WORKER_OEMBED_URL = `${TAPE_API_URL}/oembed`;
export const WORKER_VERIFIED_URL = `${TAPE_API_URL}/verified`;
export const WORKER_CURATED_PROFILES_URL = `${TAPE_API_URL}/curated/profiles`;
export const WORKER_TOGGLES_URL = `${TAPE_API_URL}/toggles`;
export const WORKER_AVATAR_URL = `${TAPE_API_URL}/avatar`;
export const WORKER_ALLOWED_TOKENS_URL = `${TAPE_API_URL}/allowed-tokens`;

// redis
export const REDIS_KEYS = {
  TOWER: "tower",
  TRAILS: "trails",
  ALLOWED_TOKENS: "allowed-tokens",
  PROFILE_TOGGLES: "profile-toggles",
  CURATED_PROFILES: "curated-profiles",
  VERIFIED_PROFILES: "verified-profiles",
  CURATED_PUBLICATIONS: "curated-publications"
};

// irys
export const IRYS_GATEWAY_URL = "https://gateway.irys.xyz";
export const IRYS_CONNECT_MESSAGE = "Estimating video upload cost...";
export const REQUESTING_SIGNATURE_MESSAGE = "Requesting signature...";
export const MOONPAY_URL = IS_MAINNET
  ? "https://buy.moonpay.com"
  : "https://buy-sandbox.moonpay.com";

// error messages
export const ERROR_MESSAGE = "Oops, something went wrong!";
export const SIGN_IN_REQUIRED = "Login to continue";

// App Ids
export const TAPE_APP_ID = "dragverse";
export const TAPE_BYTES_APP_ID = "dragverse-bytes";
export const LENSTUBE_APP_ID = "tape";
export const LENSTUBE_BYTES_APP_ID = "tape-bytes";
export const ALLOWED_APP_IDS = [
  TAPE_APP_ID,
  LENSTUBE_APP_ID
  // 'lenster',
  // 'orb',
  // 'hey',
  // 'buttrfly',
  // 'lensplay',
  // 'diversehq'
];

// official
export const TAPE_X_HANDLE = "dragverseapp";
export const TAPE_GITHUB_HANDLE = "dragverse";
export const TAPE_LOGO = `${STATIC_ASSETS}/dragverse.webp`;
export const DRAGVERSE_LOGO = `${STATIC_ASSETS}/dragverse.svg`;
export const DRAGVERSE_FAVICON = `${STATIC_ASSETS}/favicon.ico`;
export const DRAGVERSE_FAVICON_32 = `${STATIC_ASSETS}/favicon-32x32.png`;
export const DRAGVERSE_FAVICON_16 = `${STATIC_ASSETS}/favicon-16x16.png`;
export const DRAGVERSE_APPLE_TOUCH_ICON = `${STATIC_ASSETS}/apple-touch-icon.png`;
export const TAPE_STATUS_PAGE = "https://dragverse.canny.io";
export const TAPE_FEEDBACK_URL = "https://dragverse.canny.io";

// dragverse
export const DRAGVERSE_SPATIAL_URL =
  "https://www.spatial.io/s/Dragverse-6330ebb42e62cd0001922a97?share=6796815018867406198";
export const DRAGVERSE_DECENTRALAND_URL =
  "https://play.decentraland.org/?realm=dragverse.dcl.eth";

// fallback
export const FALLBACK_THUMBNAIL_URL = `${TAPE_LOGO}`;
export const FALLBACK_COVER_URL = `${TAPE_LOGO}`;
export const OG_IMAGE = `${TAPE_LOGO}`;
export const DRAGVERSE_BANNER_URL = `${STATIC_ASSETS}/dragverse-banner.jpeg`;
export const BUILDING_PROUDLY_URL = `${STATIC_ASSETS}/building-proudly.jpeg`;
export const BASE_LIVESTREAM_VIDEO_URL = `${STATIC_ASSETS}/dragverse-base-live-video.mp4`;
export const TWITTER_ICON_URL = `${STATIC_ASSETS}/x.avif`;
export const LINKEDIN_ICON_URL = `${STATIC_ASSETS}/linkedin-logo.png`;
export const REDDIT_ICON_URL = `${STATIC_ASSETS}/reddit-logo.png`;
export const ENS_ICON_URL = `${STATIC_ASSETS}/ens-logo.webp`;
export const MOUNTAINS_BACKGROUND_URL = `${STATIC_ASSETS}/mountains_background.jpeg`;
export const WINDOW_BACKGROUND_URL = `${STATIC_ASSETS}/windows_background.jpeg`;
export const HEY_LOGO = `${STATIC_ASSETS}/hey.webp`;
export const TAPEXYZ_LOGO = `${STATIC_ASSETS}/tape.jpeg`;

// admin
export const ADMIN_IDS = IS_MAINNET ? ["0x2d"] : ["0x34"];
export const MOD_IDS = IS_MAINNET ? [...ADMIN_IDS, "0x24"] : ["0x2f"];
export const DRAGVERSE_ADMIN_ADDRESS =
  "0x571f4905641E1E55f1f1ea56a9bbb797275afD01";

// lens
export const ALLOWED_VIDEO_MIME_TYPES = [
  "video/mp4",
  "video/mpeg",
  "video/webm",
  "video/quicktime",
  "video/mov"
];
export const ALLOWED_UPLOAD_MIME_TYPES = [...ALLOWED_VIDEO_MIME_TYPES];

export const LENS_NAMESPACE_PREFIX = IS_MAINNET ? "lens/" : "test/";
export const LEGACY_LENS_HANDLE_SUFFIX = IS_MAINNET ? ".lens" : ".test";

// other apps
export const HEY_WEBSITE_URL = IS_MAINNET
  ? "https://hey.xyz"
  : "https://testnet.hey.xyz";

// banners
export const SHOW_GITCOIN_BANNER = false;
export const GITCOIN_LIVE_ROUND = 22;

export const TAPEXYZ_WEBSITE_URL = IS_MAINNET
  ? "https://dragverse.app"
  : "https://testnet.dragverse.app";

// cache control
export const CACHE_CONTROL = {
  FOR_ONE_YEAR: "public, max-age=31536000, s-maxage=31536000",
  FOR_ONE_MONTH: "public, max-age=2592000, s-maxage=2592000",
  FOR_ONE_WEEK: "public, max-age=604800, s-maxage=604800",
  FOR_ONE_DAY: "public, max-age=86400, s-maxage=86400",
  FOR_ONE_HOUR: "public, max-age=3600, s-maxage=3600",
  FOR_FIFTEEN_MINUTE: "public, max-age=900, s-maxage=900",
  FOR_FIVE_MINUTE: "public, max-age=300, s-maxage=300"
};
