
import mongoose, { Document, Schema } from "mongoose"


const connection = {}

export async function connectDB() {
  try {
    const db = await mongoose.connect("mongodb+srv://piyushjha:Dard0409@vscproject.tyvpsfe.mongodb.net/?retryWrites=true&w=majority");
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed", error);
  }
}
