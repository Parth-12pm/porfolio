import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.cdnlogo.com",
        pathname: "/logos/g/48/github-icon_800.png",
      },
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        pathname:
          "/lrigu76hy/tailark/night-background.jpg?updatedAt=1745733451120",
      },
    ],
  },
};

export default nextConfig;
