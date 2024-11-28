import { VercelPoolClient, db } from "@vercel/postgres";
import { NextResponse } from "next/server";

const fetchLatestVotes = async (client: VercelPoolClient) => {
  const latestVotes = await client.sql`
      SELECT 
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

  return latestVotes;
};

export async function GET() {
  let client;

  try {
    client = await db.connect();

    await client.sql`BEGIN`;

    const latestVotes = await fetchLatestVotes(client);

    await client.sql`COMMIT`;

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

    if (client) {
      await client.sql`ROLLBACK`;
    }

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
