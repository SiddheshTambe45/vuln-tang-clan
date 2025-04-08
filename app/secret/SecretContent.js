// components/SecretContent.js
"use client";
import { useSearchParams } from "next/navigation";

export default function SecretContent() {
  const searchParams = useSearchParams();
  const show = searchParams.get("show") === "true";

  return (
    <>
      {show && (
        <div className="mt-4 p-4 border border-green-500 rounded bg-gray-800 text-green-400">
          <p className="text-sm">flag&#123;you_found_the_secret_page&#125;</p>
        </div>
      )}
    </>
  );
}
