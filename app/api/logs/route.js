import { NextResponse } from "next/server";
import { Client } from "pg";

export async function GET() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });

  try {
    await client.connect();
    const res = await client.query(
      "SELECT id, ip, user_agent, url, timestamp FROM logs ORDER BY id DESC LIMIT 100"
    );
    await client.end();

    return NextResponse.json({ logs: res.rows });
  } catch (err) {
    console.error("GET /api/logs error:", err);
    return NextResponse.json({ logs: [] }, { status: 500 });
  }
}
