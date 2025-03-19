import { connectDB } from "../lib/connection";
import Contact from "../models/contact";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    await connectDB();

    console.log("Received Headers:", req.headers);

    const token = req.headers.get("authorization")?.split(" ")[1];
    console.log("Extracted Token:", token);

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!);
    } catch (err) {
      console.error("Token verification failed:", err);
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const { name, email, phone, company, address } = await req.json();

    const newContact = await Contact.create({
      userId: decoded.userId,
      name,
      email,
      phone,
      company,
      address,
      
    });

    return NextResponse.json(
      { message: "Contact created", contact: newContact },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in API:", error);
    return NextResponse.json(
      { error: "Failed to create contact" },
      { status: 500 }
    );
  }
}



export async function GET(req: Request) {
  try {
    await connectDB();

    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const userId = decoded.userId;

    const contacts = await Contact.find({ userId });

    return NextResponse.json(contacts, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch contacts" },
      { status: 500 }
    );
  }
}


export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
      await connectDB();
  
      const token = req.headers.get("authorization")?.split(" ")[1];
      if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
      const userId = decoded.userId;
  
      const contactId = params.id;
      const contact = await Contact.findOneAndDelete({ _id: contactId, userId });
  
      if (!contact) {
        return NextResponse.json({ error: "Contact not found or unauthorized" }, { status: 404 });
      }
  
      return NextResponse.json({ message: "Contact deleted" }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: "Failed to delete contact" }, { status: 500 });
    }
  }
  
