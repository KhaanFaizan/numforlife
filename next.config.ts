import type { NextConfig } from "next";

// Legacy WordPress URL redirects live in proxy.ts, not here: Next normalises
// trailing slashes before config redirects run, which would make every inbound
// WordPress link a two-hop chain. See lib/legacy-redirects.ts.

const nextConfig: NextConfig = {
  // Next's built-in trailing-slash redirect runs BEFORE proxy.ts and config
  // redirects, which would make every inbound WordPress link a two-hop chain.
  // Disabled here so proxy.ts can resolve legacy URLs in one hop; it also takes
  // over enforcing the canonical no-trailing-slash form.
  skipTrailingSlashRedirect: true,

  images: {
    remotePatterns: [
      {
        // Interim: imagery is still hosted on the WordPress media library. These
        // assets must move to our own media storage before WordPress is retired.
        protocol: "https",
        hostname: "numforlife.com",
        pathname: "/wp-content/**",
      },
      {
        // PlenorHub product and merchant imagery.
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },

};

export default nextConfig;
