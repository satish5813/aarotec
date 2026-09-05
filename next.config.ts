import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

// Content Security Policy. Next.js hydration and the JSON-LD blocks need
// inline scripts; Motion/GSAP set inline styles. Everything else is locked
// to this origin plus the few hosts we actually load from. In development
// Next needs eval for fast refresh, so the policy is only sent in
// production builds.
const CSP = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://images.unsplash.com https://whitelion-assets.blr1.cdn.digitaloceanspaces.com",
  "media-src 'self' blob: https://whitelion-assets.blr1.cdn.digitaloceanspaces.com",
  "font-src 'self' data:",
  "connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  ...(isProd ? [{ key: "Content-Security-Policy", value: CSP }] : []),
];

// Product photography and video never change in place (a new asset gets a
// new file name), so browsers and the CDN may keep them for a year.
const IMMUTABLE = { key: "Cache-Control", value: "public, max-age=31536000, immutable" };

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  allowedDevOrigins: ["192.168.0.105", "192.168.0.104", "localhost"],
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "whitelion-assets.blr1.cdn.digitaloceanspaces.com" },
    ],
  },
  async headers() {
    return [
      { source: "/(.*)", headers: securityHeaders },
      { source: "/power/:path*.(webp|png|jpg|mp4)", headers: [IMMUTABLE] },
      { source: "/furniture/:path*.(webp|png|jpg)", headers: [IMMUTABLE] },
      { source: "/products/:path*.(webp|png|jpg)", headers: [IMMUTABLE] },
      { source: "/gallery/:path*.(webp|png|jpg)", headers: [IMMUTABLE] },
      { source: "/clients/:path*.(webp|png|jpg)", headers: [IMMUTABLE] },
      { source: "/:file*.(mp4|png|jpeg|jpg|webp)", headers: [IMMUTABLE] },
    ];
  },
};

export default nextConfig;
