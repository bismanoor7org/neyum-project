/**
 * Post-build production smoke test (PowerShell + bash compatible via npm run).
 * Requires: npm run build completed successfully.
 */
import { spawn } from "node:child_process";
import { access } from "node:fs/promises";
import { constants } from "node:fs";
import { join } from "node:path";

const PORT = Number(process.env.VALIDATE_PORT ?? 3098);
const HOST = process.env.VALIDATE_HOST ?? "127.0.0.1";
const BASE = `http://${HOST}:${PORT}`;
const START_TIMEOUT_MS = 90_000;
const REQUEST_TIMEOUT_MS = 15_000;

const ROUTES = [
  { path: "/", expect: [200] },
  { path: "/tools", expect: [200] },
  { path: "/tools/fiji-time", expect: [200] },
  { path: "/api/v1/tools/currency?base=USD", expect: [200] },
  { path: "/api/v1/public/fiji-live-status", expect: [200] },
];

async function fileExists(path) {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForServer(child) {
  const deadline = Date.now() + START_TIMEOUT_MS;
  let ready = false;

  const onData = (chunk) => {
    const text = String(chunk);
    if (/Ready in|started server/i.test(text)) ready = true;
  };
  child.stdout?.on("data", onData);
  child.stderr?.on("data", onData);

  while (Date.now() < deadline) {
    if (ready) {
      await sleep(500);
      return;
    }
    try {
      const res = await fetch(`${BASE}/`, { signal: AbortSignal.timeout(3000) });
      if (res.status < 500) return;
    } catch {
      /* retry */
    }
    await sleep(1500);
  }
  throw new Error(`Server did not become ready within ${START_TIMEOUT_MS}ms`);
}

async function checkRoute(path, expect) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const res = await fetch(`${BASE}${path}`, { signal: controller.signal });
    const ok = expect.includes(res.status);
    return { path, status: res.status, ok };
  } catch (error) {
    return {
      path,
      status: 0,
      ok: false,
      error: error instanceof Error ? error.message : String(error),
    };
  } finally {
    clearTimeout(timer);
  }
}

function startServer() {
  const cmd = `npx next start -p ${PORT} -H ${HOST}`;
  const child = spawn(cmd, {
    cwd: process.cwd(),
    stdio: ["ignore", "pipe", "pipe"],
    shell: true,
    env: { ...process.env, PORT: String(PORT) },
  });
  return child;
}

async function main() {
  const buildIdPath = join(process.cwd(), ".next", "BUILD_ID");
  if (!(await fileExists(buildIdPath))) {
    console.error("FAIL: .next/BUILD_ID missing — run npm run build first.");
    process.exit(1);
  }

  console.log("Production validation: starting server on", BASE);
  const server = startServer();
  let stderr = "";

  server.stderr?.on("data", (chunk) => {
    stderr += String(chunk);
  });

  const shutdown = () => {
    if (server.killed) return;
    if (process.platform === "win32") {
      spawn(`taskkill /PID ${server.pid} /T /F`, { shell: true, stdio: "ignore" });
    } else {
      server.kill("SIGTERM");
    }
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);

  try {
    await waitForServer(server);
    console.log("Server ready. Running smoke checks…\n");

    const results = [];
    for (const route of ROUTES) {
      const result = await checkRoute(route.path, route.expect);
      results.push(result);
      const label = result.ok ? "PASS" : "FAIL";
      const detail = result.error ? ` (${result.error})` : ` [${result.status}]`;
      console.log(`${label} ${route.path}${detail}`);
    }

    const failed = results.filter((r) => !r.ok);
    if (failed.length > 0) {
      console.error(`\n${failed.length} route(s) failed.`);
      if (stderr) console.error("Server stderr:\n", stderr.slice(-2000));
      process.exit(1);
    }

    console.log(`\nAll ${results.length} production smoke checks passed.`);
  } catch (error) {
    console.error("FAIL:", error instanceof Error ? error.message : error);
    if (stderr) console.error("Server stderr:\n", stderr.slice(-2000));
    process.exit(1);
  } finally {
    shutdown();
    await sleep(1000);
  }
}

main();
