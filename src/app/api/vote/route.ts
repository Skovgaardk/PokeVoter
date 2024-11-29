import { db } from "@vercel/postgres";
import { NextResponse } from "next/server";

async function sendVoteToDB({
  username,
  winnerId,
  loserId,
}: {
  username: string;
  winnerId: number;
  loserId: number;
}) {
  // Todo add authentication to get the username
  const client = await db.connect();
  await client.sql`WITH update_popularity AS (
    UPDATE pokemon
    SET popularity = CASE 
        WHEN id = ${winnerId} THEN popularity + 1
        WHEN id = ${loserId} THEN popularity - 1
        ELSE popularity
    END
    WHERE id IN (${winnerId}, ${loserId})
    RETURNING id
  )
  INSERT INTO votes (username, pokemon_1_id, pokemon_2_id, winner_id)
  VALUES (${username}, ${winnerId}, ${loserId}, ${winnerId});`;
}

export async function POST(req: Request) {
  try {
    const { username, winnerId, loserId } = await req.json();

    //check if there is a username or f
    if (!username || username === undefined) {
      sendVoteToDB({ username: "unknown", winnerId, loserId });
    } else {
      sendVoteToDB({ username, winnerId, loserId });
    }

    return NextResponse.json(
      { message: "Vote successfully recorded" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error handling vote:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
