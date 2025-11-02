import { withPayload } from '@payloadcms/next/withPayload';
import process from 'node:process';


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  output: 'standalone',
  env: {
    URL: process.env.URL ?? 'http://localhost:3000',
    REPOSITORY_URL: process.env.REPOSITORY_URL,
  },
  turbopack: {},
};

export default withPayload(nextConfig);
