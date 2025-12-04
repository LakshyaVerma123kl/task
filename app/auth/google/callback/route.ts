// app/api/auth/google/callback/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import axios from "axios";

/**
 * GET /api/auth/google/callback
 * Handle Google OAuth callback
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    // Handle OAuth errors
    if (error) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/auth/login?error=google_auth_failed`
      );
    }

    if (!code) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/auth/login?error=missing_code`
      );
    }

    // Exchange code for tokens
    const tokenResponse = await axios.post(
      "https://oauth2.googleapis.com/token",
      {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri:
          process.env.GOOGLE_REDIRECT_URI ||
          `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/google/callback`,
        grant_type: "authorization_code",
      }
    );

    const { access_token } = tokenResponse.data;

    // Get user info from Google
    const userInfoResponse = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const { email, id: googleId, name, picture } = userInfoResponse.data;

    // Connect to database
    await connectDB();

    // Find or create user
    let user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      // Create new user without password (OAuth user)
      user = await User.create({
        email: email.toLowerCase(),
        password: `google_oauth_${googleId}_${Date.now()}`, // Random password for OAuth users
        googleId,
        name,
        picture,
      });
    } else if (!user.googleId) {
      // Link Google account to existing user
      user.googleId = googleId;
      user.name = name || user.name;
      user.picture = picture || user.picture;
      await user.save();
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "7d" }
    );

    // Create response and redirect to dashboard
    const response = NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?login=success`
    );

    // Set HTTP-only cookie
    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Google OAuth callback error:", error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/auth/login?error=google_auth_failed`
    );
  }
}
