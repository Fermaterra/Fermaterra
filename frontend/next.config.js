/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    URL: "http://localhost:4001",
    MAP_API_KEY: "AIzaSyBmNi82O4o3ut9I5mICghJ__VoQB6EPP2s"

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
