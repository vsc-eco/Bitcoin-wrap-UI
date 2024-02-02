import { connectDB } from "../../../utils/db";

export async function POST (req: Request){
  const isConnected =  await connectDB();

  if(!isConnected){
    return Response.json({ message: 'Failed to Connect the database'})
  }else{
   return Response.json({ message: "Database connected!"})
  }
}