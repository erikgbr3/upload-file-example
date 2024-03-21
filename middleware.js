import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
   const session = await getToken({req: request, secret: process.env.NEXTAUTH_SECRET});

   const requestedPage = request.nextUrl.pathname;

   if(!session) {
    return NextResponse.redirect(`${process.env.SERVER_NAME}/login`);
   }

   return NextResponse.next();
  }
  
  // See "Matching Paths" below to learn more
  export const config = {
    matcher: [
        '/inventory/:path*',
        '/products/:path*',
    ],
  }