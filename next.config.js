/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Remove polyfills for modern browsers
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  // Enable SWC minification (faster than Terser)
  swcMinify: true,
  // Optimize production builds
  productionBrowserSourceMaps: false,
  // Disable x-powered-by header
  poweredByHeader: false,
};

module.exports = nextConfig;
