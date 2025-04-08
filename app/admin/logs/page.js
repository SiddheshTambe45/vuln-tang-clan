"use client";
import { useEffect, useState } from "react";

export default function AdminLogsPage() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch("/api/logs")
      .then((res) => res.json())
      .then((data) => setLogs(data.logs || []));
  }, []);

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📜 Request Logs</h1>
      <div className="bg-white shadow rounded p-4 space-y-2">
        {logs.length === 0 ? (
          <p className="text-gray-600">No logs found.</p>
        ) : (
          logs.map((log) => (
            <div
              key={log.id}
              className="p-2 border-b text-sm font-mono text-gray-800"
            >
              [{new Date(log.timestamp).toLocaleString()}] {log.ip} -{" "}
              {log.user_agent} - {log.url}
            </div>
          ))
        )}
      </div>
    </main>
  );
}
