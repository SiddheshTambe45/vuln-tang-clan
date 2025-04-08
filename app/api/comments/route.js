import { NextResponse } from "next/server";
import { Client } from "pg";

export async function GET() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  try {
    await client.connect();
    const res = await client.query(
      "SELECT id, content FROM comments ORDER BY id DESC LIMIT 25"
    );
    await client.end();
    return NextResponse.json({ comments: res.rows });
  } catch (err) {
    console.error("GET /api/comments error:", err);
    return NextResponse.json({ comments: [] }, { status: 500 });
  }
}

export async function POST(req) {
  const { author, content } = await req.json();
  const client = new Client({ connectionString: process.env.DATABASE_URL });

  try {
    await client.connect();
    await client.query(
      "INSERT INTO comments (author, content) VALUES ($1, $2)",
      [author, content]
    );
    await client.end();
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("POST /api/comments error:", err);
    return NextResponse.json(
      { error: "Failed to save comment" },
      { status: 500 }
    );
  }
}
