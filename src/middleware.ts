import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
 
export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  //Remember to remove this line
  console.log("token", token);
  const { pathname } = req.nextUrl

  if (pathname === "/login") return NextResponse.next();

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  if (pathname === "/"){
    return NextResponse.redirect(new URL('/game', req.url));
  }


  return NextResponse.next();
}

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher

  // matches on every other path than /login
  matcher: ['/game', '/api', '/', '/stats'],
};