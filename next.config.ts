import type { NextConfig } from "next";

/**
 * RFC 8288 Link response headers for agent discovery — point AI agents and
 * crawlers at this site's machine-readable resources without them having to
 * guess paths. Only registered IANA link relation types are used:
 *   - `describedby`  → /llms.txt       (concise, agent-readable site summary)
 *   - `service-doc`  → /llms-full.txt  (full human/agent-readable documentation)
 *   - `sitemap`      → /sitemap.xml    (page index)
 * We deliberately do not advertise an `api-catalog` / `service-desc`: this is a
 * marketing + waitlist site with no public API, so claiming one would be false.
 * Values are relative URI references, which RFC 8288 permits. Applied to the
 * homepage in every locale (`/`, `/ja`, `/vi`).
 *
 * See docs/planning/04-seo-aeo.md and RFC 8288 / RFC 9727 §3.
 */
const AGENT_DISCOVERY_LINK_HEADER = [
  '</llms.txt>; rel="describedby"; type="text/plain"',
  '</llms-full.txt>; rel="service-doc"; type="text/plain"',
  '</sitemap.xml>; rel="sitemap"; type="application/xml"',
].join(", ");

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/",
        headers: [{ key: "Link", value: AGENT_DISCOVERY_LINK_HEADER }],
      },
      {
        source: "/:locale(ja|vi)",
        headers: [{ key: "Link", value: AGENT_DISCOVERY_LINK_HEADER }],
      },
    ];
  },
};

export default nextConfig;
