// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ✅ This skips ESLint errors during builds (not recommended long term)
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
