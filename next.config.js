const rewrites = [
  {
    source: `/api/:path*`,
    destination: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/${process.env.NEXT_PUBLIC_API_KEY}/:path*`,
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  output: 'standalone',
  async rewrites() {
    return rewrites;
  },
};

module.exports = nextConfig;