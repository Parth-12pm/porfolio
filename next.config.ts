import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL('https://static.cdnlogo.com/logos/g/48/github-icon_800.png')],
  }
};

export default nextConfig;
