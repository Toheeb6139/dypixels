/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
  experimental: {
    serverActions: {
      // Next's default is 1MB, which most real design assets blow past
      // instantly. This covers cover images, gallery images, and short
      // WebM/MP4 clips uploaded from /admin.
      bodySizeLimit: "25mb",
    },
  },
};

export default nextConfig;
