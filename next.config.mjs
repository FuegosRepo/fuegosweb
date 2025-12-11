import path from 'path'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed 'output: export' - incompatible with API routes
  // API routes require a Node.js server
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
    domains: ['localhost', 'images.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Performance optimizations
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-accordion',
      '@radix-ui/react-carousel',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-popover',
      '@radix-ui/react-select',
      '@radix-ui/react-tabs',
      'framer-motion',
      'recharts'
    ],
  },
  // Bundle optimization
  webpack: (config, { isServer }) => {
    // Optimize imports
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve('./'),
    }

    // Optimización de módulos pesados
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // Vendor chunk para dependencias principales
            framework: {
              name: 'framework',
              chunks: 'all',
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler|next)[\\/]/,
              priority: 40,
              enforce: true,
            },
            // Chunk para componentes de UI (Radix UI)
            ui: {
              name: 'ui',
              test: /[\\/]node_modules[\\/]@radix-ui[\\/]/,
              priority: 30,
              reuseExistingChunk: true,
            },
            // Chunk para bibliotecas de terceros
            lib: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                const packageName = module.context.match(
                  /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                )?.[1]
                return `npm.${packageName?.replace('@', '')}`
              },
              priority: 20,
              minChunks: 1,
              reuseExistingChunk: true,
            },
            // Chunk para componentes compartidos
            commons: {
              name: 'commons',
              minChunks: 2,
              priority: 10,
              reuseExistingChunk: true,
            },
          },
        },
      }
    }

    return config
  },
  // Compression
  compress: true,
  // Optimización de producción
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: '/((?!maintenance|_next|static|favicon.ico).*)',
        destination: '/maintenance',
        permanent: false,
      },
      {
        source: '/',
        destination: '/maintenance',
        permanent: false,
      }
    ]
  },
}

export default nextConfig

