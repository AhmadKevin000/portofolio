import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,

  experimental: {
    /**
     * Opt this app into security-driven upgrade reminders, so `next build`
     * surfaces an advisory instead of silently shipping an affected version.
     */
    agentUpgrade: "security",
  },

  /**
   * The locale segment is part of the URL, so there is no page at `/`.
   *
   * A config redirect is used instead of a proxy: there is exactly one default
   * locale and no `Accept-Language` negotiation, so a middleware layer would
   * add a request-time hop for a decision that never changes. `/en` is the
   * default, and `/` is the only source path.
   *
   * `permanent: false` keeps this a 307. It is a default, not a promise: if the
   * default locale ever changes, the old 308 would already be cached by every
   * client that saw it.
   */
  async redirects() {
    return [
      {
        source: "/",
        destination: "/en",
        permanent: false,
      },
    ];
  },
  turbopack: {
    // A stray lockfile lives one level above the repo; pin the root here so
    // Turbopack does not warn about it on every build.
    root: __dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
