// src/types/index.ts
import { DrizzleD1Database } from 'drizzle-orm/d1';
import * as schema from '../db/schema';

export type Database = DrizzleD1Database<typeof schema>;

export interface Env {
  DB: D1Database;
  ENVIRONMENT: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  created_at: number;
}

export interface PostCreateInput {
  title: string;
  content: string;
}
