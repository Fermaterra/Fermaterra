/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    URL: "https://front-test-api.herokuapp.com/api",
    MAP_API_KEY: "AIzaSyBmNi82O4o3ut9I5mICghJ__VoQB6EPP2s",
    APIKEY: "AIzaSyDMlt8Am9Pzi7bBxIMGdRQkfiTQhLQOago",
    AUTHDOMAIN: "fermaterra-1fd31.firebaseapp.com",
    APPID: "1:462074134912:web:d8397cdd47099b0f034165",
    STRIPE_PUBLIC_KEY: "pk_test_51LCfVSLSXhgUQpyDUQyuxDJ0Eh9LkWs459gslBXpOOAEGtdv7kbUBBHBlzyKdVKMJVTqewyyAUTIwo5GkFHc5H6100eHWrLbDF"
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
