/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'fortresstaxandtrust.s3.us-east-1.amazonaws.com',
      },
    ],
  },
}

module.exports = nextConfig 