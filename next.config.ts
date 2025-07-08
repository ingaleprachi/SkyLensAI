import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export', // ✅ Required for static export
};

export default nextConfig;
