import { jsx } from 'hono/jsx';
import { Layout } from './Layout';
import { marked } from 'marked';
import type { Post } from '../types';

interface PostProps {
  post: Post;
}

export const renderPost = ({ post }: PostProps) => (
  <Layout title={`${post.title} - DeepResearch Hub`}>
    <article class="max-w-screen-xl mx-auto bg-white p-10 rounded-2xl shadow-2xl">
      <h1 class="text-4xl font-extrabold text-gray-900 mb-8">{post.title}</h1>

      {/* overflow-x-auto で横スクロールも許可しつつ */}
      <div class="overflow-x-auto">
        <div
          class="prose prose-xl leading-relaxed text-gray-700 w-full"
          dangerouslySetInnerHTML={{ __html: marked.parse(post.content) }}
        />
      </div>

      <div class="mt-10 flex flex-col md:flex-row md:items-center md:justify-between">
        <p class="text-sm text-gray-500 mb-4 md:mb-0">
          投稿日時: {new Date(post.created_at * 1000).toLocaleString()}
        </p>
        <a
          href="/"
          class="inline-block px-5 py-2 rounded-full bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition"
        >
          ホームに戻る
        </a>
      </div>
    </article>

    {/* テーブル・セル内の折り返しを強制するCSS */}
    <style>{`
      /* テーブルは固定レイアウトにし、横幅100% */
      .prose table {
        table-layout: fixed;
        width: 100%;
        border-collapse: collapse;
        margin: 1.5rem 0;
      }
      /* セル単位での最大幅＆強制折り返し */
      .prose th, .prose td {
        max-width: 300px; /* 必要に応じて調整 */
        border: 1px solid #ddd;
        padding: 0.75rem 1rem;
        vertical-align: top;

        /* ▼ 自動開業用プロパティ ▼ */
        word-wrap: break-word;      /* レガシー */
        overflow-wrap: break-word;  /* モダン */
        word-break: break-all;      /* とにかく折る */
        white-space: normal;        /* 正常な余白処理 */
      }
      .prose th {
        background-color: #f9fafb;
        font-weight: 600;
      }

      /* hr の上下余白など */
      .prose hr {
        margin-top: 2rem;
        margin-bottom: 2rem;
      }
    `}</style>
  </Layout>
);
