declare namespace NodeJS {
  interface ProcessEnv {
    EVER_ACCESS_KEY: string;
    EVER_ACCESS_SECRET: string;
    LOGTAIL_API_KEY: string;
    IP_API_KEY: string;
    WALLET_PRIVATE_KEY: string;
    DRAGVERSE_DATABASE_URL: string;
    INDEXER_DATABASE_URL: string;
    REDIS_URL: string;
    CLICKHOUSE_URL: string;
    CLICKHOUSE_PASSWORD: string;
  }
}
