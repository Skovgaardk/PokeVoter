import { fetchAllPokemons } from "@/app/lib/data";
import { db } from "@vercel/postgres";

const client = await db.connect();

/*
The pokemon url is in the format of https://pokeapi.co/api/v2/pokemon/{id}/
So we can extract the id by splitting the url by '/' and taking the 6th element
*/
const createAndSeedPokemonTable = async () => {
  await client.sql`
CREATE TABLE IF NOT EXISTS pokemon (
id INT PRIMARY KEY,
name VARCHAR(255) NOT NULL,
popularity INT DEFAULT 0
);`;

  const pokemon = await fetchAllPokemons();

  const insertedPokemon = await Promise.all(
    pokemon.results.map(
      (pokemon) => client.sql`
    INSERT INTO pokemon (id, name)
    VALUES (${pokemon.url.split("/")[6]}, ${pokemon.name})
    ON CONFLICT (id) DO NOTHING;`
    )
  );

  return insertedPokemon;
};

// outcommented code for maybe future use
// const createMatchesTable = async () => {
//   await client.sql`
// CREATE TABLE IF NOT EXISTS matches (
//   id SERIAL PRIMARY KEY,
//   pokemon_1_id INT REFERENCES pokemon(id),
//   pokemon_2_id INT REFERENCES pokemon(id),
//   winner_id INT REFERENCES pokemon(id),
//   loser_id INT REFERENCES pokemon(id),
//   match_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );`;
// };

const createVoteTable = async () => {
  await client.sql`
CREATE TABLE IF NOT EXISTS votes (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255),
  pokemon_1_id INT REFERENCES pokemon(id),
  pokemon_2_id INT REFERENCES pokemon(id),
  winner_id INT REFERENCES pokemon(id),
  vote_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;
};

export async function GET() {

  try {
    await client.sql`BEGIN`;
    await createAndSeedPokemonTable();
    await createVoteTable();
    await client.sql`COMMIT`;

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
