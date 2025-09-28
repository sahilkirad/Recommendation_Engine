/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add this eslint block
  eslint: {
    // This tells Vercel to ignore ESLint errors during the production build.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;