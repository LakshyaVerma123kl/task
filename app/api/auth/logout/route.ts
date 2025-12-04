import { NextResponse } from "next/server";

/**
 * POST /api/auth/logout
 * Clear authentication cookie
 */
export async function POST(req: Request) {
  try {
    const response = NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 }
    );

    // Clear the token cookie
    response.cookies.set({
      name: "token",
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }
}
