import { NextResponse } from "next/server";
import { Client } from "pg";

export async function POST(req) {
  const { username, password } = await req.json();
  const client = new Client({ connectionString: process.env.DATABASE_URL });

  try {
    await client.connect();
    const result = await client.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    let user;

    if (result.rows.length > 0) {
      user = result.rows[0];
      if (user.password !== password) {
        return NextResponse.json(
          { error: "Invalid password" },
          { status: 401 }
        );
      }
    } else {
      // Auto-register if user not found
      // Auto-register
      const insertResult = await client.query(
        "INSERT INTO users (username, password) VALUES ($1, $2)",
        [username, password]
      );
      user = insertResult.rows[0];
    }

    await client.end();

    const res = NextResponse.json({ success: true, id: user.id });
    res.cookies.set("username", username, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    res.cookies.set("id", user.id, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return res;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
