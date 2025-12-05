// lib/authUtils.ts
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

interface DecodedToken {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

/**
 * Verifies a JWT token and returns the decoded payload if valid.
 * Returns null if the token is invalid or expired.
 */
export const verifyToken = (token: string): DecodedToken | null => {
  try {
    const secret = process.env.JWT_SECRET || "your-secret-key";

    if (!secret) {
      console.error("JWT_SECRET is not defined in environment variables");
      return null;
    }

    const decoded = jwt.verify(token, secret) as DecodedToken;
    return decoded;
  } catch (error) {
    // Token is invalid or expired
    console.error("Token verification failed:", error);
    return null;
  }
};

/**
 * Generates a new JWT token for a user
 */
export const generateToken = (userId: string, email: string): string => {
  const secret = process.env.JWT_SECRET || "your-secret-key";

  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  return jwt.sign({ userId, email }, secret, { expiresIn: "7d" });
};

/**
 * Extracts token from Authorization header
 */
export const extractTokenFromHeader = (
  authHeader: string | null
): string | null => {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  return authHeader.substring(7);
};

/**
 * Get token from cookies (server-side)
 */
export const getTokenFromCookies = async (): Promise<string | null> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    return token?.value || null;
  } catch (error) {
    console.error("Error getting token from cookies:", error);
    return null;
  }
};

/**
 * Verify user from request (supports both header and cookie)
 */
export const verifyRequestAuth = (req: Request): DecodedToken | null => {
  // Try Authorization header first
  const authHeader = req.headers.get("authorization");
  let token = extractTokenFromHeader(authHeader);

  // Fallback to cookie if no header
  if (!token) {
    const cookieHeader = req.headers.get("cookie");
    if (cookieHeader) {
      const match = cookieHeader.match(/token=([^;]+)/);
      token = match ? match[1] : null;
    }
  }

  if (!token) {
    return null;
  }

  return verifyToken(token);
};
