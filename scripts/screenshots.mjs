// Usage: APP_URL=http://127.0.0.1:4176/ node scripts/screenshots.mjs <outDir>
import { mkdirSync } from "node:fs";
import { chromium } from "playwright-core";

const outDir = process.argv[2] ?? "shots";
const url = process.env.APP_URL ?? "http://127.0.0.1:4176/";
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH ?? "/usr/bin/google-chrome-stable",
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

async function shot(name, { theme, width, height }) {
  const context = await browser.newContext({
    viewport: { width, height },
    colorScheme: theme,
    reducedMotion: "reduce",
    locale: "en-GB",
  });
  const page = await context.newPage();
  page.on("pageerror", (e) => console.error("PAGE ERROR", e.message));
  await page.addInitScript((t) => {
    localStorage.setItem("issuetracker.v1.theme", JSON.stringify(t));
  }, theme);
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForSelector(".issue");
  await page.waitForTimeout(300);
  const path = `${outDir}/${name}`;
  await page.screenshot({ path, fullPage: true });
  const overflowX = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
  );
  console.log(`wrote ${path}${overflowX ? " (WARN horizontal overflow)" : ""}`);
  await context.close();
  return overflowX;
}

const overflows = [];
for (const [name, opts] of [
  ["desktop-light-1280.png", { theme: "light", width: 1280, height: 900 }],
  ["desktop-dark-1280.png", { theme: "dark", width: 1280, height: 900 }],
  ["phone-light-390.png", { theme: "light", width: 390, height: 844 }],
]) {
  if (await shot(name, opts)) overflows.push(name);
}

await browser.close();
if (overflows.length) {
  console.error("horizontal overflow in:", overflows.join(", "));
  process.exit(1);
}
