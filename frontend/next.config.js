/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    URL: "http://localhost:4001",
  },
  images: {
    domains: ["firebasestorage.googleapis.com"]
  },
  i18n: {
    locales: ["es", "ca", "en"],
    defaultLocale: "en"
  }
};

module.exports = nextConfig;
