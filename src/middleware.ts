import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "../utils/supabase/middleware";
import { createClient } from "../utils/supabase/server";

export async function middleware(req: NextRequest) {
  // update user's auth session
  return await updateSession(req);
}

export const config = {
  // Dont match on api routes etc.
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
