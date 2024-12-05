import { createClient } from '../../../utils/supabase/server';

export default async function Countries() {
  const supabase = await createClient();
  const { data: pokemon } = await supabase.from("pokemon").select();

  return <pre>{JSON.stringify(pokemon, null, 2)}</pre>
}