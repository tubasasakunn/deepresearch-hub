import type { Config } from 'drizzle-kit';

export default {
  schema: './src/db/schema.ts',
  out: './drizzle',
  driver: 'd1-http',
  strict: true,
  verbose: true,
} as Config;
