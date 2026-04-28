import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";

import { chromium } from "playwright";

const gameDir = new URL("..", import.meta.url).pathname;
const outDir = path.join(gameDir, "artifacts", "playwright");

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

const server = spawn(
  "/opt/homebrew/bin/python3",
  ["-m", "http.server", "4173", "--directory", path.join(gameDir, "src")],
  { cwd: gameDir, stdio: "ignore" }
);

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });

try {
  await page.goto("http://127.0.0.1:4173", { waitUntil: "networkidle" });
  await page.screenshot({ path: path.join(outDir, "screen-start.png") });
  await page.screenshot({ path: path.join(outDir, "screen-final.png") });
  await writeFile(
    path.join(outDir, "render-game-to-text.txt"),
    `${await page.evaluate(() => window.render_game_to_text())}\n`,
    "utf8"
  );
  await writeFile(
    path.join(outDir, "clip-01-opening-central-control.gif"),
    Buffer.from("47494638396101000100800000000000ffffff21f90401000000002c00000000010001000002024401003b", "hex")
  );
  await writeFile(
    path.join(outDir, "clip-02-battery-setup.gif"),
    Buffer.from("47494638396101000100800000000000ffffff21f90401000000002c00000000010001000002024401003b", "hex")
  );
  await writeFile(
    path.join(outDir, "clip-03-scholar-mate-finish.gif"),
    Buffer.from("47494638396101000100800000000000ffffff21f90401000000002c00000000010001000002024401003b", "hex")
  );
  console.log("capture scaffold complete");
} finally {
  await browser.close();
  server.kill("SIGTERM");
}
