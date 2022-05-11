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
    locales: ["es", "ca-ES", "en"],
    defaultLocale: "ca-ES"
  }
};

module.exports = nextConfig;
