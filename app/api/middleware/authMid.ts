import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET as string;

export function verifyToken(req: Request): { userId: string; email: string } | null {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) return null;

    const token = authHeader.split(" ")[1]; // Bearer token
    return jwt.verify(token, JWT_SECRET) as { userId: string; email: string };
   
  } catch (error) {
    return null;
  }
}
