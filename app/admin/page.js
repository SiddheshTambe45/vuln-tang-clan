"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const username = prompt("Enter admin username:");
    const password = prompt("Enter admin password:");
    if (username === "admin" && password === "admin") {
      setAuthenticated(true);
    }
  }, []);

  if (!authenticated) return <p className="p-6">🔒 Unauthorized</p>;

  return (
    <main className="p-6 flex flex-col gap-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold">👑 Admin Control Panel</h1>
      <button
        onClick={() => router.push("/admin/logs")}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        📜 View Logs
      </button>
      <button
        onClick={() => router.push("/admin/traversal")}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        🧨 Path Traversal
      </button>
    </main>
  );
}
