import { NextRequest, NextResponse } from "next/server";
import { auth } from "./app/auth";


export async function middleware(request: NextRequest) {
  const session = await auth()

  if (!session && request.nextUrl.pathname !== "/login"){
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (session && request.nextUrl.pathname === "/login"){
    return NextResponse.redirect(new URL('/game', request.url))
  }
} 

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}