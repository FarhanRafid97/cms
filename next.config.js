/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bristars.bri.co.id',
        port: '',
        pathname: '/bristars/foto/get/**',
      },
    ],
  },
};

module.exports = nextConfig;
