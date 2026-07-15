/**
 * The demo registry — the single source of truth for what `dev:all` runs and
 * what the hub page links to. Adding an entry here is the whole job: the hub
 * page, the proxy table and the spawned servers all derive from it.
 *
 * Two kinds of entry:
 *
 *   base            proxied through the hub, so it shares the hub's origin.
 *                   Must match the app's own vite `base`, because the hub
 *                   proxies the path through unrewritten — the child server
 *                   sees the same URL the browser asked for.
 *
 *   external: true  linked to directly on its own port. For apps whose base is
 *                   "/", which cannot be mounted under a sub-path without
 *                   changing how they deploy.
 *
 * Deliberately no port on either kind. Children get a free one at runtime — you
 * never type it, so pinning would only invent a collision with the `bun run
 * dev` you may already have on vite's default 5173.
 */
export const DEMOS = [
  {
    id: "react",
    label: "React",
    blurb: "Radix-backed binding. The reference implementation of the API.",
    dir: "packages/react",
    base: "/builder",
    config: "vite.config.demo.ts",
  },
  {
    id: "solid",
    label: "Solid",
    blurb: "Kobalte-backed binding. Mirrors the React API one-for-one.",
    dir: "packages/solid",
    base: "/builder-solid",
    config: "vite.config.demo.ts",
  },
  {
    id: "landing",
    label: "Landing page",
    blurb: "The marketing page. Ships CSS to nobody; depends on core alone.",
    dir: "apps/landing",
    // base "/" — the hub's own path. Linked on its own port rather than
    // proxied: mounting it under /landing would break every absolute asset URL
    // it serves, and re-basing it would change how it deploys.
    external: true,
  },
];

/** The one port you open. Override with ZEN_HUB_PORT when it is taken. */
export const HUB_PORT = 5170;
