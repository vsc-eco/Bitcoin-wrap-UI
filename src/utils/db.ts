
import mongoose, { Document, Schema } from "mongoose"


const connection = {}
 //TODO: mongo db uri is exposed
 
export async function connectDB() {
  try {
    const db = await mongoose.connect("");
    return true;
  } catch (error) {
    console.error("Database connection failed", error);
    return false
  }
}
