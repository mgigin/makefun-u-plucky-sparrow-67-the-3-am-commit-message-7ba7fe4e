// The 3 AM Commit Message — make.fun entry (program/v1).
// Deterministic, no network, no dependencies.
// Writes one commit message (1-200 chars, single line) to /output/entry.txt
// and validates the bounty gate in-program before writing.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ENTRY =
  "fix: reverted my 3 AM deploy — I tested in prod because staging felt lonely, and prod has now filed a restraining order against me";

const outPath = process.env.ENTRY_OUTPUT || "/output/entry.txt";

function validate(text) {
  const chars = Array.from(text);
  if (chars.length < 1 || chars.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${chars.length}`);
  }
  if (text.trim().length === 0) throw new Error("entry must not be only whitespace");
  if (text.includes("\n") || text.includes("\r")) throw new Error("entry must be a single line");
}

validate(ENTRY);
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, ENTRY, "utf8");
console.log(`wrote ${Array.from(ENTRY).length} chars to ${outPath}`);
