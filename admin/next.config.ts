import path from "node:path";
import type { NextConfig } from "next";

const sharedRoot = path.join(__dirname, "../packages/shared");
const frontendComponents = path.join(__dirname, "../frontend/components");

const nextConfig: NextConfig = {
  serverExternalPackages: ["better-sqlite3"],
  transpilePackages: ["@numforlife/shared"],
  turbopack: {
    resolveAlias: {
      "@/lib": path.join(sharedRoot, "lib"),
      "@/components/ui": path.join(sharedRoot, "components/ui"),
      "@/components/home": path.join(frontendComponents, "home"),
      "@/components/sections": path.join(frontendComponents, "sections"),
    },
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@/lib": path.join(sharedRoot, "lib"),
      "@/components/ui": path.join(sharedRoot, "components/ui"),
      "@/components/home": path.join(frontendComponents, "home"),
      "@/components/sections": path.join(frontendComponents, "sections"),
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
