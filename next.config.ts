import type { NextConfig } from "next";

/**
 * ============================================
 * POMEGLE NEXT.JS CONFIGURATION
 * ============================================
 * 
 * SEO & Performance optimizations for Next.js
 */

const nextConfig: NextConfig = {
  // Disable strict mode for video streaming compatibility
  reactStrictMode: false,
  
  // SEO: Generate static pages where possible (SSG)
  // This improves SEO and performance
  
  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Headers for security and caching
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
      {
        // Cache static assets
        source: "/(.*)\\.(ico|png|jpg|jpeg|gif|webp|svg|woff|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  
  // Redirects for SEO (handle common variations)
  async redirects() {
    return [
      // Redirect www to non-www (or vice versa - choose one)
      // Handle trailing slashes consistently
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/index",
        destination: "/",
        permanent: true,
      },
      // Old Omegle-style URLs people might try
      {
        source: "/video",
        destination: "/room",
        permanent: true,
      },
      {
        source: "/chat",
        destination: "/room",
        permanent: true,
      },
      {
        source: "/start",
        destination: "/",
        permanent: true,
      },
    ];
  },
  
  // Experimental features for performance
  experimental: {
    // Enable optimized package imports
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
