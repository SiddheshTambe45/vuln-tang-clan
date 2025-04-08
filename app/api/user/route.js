import { NextResponse } from "next/server";
import { Client } from "pg";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { success: false, error: "Missing ID" },
      { status: 400 }
    );
  }

  const client = new Client({
    connectionString: process.env.DATABASE_URL, // Must be set in .env
  });

  try {
    await client.connect();
    const result = await client.query(
      "SELECT id, username FROM users WHERE id = $1",
      [id]
    );
    await client.end();

    const user = result.rows[0];
    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, user });
  } catch (err) {
    console.error("DB error:", err);
    return NextResponse.json(
      { success: false, error: "Database error" },
      { status: 500 }
    );
  }
}
