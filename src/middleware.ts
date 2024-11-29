import { NextRequest, NextResponse } from "next/server";

export  function middleware(req: NextRequest) {
  const token = req.cookies.get('authjs.session-token');

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  return NextResponse.next();

}
 
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher

  // matches on every other path than /login
  matcher: ['/game', '/api', '/', '/stats'],
};