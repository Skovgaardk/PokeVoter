import { db } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await db.connect();
    const res =
      await client.sql`SELECT * FROM pokemon ORDER BY popularity DESC LIMIT 3`;

    client.release();

    return NextResponse.json(
      {
        mostPopular: res.rows,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error handling vote:", error);

    return NextResponse.json(
      {
        error: error,
      },
      {
        status: 500,
      }
    );
  }
}
