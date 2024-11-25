import { db, VercelPoolClient } from "@vercel/postgres";
import { NextResponse } from "next/server";

const getVotesHourly = async (client: VercelPoolClient) => {
  const votes = await client.sql`
    SELECT * 
FROM votes 
WHERE vote_date >= NOW() - INTERVAL '1 hour';
`;
    
      return votes;
};


export async function GET() {
  let client;

  try {
    client = await db.connect();

    await client.sql`BEGIN`;

    const votes = await getVotesHourly(client);

    await client.sql`COMMIT`;

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
  } finally {
    if (client) {
      client.release();
    }
  }
}