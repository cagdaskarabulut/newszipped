const generateRobotsTxtAndSitemapXml = require("./scripts/generate-robots-txt");

/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;

module.exports = {
  // reactStrictMode: false,
  // webpack5: true,
  webpack5: true,
  images: {
    domains: ["ngqpwjurxt7h45ds.public.blob.vercel-storage.com"],
    unoptimized: true
  },
  webpack(config, { isServer }) {
    config.resolve.fallback = { fs: false };
    if (isServer) {
      generateRobotsTxtAndSitemapXml();
    }
    return config;
  },
};
