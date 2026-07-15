/**
 * Every demo behind one URL.
 *
 * React and Solid cannot share a vite server — the two JSX transforms fight
 * over the same files — so this runs one child server per app and puts a hub in
 * front that proxies each binding's base path to its child. You run one command
 * and open one port; the split stays an implementation detail.
 *
 *   bun run dev:all   ->  http://localhost:5170
 *
 * The proxy passes the path through unrewritten, so each child sees the same
 * URL the browser asked for and its configured `base` still matches.
 *
 * Adding an app: one entry in ./demos.mjs.
 */
import { spawn } from "node:child_process";
import { createServer as createSocket } from "node:net";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { createServer } from "vite";
import { DEMOS, HUB_PORT } from "./demos.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");

/** The one port you open. Override when 5170 is taken: ZEN_HUB_PORT=5180. */
const hubPort = Number(process.env.ZEN_HUB_PORT) || HUB_PORT;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Ask the OS for a free port. The children's ports are an implementation
 * detail — nobody types them — so taking whatever is free beats pinning
 * numbers that collide with a `bun run dev` already on vite's default 5173.
 */
const freePort = () =>
  new Promise((ok, fail) => {
    const s = createSocket();
    s.on("error", fail);
    s.listen(0, "127.0.0.1", () => {
      const { port } = s.address();
      s.close(() => ok(port));
    });
  });

const children = [];
let shuttingDown = false;

/**
 * Signal a child's whole process group — vite spawns workers, and killing only
 * the wrapper leaves them holding the port, where they answer the next run's
 * health check and serve stale code.
 *
 * The ESRCH retry is not paranoia. `detached: true` makes the child call
 * setsid() AFTER the fork, so a kill fired in the first moments after spawn
 * races it: the group does not exist yet, process.kill(-pid) throws ESRCH, the
 * signal reaches nobody, and the child lives on as an orphan. The hub failing
 * on a taken port does exactly that — it errors milliseconds after spawn — and
 * it stranded four servers before this loop existed.
 */
const killGroup = async (child, signal) => {
  for (let i = 0; i < 20; i++) {
    if (child.exitCode !== null || child.signalCode) return;
    try {
      process.kill(-child.pid, signal);
      return;
    } catch (err) {
      if (err.code !== "ESRCH") return;
      // Either the group has not formed yet, or it is already gone. Sleeping
      // costs 50ms in the second case and saves an orphan in the first.
      await sleep(50);
    }
  }
};

const shutdown = async (code = 0) => {
  if (shuttingDown) return;
  shuttingDown = true;
  for (const c of children) await killGroup(c, "SIGTERM");
  await sleep(300);
  for (const c of children) await killGroup(c, "SIGKILL"); // anything that ignored TERM
  process.exit(code);
};

process.on("SIGINT", () => void shutdown(0));
process.on("SIGTERM", () => void shutdown(0));

const running = [];

for (const demo of DEMOS) {
  const port = await freePort();
  const child = spawn(
    "npx",
    ["vite", ...(demo.config ? ["--config", demo.config] : []), "--port", String(port), "--strictPort"],
    { cwd: resolve(ROOT, demo.dir), stdio: ["ignore", "pipe", "pipe"], detached: true },
  );
  children.push(child);
  running.push({ ...demo, port });

  // --strictPort makes a taken port fatal rather than letting vite drift to the
  // next one: a child on an unexpected port would leave the hub proxying into a
  // void, or worse, into someone else's server.
  child.stderr.on("data", (d) => {
    const s = String(d);
    if (s.trim()) console.error(`[${demo.id}] ${s.trimEnd()}`);
  });
  child.on("exit", (code) => {
    if (!shuttingDown && code) {
      console.error(`\n[${demo.id}] dev server exited (${code}).`);
      void shutdown(1);
    }
  });
}

const href = (d) => (d.base ? `${d.base}/` : `http://localhost:${d.port}/`);

// The hub is started inside try/catch for one reason: the children are already
// spawned and detached by now, so a hub that throws on the way up (a taken port
// is the usual cause) would exit and strand them holding their ports.
let hub;
try {
  hub = await createServer({
    configFile: false,
    root: resolve(HERE, "demo-hub"),
    server: {
      port: hubPort,
      strictPort: true,
      // Anchored regex, not a bare prefix: "/builder" is a PREFIX of
      // "/builder-solid", so a plain string key sends every Solid URL to the
      // React server, which answers with its own 404 ("did you mean
      // /builder/builder-solid/…?"). Requiring a "/" or end-of-string after the
      // base keeps the two apart whatever order they are declared in, and keeps
      // a future /builder-vue from colliding too.
      proxy: Object.fromEntries(
        running
          .filter((d) => d.base)
          .map((d) => [
            `^${d.base.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(/|$)`,
            { target: `http://localhost:${d.port}`, changeOrigin: true, ws: true },
          ]),
      ),
    },
    plugins: [
      {
        name: "zen-demo-hub-cards",
        // Rendered from the registry rather than hand-written into the HTML, so
        // the page cannot list an app this script is not actually serving.
        transformIndexHtml: (html) =>
          html.replace(
            "<!--DEMO_CARDS-->",
            running
              .map(
                (d) => `
        <a class="card${d.external ? " card-external" : ""}" href="${href(d)}">
          <h2>${d.label}</h2>
          <p>${d.blurb}</p>
          <code>${d.base ? `${d.base}/` : `:${d.port}`}</code>
        </a>`,
              )
              .join(""),
          ),
      },
    ],
  });
  await hub.listen();
} catch (err) {
  const taken = /already in use/i.test(String(err?.message));
  console.error(
    taken
      ? `\n  Port ${hubPort} is already in use — another \`dev:all\` is probably still running.\n` +
          `  Stop it, or pick another port:  ZEN_HUB_PORT=5180 bun run dev:all\n`
      : `\n  Hub failed to start: ${err?.message ?? err}\n`,
  );
  await shutdown(1); // never leave the children holding their ports
}

console.log(`\n  zen-ui demos  ->  http://localhost:${hubPort}/\n`);
for (const d of running) {
  const url = d.base ? `http://localhost:${hubPort}${d.base}/` : href(d);
  console.log(`    ${d.label.padEnd(13)} ${url}`);
}
console.log("");
