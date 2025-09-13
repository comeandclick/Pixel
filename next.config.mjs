/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    serverComponentsExternalPackages: ['@xenova/transformers', 'sharp'],
  },
  // Configure body size limit for image uploads
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
  // Increase timeout for AI processing
  serverRuntimeConfig: {
    maxDuration: 60,
  },
}

export default nextConfig
