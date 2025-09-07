import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log("Middleware hit:", req.nextUrl.pathname);
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ req, token }) {
        const { pathname } = req.nextUrl;
        if (
          pathname.startsWith("/api/auth") ||
          pathname.startsWith("/api/video") ||
          pathname === "/login" ||
          pathname === "/register" ||
          pathname === "/videos"
        ) {
          return true;
        }
        if (pathname == "/" || pathname.startsWith("/api/videos")) {
          return true;
        }
        return !!token;
      },
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: [
    "/upload",
    "/api/videos/:path*",
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};
