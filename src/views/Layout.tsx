import { jsx } from 'hono/jsx';

interface LayoutProps {
  title: string;
  children: any;
}

export const Layout = ({ title, children }: LayoutProps) => (
  <html>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title}</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <script src="/static/client.js" defer></script>
      <style>
        {`
          /* グローバルなタイポグラフィと背景設定 */
          body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
            color: #333;
          }
          /* Markdownレンダリング用 (prose 内) の見出し・段落 */
          .prose h1 {
            font-size: 2.25rem !important;
            font-weight: 700 !important;
            margin-bottom: 1rem;
          }
          .prose h2 {
            font-size: 1.75rem !important;
            font-weight: 600 !important;
            margin-bottom: 0.75rem;
          }
          .prose h3 {
            font-size: 1.5rem !important;
            font-weight: 600 !important;
            margin-bottom: 0.75rem;
          }
          .prose p {
            margin-bottom: 1.25rem;
          }
        `}
      </style>
    </head>
    <body class="min-h-screen">
      <header class="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 text-white py-6 shadow-lg">
        <div class="container mx-auto px-4">
          <h1 class="text-5xl font-extrabold tracking-wide">
            <a href="/" class="hover:text-yellow-300 transition">DeepResearch Hub</a>
          </h1>
        </div>
      </header>
      <main class="container mx-auto px-4 py-10">
        {children}
      </main>
      <footer class="mt-10 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} DeepResearch Hub. All rights reserved.
      </footer>
    </body>
  </html>
);
