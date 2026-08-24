/**
 * e2e tests run against a real Postgres (docker compose, or the CI service
 * container) rather than a mock: the point is to prove the Drizzle client,
 * pool configuration and health probe actually work against a server.
 */
process.env.DATABASE_URL ??= 'postgresql://princetonbd:princetonbd@localhost:55432/princetonbd';
process.env.DATABASE_URL_UNPOOLED ??=
  'postgresql://princetonbd:princetonbd@localhost:55432/princetonbd';
process.env.WORKOS_API_KEY ??= 'sk_test_e2e';
process.env.WORKOS_CLIENT_ID ??= 'client_e2e';
process.env.LOG_LEVEL ??= 'fatal';
process.env.NODE_ENV ??= 'test';
