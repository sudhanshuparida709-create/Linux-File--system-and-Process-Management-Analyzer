import path from "node:path";
import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */

const projectDir = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  reactStrictMode: true,

  poweredByHeader: false,

  devIndicators: false,

  images: {
    remotePatterns: [],
  },

  // Explicitly identify the project workspace root.
  outputFileTracingRoot: path.resolve(projectDir, ".."),
};

export default nextConfig;