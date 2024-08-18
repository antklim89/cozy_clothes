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

const decapCmsSrc = path.resolve('./node_modules/decap-cms/dist/decap-cms.js');
const decapCmsDestination = path.resolve('./public/admin/decap-cms.js');

try {
  await fs.promises.access(decapCmsDestination, fs.constants.F_OK);
} catch {
  await fs.promises.copyFile(decapCmsSrc, decapCmsDestination);
}

export default nextConfig;
