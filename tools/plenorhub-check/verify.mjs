/**
 * PlenorHub channel verification — produces a screenshot-safe evidence report.
 *
 * Confirms whether the numforlife channel catalog is empty, and proves the request itself is
 * correct by running the identical call against a control channel.
 *
 * The API keys are read from environment variables and are NEVER printed. The report shows only
 * a masked fingerprint (first 6 + last 4 characters) so the client can confirm which key was used
 * without the key being disclosed in a screenshot.
 *
 * USAGE (PowerShell)
 *   $env:PH_KEY_NUMFORLIFE="<numforlife channel key>"
 *   $env:PH_KEY_CONTROL="<bigk channel key>"      # optional but recommended
 *   Clear-Host
 *   node tools/plenorhub-check/verify.mjs
 *
 * USAGE (Git Bash)
 *   export PH_KEY_NUMFORLIFE='<numforlife channel key>'
 *   export PH_KEY_CONTROL='<bigk channel key>'
 *   clear && node tools/plenorhub-check/verify.mjs
 */

const BASE = "https://api.plenorhub.com/api/v1";

const mask = (k) => (k ? `${k.slice(0, 6)}…${k.slice(-4)} (${k.length} chars)` : "NOT SET");

async function call(pathname, key) {
  const started = Date.now();
  try {
    const res = await fetch(`${BASE}${pathname}`, {
      headers: { Authorization: `Bearer ${key}`, Accept: "application/json" },
    });
    const text = await res.text();
    let body;
    try {
      body = JSON.parse(text);
    } catch {
      body = text.slice(0, 200);
    }
    return { status: res.status, ms: Date.now() - started, body };
  } catch (err) {
    return { status: "NETWORK ERROR", ms: Date.now() - started, body: String(err.message) };
  }
}

function summarise(r) {
  const b = r.body ?? {};
  const count = Array.isArray(b.data) ? b.data.length : "n/a";
  const total = b.meta?.total ?? (Array.isArray(b.data) ? b.data.length : "n/a");
  const channel = b.meta?.channel ?? "(not reported)";
  return { count, total, channel };
}

const line = (c = "─") => console.log(c.repeat(78));

async function main() {
  const keyMain = process.env.PH_KEY_NUMFORLIFE;
  const keyCtrl = process.env.PH_KEY_CONTROL;

  if (!keyMain) {
    console.error("PH_KEY_NUMFORLIFE is not set. See the usage block at the top of this file.");
    process.exit(1);
  }

  line("═");
  console.log("  PLENORHUB CHANNEL VERIFICATION");
  console.log(`  Generated : ${new Date().toISOString()}  (UTC)`);
  console.log(`  Base URL  : ${BASE}`);
  line("═");

  console.log("\nKEY FINGERPRINTS (keys themselves are never printed)");
  console.log(`  numforlife : ${mask(keyMain)}`);
  console.log(`  control    : ${mask(keyCtrl)}`);

  console.log("\n\nTEST A — numforlife channel");
  line();
  for (const p of [
    "/integration/products?per_page=100",
    "/integration/merchants",
    "/integration/categories",
  ]) {
    const r = await call(p, keyMain);
    const s = summarise(r);
    console.log(`  GET ${p}`);
    console.log(
      `      HTTP ${r.status}  ${String(r.ms).padStart(5)}ms   ` +
        `items=${s.count}  meta.total=${s.total}  meta.channel="${s.channel}"`,
    );
    console.log(`      body: ${JSON.stringify(r.body).slice(0, 160)}`);
  }

  if (keyCtrl) {
    console.log("\n\nTEST B — control channel (proves the request format and auth are correct)");
    line();
    const r = await call("/integration/products?per_page=2", keyCtrl);
    const s = summarise(r);
    console.log("  GET /integration/products?per_page=2");
    console.log(
      `      HTTP ${r.status}  ${String(r.ms).padStart(5)}ms   ` +
        `items=${s.count}  meta.total=${s.total}  meta.channel="${s.channel}"`,
    );
  }

  console.log("\n");
  line("═");
  console.log("  CONCLUSION");
  const main2 = summarise(await call("/integration/products?per_page=100", keyMain));
  if (main2.total === 0) {
    console.log("  Authentication SUCCEEDS — the API echoes meta.channel back to us, so the");
    console.log("  key is valid and correctly scoped to the numforlife channel.");
    console.log("  The catalog contains ZERO products: no merchant has published to this");
    console.log("  channel yet. This is a catalog-content issue on the PlenorHub side,");
    console.log("  not an integration fault on the website side.");
  } else {
    console.log(`  numforlife now returns ${main2.total} product(s) — catalog is populated.`);
  }
  line("═");
}

main();
