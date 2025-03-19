export const dynamic = "force-dynamic";
import { connectDB } from "../../lib/connection";
import User, { IUser } from "../../models/user";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";


const signupSchema = z.object({
  username: z.string().trim().min(3, "Username must be at least 3 characters"),
  email: z.string().trim().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function POST(req: Request) {
  try {
    await connectDB(); // ✅ Ensure DB connection

    const body = await req.json();
    const parsedBody = signupSchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json({ error: parsedBody.error.format() }, { status: 400 });
    }

    const { username, email, password } = parsedBody.data;

  
    const existingUser: IUser | null = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ username, email, password: hashedPassword });

    return NextResponse.json(
      { message: "Signup successful", user: { id: newUser._id, username, email } },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Signup Error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: (error as Error).message },
      { status: 500 }
    );
  }
}
