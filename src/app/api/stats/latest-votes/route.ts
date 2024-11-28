import { db } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await db.connect();
    const latestVotes = await client.sql`SELECT 
     v.id AS vote_id,
     v.username,
     p1.name AS pokemon_1_name,
    p2.name AS pokemon_2_name,
     TO_CHAR(v.vote_date, 'DD-MM-YYYY') AS vote_date,
     TO_CHAR(v.vote_date, 'HH24:MI') AS vote_time
 FROM 
    votes v
 JOIN 
     pokemon p1 ON v.pokemon_1_id = p1.id
 JOIN 
    pokemon p2 ON v.pokemon_2_id = p2.id
 ORDER BY 
     v.vote_date DESC 
 LIMIT 4;`;

    client.release();

    return NextResponse.json(
      {
        latestVotes: latestVotes.rows,
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
