import jwt from "jsonwebtoken";

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
    const secret = process.env.JWT_SECRET;

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
  const secret = process.env.JWT_SECRET;

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
