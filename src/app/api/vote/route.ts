import { db } from "@vercel/postgres";
import { NextResponse } from "next/server";

const client = await db.connect();

const updatePopularity = async (winnerId: number, loserId: number) => {
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
  const vote = await client.sql`
    INSERT INTO votes (username, pokemon_1_id, pokemon_2_id, winner_id)
    VALUES (${username}, ${winnerId}, ${loserId}, ${winnerId})
    `;
  return vote;
};

export async function POST(req: Request) {

  try {
    const { winnerId, loserId } = await req.json();


    // Todo add authentication to get the username
    const username = "unknown";

    await client.sql`BEGIN`;
    await updatePopularity(winnerId, loserId);
    await insertVote(username, winnerId, loserId);
    await client.sql`COMMIT`;

    return NextResponse.json(
      { message: "Vote successfully recorded" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error handling vote:", error);

    // Rollback transaction in case of error
    await client.sql`ROLLBACK`;

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    // Close the database connection to avoid weird error that i get on my logs
    if (client) {
      await client.release();
    }
  }
}
