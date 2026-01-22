import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  swcMinify: true,

  // Bundle optimization
  experimental: {
    optimizePackageImports: ['@mediapipe/face_mesh', '@mediapipe/camera_utils', 'onnxruntime-web', 'lucide-react'],
    optimizeCss: true,
    scrollRestoration: true,
    typedRoutes: true,
  },

  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Compression and caching
  compress: true,
  poweredByHeader: false,

  // Headers for performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=300, s-maxage=600, stale-while-revalidate=86400'
          }
        ]
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ]
  },

  // Webpack optimizations
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Bundle analyzer in development
    if (!dev && !isServer) {
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 10,
        },
        mediapipe: {
          test: /[\\/]node_modules[\\/]@mediapipe[\\/]/,
          name: 'mediapipe',
          chunks: 'all',
          priority: 20,
        },
        onnxruntime: {
          test: /[\\/]node_modules[\\/]onnxruntime-web[\\/]/,
          name: 'onnxruntime',
          chunks: 'all',
          priority: 20,
        },
        firebase: {
          test: /[\\/]node_modules[\\/]firebase[\\/]/,
          name: 'firebase',
          chunks: 'all',
          priority: 15,
        }
      }
    }

    // Performance monitoring
    if (!dev) {
      config.plugins.push(
        new webpack.DefinePlugin({
          __BUILD_ID__: JSON.stringify(buildId),
          __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
        })
      )
    }

    return config
  },

  // Build optimizations
  output: 'standalone',
  generateBuildId: async () => {
    return 'build-' + Date.now()
  },

  // Logging and monitoring
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === 'development',
    },
  },

  // TypeScript strict mode
  typescript: {
    tsconfigPath: './tsconfig.json',
  },

  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
