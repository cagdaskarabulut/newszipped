const generateRobotsTxtAndSitemapXml = require("./scripts/generate-robots-txt");

/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;

module.exports = {
  webpack5: true,
  images: {
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
