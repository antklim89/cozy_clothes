import fs from 'node:fs';
import path from 'node:path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  images: {
    domains: [new URL(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000').hostname],
  },
  output: 'standalone',
};

const decamCmsJs = await fs.promises.readFile(path.resolve('./node_modules/decap-cms/dist/decap-cms.js'), 'utf8');
await fs.promises.writeFile(
  path.resolve('./public/admin/index.html'),
  `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Content Manager</title>
</head>
<body>
  <script>${decamCmsJs}</script>
</body>
</html>`,
);

export default nextConfig;
