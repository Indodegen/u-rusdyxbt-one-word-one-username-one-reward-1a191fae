import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ENTRY = "itskairo";

const here = dirname(fileURLToPath(import.meta.url));
const raw = readFileSync(join(here, "entry.txt"), "utf8");
const text = raw.endsWith("\n") ? raw.slice(0, -1) : raw;

if (text.includes("\n") || text.includes("\r")) {
  console.error("entry.txt must contain exactly one line");
  process.exit(1);
}
if (text !== ENTRY) {
  console.error("entry.txt does not match the expected username");
  process.exit(1);
}
if (text.length < 1 || text.length > 30 || text.trim().length === 0) {
  console.error("entry must be 1-30 characters and not only whitespace");
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
