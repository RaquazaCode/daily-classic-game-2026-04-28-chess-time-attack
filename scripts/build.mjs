import { cp, mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.dirname(fileURLToPath(new URL("../package.json", import.meta.url)));
const distDir = path.join(rootDir, "dist");

await rm(distDir, { recursive: true, force: true });
await mkdir(distDir, { recursive: true });
await cp(path.join(rootDir, "src"), distDir, { recursive: true });
await cp(path.join(rootDir, "assets"), path.join(distDir, "assets"), { recursive: true });

console.log("build complete");
