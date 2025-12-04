import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/authUtils"; // Assuming authUtils is in lib/authUtils.ts

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const url = request.nextUrl.pathname;

  // 1. Define routes that do NOT require authentication
  const unprotectedRoutes = [
    "/",
    "/auth/login",
    "/auth/signup",
    "/api/auth/login",
    "/api/auth/signup",
  ];

  // If the user is accessing an unprotected route, allow it.
  if (unprotectedRoutes.includes(url)) {
    return NextResponse.next();
  }

  // 2. Check for token on protected routes
  if (!token) {
    // Redirect to login if token is missing
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // 3. Verify token and enforce validity
  // The 'verifyToken' function uses your JWT_SECRET to decode and check expiration.
  const decoded = verifyToken(token);

  if (!decoded) {
    // If the token is invalid or expired, clear the cookie and redirect to login
    const response = NextResponse.redirect(new URL("/auth/login", request.url));
    response.cookies.delete("token");
    return response;
  }

  // 4. Continue to the protected route if authenticated
  return NextResponse.next();
}

// Configuration to specify which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico
     * - /api/ (API routes are handled internally by their own logic, but we must protect all other routes)
     */
    "/((?!_next/static|_next/image|favicon.ico|api).*)",
    "/",
  ],
};
