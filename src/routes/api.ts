// src/routes/api.ts
import { Hono } from 'hono';
import { drizzle } from 'drizzle-orm/d1';
import * as schema from '../db/schema';
import { Env, PostCreateInput } from '../types';
import { sql } from 'drizzle-orm';

const api = new Hono<{ Bindings: Env }>();

// Create a new post
api.post('/posts', async (c) => {
  const input = await c.req.json<PostCreateInput>();
  const db = drizzle(c.env.DB, { schema });
  const now = Math.floor(Date.now() / 1000);
  try {
    const [post] = await db.insert(schema.posts)
      .values({
        title: input.title,
        content: input.content,
        created_at: sql`${now}`
      })
      .returning();
    return c.json({ success: true, data: post });
  } catch (error) {
    return c.json({ success: false, error: 'Failed to create post' }, 500);
  }
});

export { api };
