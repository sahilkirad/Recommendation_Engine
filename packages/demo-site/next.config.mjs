/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      // --- ADD THIS NEW PATTERN ---
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
      // ---------------------------
    ],
  },
};

export default nextConfig;