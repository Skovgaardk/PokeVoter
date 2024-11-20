import { db } from "@vercel/postgres";
import { NextResponse } from "next/server";

const updatePopularity = async (winnerId: number, loserId: number) => {
  const client = await db.connect();
  const vote = await client.sql`
UPDATE pokemon
SET popularity = CASE 
    WHEN id = ${winnerId} THEN popularity + 1
    WHEN id = ${loserId} THEN popularity - 1
    ELSE popularity
END
WHERE id IN (${winnerId}, ${loserId});
  `;

  return vote;
};

const insertVote = async (
  username: string,
  winnerId: number,
  loserId: number
) => {
  const client = await db.connect();
  const vote = await client.sql`
    INSERT INTO votes (username, pokemon_1_id, pokemon_2_id, winner_id)
    VALUES (${username}, ${winnerId}, ${loserId}, ${winnerId})
    `;
  return vote;
};

export async function POST(req: Request) {
  let client: any;
  try {
    const { winnerId, loserId } = await req.json();

    // Todo add authentication to get the username
    client = await db.connect();
    await client.sql`BEGIN`;

    const username = "unknown";
    await updatePopularity(winnerId, loserId);
    await insertVote(username, winnerId, loserId);

    await client.sql`COMMIT`;

    return NextResponse.json(
      { message: "Vote successfully recorded" },
      { status: 200 }
    );
  } catch (error) {
    const err = error as any;
    console.error("Error handling vote:", {
      message: err.message,
      stack: err.stack,
      details: err,
    });

    // Rollback transaction in case of error
    await client.sql`ROLLBACK`;

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    // Close the database connection to avoid weird error that i get on my logs
    if (client) {
      client.release();
    }
  }
}
