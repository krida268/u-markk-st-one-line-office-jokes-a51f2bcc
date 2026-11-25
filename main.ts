// One-Line Office Jokes — a single line that makes office life funny.
// The entry is written to /output/entry.txt (or to the path given as argv[2]).
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const ENTRY =
  "The coffee machine takes exact change, the change machine takes exact change, and the only person with change is on annual leave.";

function resolveTarget(argv2: string | undefined): string {
  // No argument: the grader's default output path.
  if (!argv2) return "/output/entry.txt";
  const target = resolve(argv2);
  // A directory argument gets entry.txt inside it; a .txt argument is the file.
  if (target.endsWith(".txt")) return target;
  return resolve(target, "entry.txt");
}

function main(): void {
  const line = ENTRY.trim();
  if (line.length < 1 || line.length > 199) {
    throw new Error(`entry must be 1-199 characters, got ${line.length}`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (!/\S/.test(line)) {
    throw new Error("entry must not be only whitespace");
  }
  const target = resolveTarget(process.argv[2]);
  // Create the output directory (and parents) without ever removing /output.
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, line, "utf8");
  console.log(`wrote ${target} (${line.length} characters)`);
}

main();
