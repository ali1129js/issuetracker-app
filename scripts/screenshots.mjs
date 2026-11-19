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

async function shot(name, { theme, motion = "static", width, height, colorScheme }) {
  const context = await browser.newContext({
    viewport: { width, height },
    colorScheme,
    reducedMotion: motion === "animated" ? "no-preference" : "reduce",
    locale: "en-GB",
  });
  const page = await context.newPage();
  page.on("pageerror", (e) => console.error("PAGE ERROR", e.message));
  await page.addInitScript(
    ([t, m]) => {
      localStorage.setItem("issuetracker.v1.theme", JSON.stringify(t));
      localStorage.setItem("issuetracker.v1.motion", JSON.stringify(m));
    },
    [theme, motion],
  );
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

const scheme = (theme) => (theme === "khaki" ? "light" : "dark");

const overflows = [];
for (const [name, opts] of [
  ["desktop-khaki-1280.png", { theme: "khaki", width: 1280, height: 900, colorScheme: "light" }],
  [
    "desktop-darkgrey-1280.png",
    { theme: "darkgrey", width: 1280, height: 900, colorScheme: "dark" },
  ],
  [
    "desktop-midnight-1280.png",
    { theme: "midnight", width: 1280, height: 900, colorScheme: "dark" },
  ],
  [
    "desktop-khaki-1280-animated.png",
    { theme: "khaki", motion: "animated", width: 1280, height: 900, colorScheme: "light" },
  ],
]) {
  if (await shot(name, opts)) overflows.push(name);
}

await browser.close();
if (overflows.length) {
  console.error("horizontal overflow in:", overflows.join(", "));
  process.exit(1);
}
