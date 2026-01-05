import type { NextConfig } from "next";

// next.config.ts

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.tiktok.com https://*.tiktokcdn.com https://accounts.google.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https://*.tiktok.com https://*.tiktokcdn.com https://teds-zaza-website.s3.amazonaws.com https://teds-zaza-website.s3.us-east-1.amazonaws.com;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-src 'self' https://www.tiktok.com https://accounts.google.com;
    connect-src 'self' https://teds-zaza-website.s3.amazonaws.com https://teds-zaza-website.s3.us-east-1.amazonaws.com;
    frame-ancestors 'none';
    upgrade-insecure-requests;
`.replace(/\n/g, "");

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
  // Add this headers section to handle your CSP
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader,
          },
        ],
      },
    ];
  },
};

export default nextConfig;