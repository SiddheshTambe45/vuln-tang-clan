"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();

    if (res.ok && data.id) {
      router.push("/profile?id=" + data.id);
    } else {
      setError(data.error || "Invalid credentials");
    }
  }

  return (
    <main className="w-full flex flex-col items-center justify-start  p-4">
      <h1 className="text-2xl font-bold mb-4">🔐 Login to VulnTang</h1>

      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        <div>
          <label className="block font-medium">Username</label>
          <input
            className="w-full p-2 border rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium">Password (plaintext lol)</label>
          <input
            type="password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-red-600">{error}</p>}

        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Login
        </button>
      </form>
    </main>
  );
}
