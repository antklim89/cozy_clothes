import fs from 'node:fs';
import path from 'node:path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  output: 'standalone',
  env: {
    URL: process.env.URL ?? `http://localhost:${process.env.PORT ?? 3000}`,
  },
};

const decapCmsJs = await fs.promises.readFile(path.resolve('./node_modules/decap-cms/dist/decap-cms.js'), 'utf8');
await fs.promises.writeFile(path.resolve('./public/admin/decap-cms.js'), decapCmsJs);

export default nextConfig;
