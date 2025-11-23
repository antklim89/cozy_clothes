import { withPayload } from '@payloadcms/next/withPayload';
import type { NextConfig } from 'next';
import process from 'node:process';


const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  output: 'standalone',
  cacheComponents: true,
  typedRoutes: true,
  env: {
    URL: process.env.URL ?? 'http://localhost:3000',
    REPOSITORY_URL: process.env.REPOSITORY_URL,
  },
  turbopack: {},
};

export default withPayload(nextConfig);
