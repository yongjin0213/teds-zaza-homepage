import type { NextConfig } from "next";

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.tiktok.com https://*.tiktokcdn.com https://accounts.google.com https://pagead2.googlesyndication.com https://*.googleadservices.com https://*.google.com https://googleads.g.doubleclick.net https://www.googletagmanager.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https://*.tiktok.com https://*.tiktokcdn.com https://teds-zaza-website.s3.amazonaws.com https://teds-zaza-website.s3.us-east-1.amazonaws.com https://*.googleadservices.com https://*.google.com https://googleads.g.doubleclick.net https://*.googlesyndication.com;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self' https://accounts.google.com;
    frame-src 'self' https://www.tiktok.com https://accounts.google.com https://googleads.g.doubleclick.net https://*.googlesyndication.com https://tpc.googlesyndication.com;
    connect-src 'self' https://teds-zaza-website.s3.amazonaws.com https://teds-zaza-website.s3.us-east-1.amazonaws.com https://accounts.google.com https://*.google-analytics.com https://*.googleadservices.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net;
    frame-ancestors 'none';
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