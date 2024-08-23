/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  output: 'standalone',
  env: {
    URL: process.env.URL ?? `http://localhost:${process.env.PORT ?? 3000}`,
  },
};

export default nextConfig;
