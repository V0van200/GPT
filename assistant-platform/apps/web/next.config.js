/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Telegram WebApp обычно открывается внутри WebView
  // поэтому держим всё максимально простым.
};

module.exports = nextConfig;
