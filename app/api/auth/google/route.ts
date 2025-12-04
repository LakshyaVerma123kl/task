// app/api/auth/google/route.ts
import { NextResponse } from "next/server";

/**
 * GET /api/auth/google
 * Redirect to Google OAuth consent screen
 */
export async function GET(req: Request) {
  try {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const redirectUri =
      process.env.GOOGLE_REDIRECT_URI ||
      `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/google/callback`;

    if (!clientId) {
      return NextResponse.json(
        { error: "Google OAuth is not configured" },
        { status: 500 }
      );
    }

    // Build Google OAuth URL
    const googleAuthUrl = new URL(
      "https://accounts.google.com/o/oauth2/v2/auth"
    );
    googleAuthUrl.searchParams.append("client_id", clientId);
    googleAuthUrl.searchParams.append("redirect_uri", redirectUri);
    googleAuthUrl.searchParams.append("response_type", "code");
    googleAuthUrl.searchParams.append("scope", "email profile");
    googleAuthUrl.searchParams.append("access_type", "offline");
    googleAuthUrl.searchParams.append("prompt", "consent");

    return NextResponse.redirect(googleAuthUrl.toString());
  } catch (error) {
    console.error("Google OAuth redirect error:", error);
    return NextResponse.json(
      { error: "Failed to initialize Google sign-in" },
      { status: 500 }
    );
  }
}
