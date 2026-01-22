import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Performance optimizations
  reactCompiler: true,

  // Turbopack configuration to allow webpack usage
  turbopack: {},

  // Enable typed routes
  typedRoutes: true,

  // Advanced SWC optimizations
  swcMinify: true,

  // Advanced compiler options
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    reactRemoveProperties: process.env.NODE_ENV === 'production',
  },

  // Advanced bundle optimization
  experimental: {
    optimizePackageImports: ['@mediapipe/face_mesh', '@mediapipe/camera_utils', 'onnxruntime-web', 'lucide-react', 'framer-motion'],
    optimizeCss: true,
    scrollRestoration: true,
    // Enable modern JavaScript features
    esmExternals: 'loose',
    // Optimize server components
    serverComponentsExternalPackages: ['@mediapipe/face_mesh', '@mediapipe/camera_utils', 'onnxruntime-web'],
  },

  // Advanced image optimization with CDN
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // CDN optimization
    loader: 'default',
    path: '/_next/image',
    // Advanced caching
    minimumCacheTTL: 31536000, // 1 year
  },

  // Compression and caching
  compress: true,
  poweredByHeader: false,

// Advanced PWA and service worker configuration
  headers: async () => [
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
          value: 'strict-origin-when-cross-origin'
        },
        {
          key: 'Permissions-Policy',
          value: 'camera=(self), microphone=(self), geolocation=()'
        },
        {
          key: 'Cross-Origin-Embedder-Policy',
          value: 'require-corp'
        },
        {
          key: 'Cross-Origin-Opener-Policy',
          value: 'same-origin'
        },
        {
          key: 'Cross-Origin-Resource-Policy',
          value: 'same-origin'
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
    },
    {
      source: '/sw.js',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=0, must-revalidate'
        },
        {
          key: 'Service-Worker-Allowed',
          value: '/'
        }
      ]
    }
  ],

  // Advanced webpack optimizations
  webpack: (config, { buildId, dev, isServer, webpack }) => {
    // Performance optimizations
    if (!dev) {
      // Aggressive code splitting for better caching
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          ...config.optimization.splitChunks.cacheGroups,
          // Vendor chunks
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
            enforce: true,
          },
          // Heavy ML libraries
          mediapipe: {
            test: /[\\/]node_modules[\\/]@mediapipe[\\/]/,
            name: 'mediapipe',
            chunks: 'all',
            priority: 20,
            enforce: true,
          },
          onnxruntime: {
            test: /[\\/]node_modules[\\/]onnxruntime-web[\\/]/,
            name: 'onnxruntime',
            chunks: 'all',
            priority: 20,
            enforce: true,
          },
          // Firebase
          firebase: {
            test: /[\\/]node_modules[\\/]firebase[\\/]/,
            name: 'firebase',
            chunks: 'all',
            priority: 15,
            enforce: true,
          },
          // React ecosystem
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom|framer-motion)[\\/]/,
            name: 'react',
            chunks: 'all',
            priority: 15,
            enforce: true,
          },
          // UI libraries
          ui: {
            test: /[\\/]node_modules[\\/](lucide-react|clsx|tailwind-merge)[\\/]/,
            name: 'ui',
            chunks: 'all',
            priority: 12,
            enforce: true,
          },
        },
      }

      // Terser optimizations
      config.optimization.minimizer = config.optimization.minimizer?.map((minimizer: any) => {
        if (minimizer.constructor.name === 'TerserPlugin') {
          return new minimizer.constructor({
            terserOptions: {
              compress: {
                drop_console: true,
                drop_debugger: true,
                pure_funcs: ['console.log', 'console.info', 'console.debug'],
              },
              mangle: {
                safari10: true,
              },
            },
          })
        }
        return minimizer
      })
    }

    // Bundle analyzer (only in analyze mode)
    if (process.env.ANALYZE === 'true') {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          reportFilename: './bundle-analyzer-report.html',
          openAnalyzer: false,
        })
      )
    }

    // Build metadata
    config.plugins.push(
      new webpack.DefinePlugin({
        __BUILD_ID__: JSON.stringify(buildId),
        __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
        __VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0'),
      })
    )

    // Performance hints
    config.performance = {
      hints: dev ? false : 'warning',
      maxEntrypointSize: 512000, // 512KB
      maxAssetSize: 1024000, // 1MB
    }

    return config
  },

  // Advanced build optimizations
  output: 'standalone',
  generateBuildId: async () => {
    return `gaze-${Date.now()}`
  },

  // Advanced logging and monitoring
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === 'development',
    },
  },

  // TypeScript strict mode with advanced settings
  typescript: {
    tsconfigPath: './tsconfig.json',
    ignoreBuildErrors: false,
  },

  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: false,
  },

  // Advanced experimental features
  experimental: {
    optimizePackageImports: ['@mediapipe/face_mesh', '@mediapipe/camera_utils', 'onnxruntime-web', 'lucide-react', 'framer-motion'],
    optimizeCss: true,
    scrollRestoration: true,
    // Enable modern JavaScript features
    esmExternals: 'loose',
    // Optimize server components
    serverComponentsExternalPackages: ['@mediapipe/face_mesh', '@mediapipe/camera_utils', 'onnxruntime-web'],
    // Enable instrumentation
    instrumentationHook: true,
  },

  
};

export default nextConfig;
