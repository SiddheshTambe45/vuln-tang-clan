import { Suspense } from "react";
import SecretContent from "./SecretContent";

export default function SecretPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">🤫 Secret Zone</h1>
      <p className="mb-2 text-gray-300">
        This page contains some top-secret stuff. But only for those who know
        how to ask.
      </p>

      <Suspense fallback={null}>
        <SecretContent />
      </Suspense>
    </div>
  );
}
