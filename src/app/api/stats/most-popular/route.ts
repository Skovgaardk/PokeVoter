import { db } from "@vercel/postgres";
import { NextResponse } from "next/server";


const getThreeMostPopularPokemons = async () => {
    const client = await db.connect();
    const popular = await client.sql`
      SELECT * FROM pokemon	
      ORDER BY popularity DESC LIMIT 3
      `;
  
    return popular;
  };

export async function GET() {
    let client;
  
    try {
      client = await db.connect();
  
      await client.sql`BEGIN`;
  
      const popular = await getThreeMostPopularPokemons();
  
      await client.sql`COMMIT`;
  
      return NextResponse.json(
          {
              mostPopular: popular.rows,
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