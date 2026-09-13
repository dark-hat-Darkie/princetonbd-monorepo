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
process.env.ADMIN_EMAILS ??= '';
/* Presigning never contacts the bucket, so these only need to parse. */
process.env.S3_REGION ??= 'auto';
process.env.S3_BUCKET ??= 'e2e-media';
process.env.S3_ACCESS_KEY_ID ??= 'e2e';
process.env.S3_SECRET_ACCESS_KEY ??= 'e2e-secret';
process.env.S3_PUBLIC_URL ??= 'http://localhost:9000/e2e-media';
