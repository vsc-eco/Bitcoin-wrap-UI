import { connectDB } from "../../../utils/db";

export async function POST (req: Request){
   await connectDB();
   return Response.json({message: "Database connected succesfully!"})
}