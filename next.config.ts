import { env } from '@/shared/lib/env';
import '@/shared/lib/env-server';
import { withPayload } from '@payloadcms/next/withPayload';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  output: 'standalone',
  cacheComponents: true,
  typedRoutes: true,
  env,
  turbopack: {},
};

export default withPayload(nextConfig);
