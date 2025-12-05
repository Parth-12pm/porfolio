import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  // Removed output: "export" to enable API routes and server features on Vercel
  // trailingSlash: true, // Only needed for static export
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.cdnlogo.com", // Allow all cdnlogo.com subdomains
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
