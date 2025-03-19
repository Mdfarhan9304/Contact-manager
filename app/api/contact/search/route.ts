import { connectDB } from "../../lib/connection";
import Contact from "../../models/contact";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  try {
    await connectDB();

    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const userId = decoded.userId;

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");

    if (!query) {
      return NextResponse.json({ error: "Search query is required" }, { status: 400 });
    }

    const contacts = await Contact.find({
      userId,
      $or: [
        { name: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
        { phone: { $regex: query, $options: "i" } },
        { company: { $regex: query, $options: "i" } },
      ],
    });

    return NextResponse.json(contacts, { status: 200 });
  } catch (error) {
    console.error("Error in search API:", error);
    return NextResponse.json({ error: "Failed to search contacts" }, { status: 500 });
  }
}
