import { db } from "@vercel/postgres";
import { NextResponse } from "next/server";

const getVotes = async () => {
  const client = await db.connect();
  const votes = await client.sql`
    SELECT * FROM votes
    `;

  return votes;
};

const getMostVotedPokemonToday = async () => {
  const client = await db.connect();
  const mostVoted = await client.sql`
SELECT 
  p.id,
  p.name,
  COUNT(*) AS total_votes,
  SUM(CASE WHEN p.id = v.winner_id THEN 1 ELSE 0 END) AS wins,
  SUM(CASE WHEN p.id != v.winner_id THEN 1 ELSE 0 END) AS losses
FROM (
  SELECT pokemon_1_id AS pokemon_id, winner_id FROM votes WHERE vote_date >= NOW() - INTERVAL '1 day'
  UNION ALL
  SELECT pokemon_2_id, winner_id FROM votes WHERE vote_date >= NOW() - INTERVAL '1 day'
) AS v
JOIN pokemon p ON p.id = v.pokemon_id
GROUP BY p.id, p.name
ORDER BY total_votes DESC
LIMIT 1;
    `;

  return mostVoted;
};

export async function GET() {
  let client;

  try {
    client = await db.connect();

    await client.sql`BEGIN`;

    const votes = await getVotes();
    const mostVoted = await getMostVotedPokemonToday();

    await client.sql`COMMIT`;

    return NextResponse.json(
        {
            votes: votes,
            mostVoted: mostVoted,
        },
        {
            status: 200,
        }
        );
  } catch (error) {
    console.error("Error handling vote:", error);

    // Rollback transaction in case of error
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
