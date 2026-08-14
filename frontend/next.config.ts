import path from "node:path";
import type { NextConfig } from "next";

const sharedRoot = path.join(__dirname, "../packages/shared");

const nextConfig: NextConfig = {
  serverExternalPackages: ["better-sqlite3"],
  skipTrailingSlashRedirect: true,
  transpilePackages: ["@numforlife/shared"],
  turbopack: {
    resolveAlias: {
      "@/lib": path.join(sharedRoot, "lib"),
      "@/components/ui": path.join(sharedRoot, "components/ui"),
    },
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@/lib": path.join(sharedRoot, "lib"),
      "@/components/ui": path.join(sharedRoot, "components/ui"),
    };
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "numforlife.com",
        pathname: "/wp-content/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.plenorhub.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
