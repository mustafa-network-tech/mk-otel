import type { NextConfig } from 'next';
const sqliteTrace = ['./node_modules/better-sqlite3/**/*', './node_modules/bindings/**/*', './node_modules/file-uri-to-path/**/*'];
const nextConfig: NextConfig = {
  images: { formats: ['image/avif', 'image/webp'] },
  serverExternalPackages: ['better-sqlite3'],
  outputFileTracingIncludes: {
    '/api/availability': sqliteTrace,
    '/api/reservations': sqliteTrace,
  },
};
export default nextConfig;
