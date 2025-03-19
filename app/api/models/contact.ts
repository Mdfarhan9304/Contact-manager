import mongoose, { Schema, Document } from "mongoose";

export interface IContact extends Document {
  userId: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  address?: string;

}

const ContactSchema = new Schema<IContact>(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    company: { type: String },
    address: { type: String },
 
  },
  { timestamps: true }
);

export default mongoose.models.Contact || mongoose.model<IContact>("Contact", ContactSchema);
