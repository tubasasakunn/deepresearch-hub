// src/index.ts
import { Hono } from 'hono';
import { api } from './routes/api';
import { renderHome } from './views/Home';
import { renderPost } from './views/Post';
import { drizzle } from 'drizzle-orm/d1';
import * as schema from './db/schema';
import { Env } from './types';
import { eq, desc } from 'drizzle-orm';

// Inline client JS (served at /static/client.js)
const clientJs = `
// Client-side JS for submitting posts
async function submitPost(event) {
  event.preventDefault();
  const form = event.target;
  const data = {
    title: form.title.value,
    content: form.content.value
  };
  try {
    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (response.ok) {
      window.location.href = '/';
    } else {
      alert('Post submission failed');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error occurred');
  }
  return false;
}
`;

const app = new Hono<{ Bindings: Env }>();

// Serve static client.js
app.get('/static/client.js', (c) => {
  return c.text(clientJs, {
    headers: { 'Content-Type': 'application/javascript' }
  });
});

// API routes
app.route('/api', api);

// Home page – list posts and show a new post form
app.get('/', async (c) => {
  const db = drizzle(c.env.DB, { schema });
  const posts = await db.select().from(schema.posts).orderBy(desc(schema.posts.created_at));
  return c.html(renderHome({ posts }));
});

// Post detail page
app.get('/posts/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const db = drizzle(c.env.DB, { schema });
  const [post] = await db.select().from(schema.posts).where(eq(schema.posts.id, id)).limit(1);
  if (!post) {
    return c.notFound();
  }
  return c.html(renderPost({ post }));
});

export default {
  fetch: app.fetch
} as const;
