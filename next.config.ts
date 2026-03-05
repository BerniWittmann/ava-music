import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  reactStrictMode: true,
  basePath: process.env.PAGES_BASE_PATH,
  images: { unoptimized: true }
};

export default nextConfig;
