import { jsx } from 'hono/jsx';
import { Layout } from './Layout';
import type { Post } from '../types';

interface HomeProps {
  posts: Post[];
}

export const renderHome = ({ posts }: HomeProps) => (
  <Layout title="DeepResearch Hub">
    <div class="space-y-10">
      {/* 投稿一覧 */}
      <div class="space-y-6">
        {posts.map(post => (
          <a
            href={`/posts/${post.id}`}
            class="block p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-200"
          >
            {/* タイトルサイズは一般的な一覧用に小さめに調整 */}
            <h2 class="text-base font-semibold text-gray-800">{post.title}</h2>
            <div class="mt-1 text-sm text-gray-500">
              投稿日時: {new Date(post.created_at * 1000).toLocaleString()}
            </div>
          </a>
        ))}
      </div>

      {/* 新規投稿フォーム（一覧の下部に配置） */}
      <div class="bg-white p-8 rounded-2xl shadow-xl">
        <h2 class="text-2xl font-bold mb-6 text-gray-700">新規投稿を作成</h2>
        <form onsubmit="return submitPost(event)" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-600">タイトル</label>
            <input
              type="text"
              name="title"
              required
              class="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600">本文 (Markdown)</label>
            <textarea
              name="content"
              required
              class="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows="8"
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              class="w-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 text-white font-semibold hover:opacity-90 transition"
            >
              投稿する
            </button>
          </div>
        </form>
      </div>
    </div>
  </Layout>
);
