export async function GET() {
  const flag = "FLAG{tricky_flag_header}";
  const encoded = Buffer.from(flag).toString("base64");

  return new Response(JSON.stringify({ flag: encoded }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
