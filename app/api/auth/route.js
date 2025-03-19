
import { NextResponse } from "next/server";
import { connectDB } from "../lib/connection";



export async function GET() {
    await connectDB(); // Connect to MongoDB
  
    console.log("Hello World API Hit!");
  
    return NextResponse.json({ message: "Hello World" });
  }
