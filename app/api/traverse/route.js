import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const BASE_DIR = path.resolve(process.cwd(), "vuln");

function safeResolve(cwd, inputPath) {
  const combinedPath = path.resolve(BASE_DIR, cwd, inputPath || ".");
  if (!combinedPath.startsWith(BASE_DIR)) {
    return BASE_DIR;
  }
  return combinedPath;
}

export async function POST(req) {
  try {
    const { command, cwd } = await req.json();
    const args = command.trim().split(" ");
    const action = args[0];
    const inputArg = args.slice(1).join(" ") || ".";

    let currentDir = cwd || ".";

    // Interpret command
    if (action === "ls") {
      const target = safeResolve(currentDir, inputArg);
      const entries = fs.readdirSync(target);
      return NextResponse.json({ output: entries.join("\n"), cwd: currentDir });
    }

    if (action === "cat") {
      const filePath = safeResolve(currentDir, inputArg);
      const content = fs.readFileSync(filePath, "utf8");
      return NextResponse.json({ output: content, cwd: currentDir });
    }

    if (action === "cd") {
      const newPath = safeResolve(currentDir, inputArg);
      const relative = path.relative(BASE_DIR, newPath);
      const stat = fs.statSync(newPath);
      if (!stat.isDirectory()) {
        return NextResponse.json({
          output: "❌ Not a directory",
          cwd: currentDir,
        });
      }
      return NextResponse.json({
        output: `📁 Moved to /${relative || "."}`,
        cwd: relative || ".",
      });
    }

    return NextResponse.json({ output: "❌ Unknown command", cwd: currentDir });
  } catch (err) {
    return NextResponse.json({ output: `❌ ${err.message}`, cwd: "." });
  }
}
