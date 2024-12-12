import { NextResponse } from "next/server";
import { createClient } from "../../../../../utils/supabase/server";

export async function GET() {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("pokemon")
      .select("*")
      .order("popularity", { ascending: false })
      .limit(3);

    if (error) {
      return NextResponse.json({ error });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
