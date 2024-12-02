import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/app/auth";

export async function middleware(req: NextRequest) {
  const session = await auth();

  if (!session && req.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (session && req.nextUrl.pathname === "/login"){
    return NextResponse.redirect(new URL('/game', req.url));
  }
}

export const config = {
  // Dont match on api routes etc.
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
