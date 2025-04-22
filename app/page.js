"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const [comments, setComments] = useState([]);
  //hi for some other stuff

  useEffect(() => {
    fetch("/api/comments")
      .then((res) => res.json())
      .then((data) => setComments(data.comments || []));
  }, []);

  return (
    <main className="w-full flex flex-col items-center justify-start  p-4">
      <h1 className="text-3xl font-bold mb-4">💀 VulnTang Clan 💀</h1>
      <p className="mb-4 text-gray-600">
        Welcome to the most insecure app on the planet. Feel free to leave your
        mark below.
      </p>
      <p className="mb-4 text-gray-600">
        Welcome to the most insecure app on the planet. Feel free to leave your
        mark below.
      </p>

      <div className="flex flex-row items-center justify-between w-full">
        <button
          type="button"
          onClick={() => router.push("/comment")}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-purple-700 w-[180px] mx-auto"
        >
          Leave a Comment
        </button>
        <button
          type="button"
          onClick={() => router.push("/login")}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-[180px] mx-auto"
        >
          Login
        </button>
      </div>

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
