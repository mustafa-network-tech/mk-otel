import type { NextConfig } from 'next';
const sqliteTrace = ['./node_modules/better-sqlite3/**/*', './node_modules/bindings/**/*', './node_modules/file-uri-to-path/**/*'];
const nextConfig: NextConfig = {
  images: { formats: ['image/avif', 'image/webp'] },
  serverExternalPackages: ['better-sqlite3'],
  outputFileTracingIncludes: {
    '/api/availability': sqliteTrace,
    '/api/reservations': sqliteTrace,
  },
  // Portfolio demo: keep every response (pages, images, API) out of search engines.
  async headers() {
    return [{ source: '/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] }];
  },
  // Room slugs were aligned with the booking engine's room types.
  async redirects() {
    return [
      { source: '/odalar/cift-kisilik', destination: '/odalar/deluxe-orman', permanent: true },
      { source: '/odalar/uc-kisilik', destination: '/odalar/superior-aile', permanent: true },
      { source: '/odalar/aile-odasi', destination: '/odalar/superior-aile', permanent: true },
    ];
  },
};
export default nextConfig;
