import { VercelPoolClient, db } from "@vercel/postgres";
import { NextResponse } from "next/server";



const fetchLatestVotes = async (client: VercelPoolClient) => {
  const latestVotes = await client.sql`
      SELECT * FROM votes
      ORDER BY vote_date DESC LIMIT 4
      `;

  return latestVotes;
}




export async function GET(){
    let client;

    try{

        client = await db.connect();

        await client.sql`BEGIN`;

        const latestVotes = await fetchLatestVotes(client);

        await client.sql`COMMIT`;

        return NextResponse.json(
            {
                latestVotes: latestVotes.rows
            },
            {
                status: 200
            }
        )
    } catch (error){
        console.error("Error handling vote:", error);

        if(client){
            await client.sql`ROLLBACK`;
        }

        return NextResponse.json(
            {
                error: error
            },
            {
                status: 500
            }
        )
    }
}