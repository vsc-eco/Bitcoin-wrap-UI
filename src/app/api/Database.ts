
import mongoose, { Document, Schema } from "mongoose"

// interface Connection  {
//   isConnected?: number;
// }


const connection = {}

export async function connectDB() {
  const db = await mongoose.connect("mongodb://127.0.0.1:27017/vscproject") 
  let res = db.connections[0].readyState;
  console.log(res);
}

// export async function HelloWorld() {
//   console.log("Hello World");
// }



