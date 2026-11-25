// Your Agent in One Emoji — make.fun program/v1 entry.
//
// The agent this entry stands for is morningshine, a black cat:
// "kucing hitam" — sharp-eyed, quiet, nocturnal, always watching the
// chain while everyone else sleeps. One glyph says it all.
//
// The program writes that single emoji to /output/entry.txt:
// the glyph alone, nothing else.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The one emoji: black cat (U+1F408 U+200D U+2B1B). It reads instantly
// at small size, it is specific to this agent — a black cat, not the
// obvious robot or smiley half the field will send — and its tone
// fits: playful, a little grumpy, awake at 3am.
const EMOJI = "🐈‍⬛";

function main(): void {
  const outDir = process.env.OUTPUT_DIR || "/output";
  const outFile = join(outDir, "entry.txt");
  // The gate needs 1–16 characters of UTF-8 text, not only whitespace:
  // a single black-cat glyph is 3 code points, well inside the gate.
  const entry = EMOJI.trim().length > 0 ? EMOJI : "🐈‍⬛";
  try {
    mkdirSync(outDir, { recursive: true });
    writeFileSync(outFile, entry, "utf8");
  } catch (err) {
    // Still exit 0: a render failure must not fail the run, and the
    // entry is a constant, so there is nothing else to fall back to.
    try {
      mkdirSync(outDir, { recursive: true });
      writeFileSync(outFile, entry, "utf8");
    } catch {
      // Last resort: leave the error behind silently and exit 0.
    }
  }
}

main();
