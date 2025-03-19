import { connectDB } from "../../lib/connection";
import Contact from "../../models/contact";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();

    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const userId = decoded.userId;

    const contactId = params.id;
    const { name, email, phone, company, address } = await req.json();

    const contact = await Contact.findOne({ _id: contactId, userId });
    if (!contact) {
      return NextResponse.json({ error: "Contact not found or unauthorized" }, { status: 404 });
    }

    contact.name = name || contact.name;
    contact.email = email || contact.email;
    contact.phone = phone || contact.phone;
    contact.company = company || contact.company;
    contact.address = address || contact.address;
   

    await contact.save();

    return NextResponse.json({ message: "Contact updated successfully", contact }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update contact" }, { status: 500 });
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
