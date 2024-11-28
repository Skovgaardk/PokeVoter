import { db } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await db.connect();

    const votes =
      await client.sql`SELECT * FROM votes WHERE vote_date >= NOW() - INTERVAL '1 day';`;

    client.release();

    return NextResponse.json(
      {
        votes: votes.rows,
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
