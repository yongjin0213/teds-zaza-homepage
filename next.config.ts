import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "teds-zaza-website.s3.us-east-1.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "teds-zaza-website.s3.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
