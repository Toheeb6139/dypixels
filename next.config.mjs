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
      // WebM/MP4 clips uploaded from /admin. Supabase Storage's own
      // free-tier cap is 50MB per file, so there's no benefit going
      // higher than that here.
      bodySizeLimit: "50mb",
    },
  },
};

export default nextConfig;
