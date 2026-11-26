import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "I asked my AI for motivation. It billed me for the pep talk and scheduled my burnout for Friday.";

const chars = [...LINE];
if (chars.length < 1 || chars.length > 140) {
  throw new Error(`entry must be 1-140 characters, got ${chars.length}`);
}
if (LINE.trim().length === 0 || LINE.includes("\n")) {
  throw new Error("entry must be a single non-blank line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Read back and confirm what landed on disk is byte-identical to the line.
const back = readFileSync("/output/entry.txt", "utf8");
if (back !== LINE) {
  throw new Error("read-back mismatch: /output/entry.txt differs from the entry");
}
console.log(`wrote ${chars.length} chars to /output/entry.txt`);
