/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['lh3.googleusercontent.com', 'firebasestorage.googleapis.com', 'www.google.com', 'avatars.githubusercontent.com',
          'graph.facebook.com'],
  },
}

module.exports = nextConfig
