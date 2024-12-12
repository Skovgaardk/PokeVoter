import { NextResponse } from "next/server";
import { createClient } from "../../../../../utils/supabase/server";

export async function GET() {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
    .from("recent_votes_day")
    .select("*");

    if (error) {
      return NextResponse.json({ error });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
