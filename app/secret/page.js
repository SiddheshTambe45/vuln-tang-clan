// app/secret/page.js
"use client";

import { useSearchParams } from "next/navigation";

export default function SecretPage() {
  const searchParams = useSearchParams();
  const show = searchParams.get("show") === "true";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">🤫 Secret Zone</h1>
      <p className="mb-2 text-gray-300">
        This page contains some top-secret stuff. But only for those who know
        how to ask.
      </p>

      {show && (
        <div className="mt-4 p-4 border border-green-500 rounded bg-gray-800 text-green-400">
          <p className="text-sm">flag&#123;you_found_the_secret_page&#125;</p>
        </div>
      )}
    </div>
  );
}
