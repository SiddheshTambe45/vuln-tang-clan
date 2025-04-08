"use client";
import { useState } from "react";

export default function TraversalPage() {
  const [command, setCommand] = useState("");
  const [cwd, setCwd] = useState(".");
  const [result, setResult] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch("/api/traverse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ command, cwd }),
    });
    const data = await res.json();
    setResult(data.output);
    setCwd(data.cwd);
    setCommand("");
  }

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">📂 Path Traversal Playground</h1>
      <p className="mb-4 text-sm text-gray-400">
        Current Dir: <code>/vuln/{cwd}</code>
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-2 border rounded"
          placeholder="e.g. ls, cat file.txt, cd folder"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
        />
        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Run Command
        </button>
      </form>

      <pre className="mt-6 bg-black text-green-400 p-4 rounded overflow-x-auto whitespace-pre-wrap">
        {result}
      </pre>
    </main>
  );
}
