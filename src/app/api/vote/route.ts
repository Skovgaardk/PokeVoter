import { createClient } from "../../../../utils/supabase/server";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  try {
    const body = await req.json();

    const { data, error } = await supabase.rpc("handle_vote", body);

    if (error) {
      console.error(error);
      return NextResponse.json({ error });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error });
  }
}
