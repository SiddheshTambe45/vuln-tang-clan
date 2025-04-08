"use client";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch("/api/comments")
      .then((res) => res.json())
      .then((data) => setComments(data.comments || []));
  }, []);

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">💀 VulnTang Clan 💀</h1>
      <p className="mb-4 text-gray-600">
        Welcome to the most insecure app on the planet. Feel free to leave your
        mark below.
      </p>

      <a
        href="/comment"
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Leave a Comment
      </a>

      <div className="mt-8 space-y-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="bg-gray-100 p-4 rounded shadow"
            dangerouslySetInnerHTML={{ __html: comment.content }} // 😈 Stored XSS
          />
        ))}
      </div>
    </main>
  );
}
