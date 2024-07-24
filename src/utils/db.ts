import { MongoClient } from "mongodb";
const uri = process.env.URI;

if (!uri) {
  throw new Error("missing `URI` env var for mongodb database connection");
}

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const client = new MongoClient(uri, {});

async function connectDB() {
  // Connect the client to the server	(optional starting in v4.7)
  await client.connect();
  // Send a ping to confirm a successful connection
  const db = await client.db("admin").command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");

  return db;
}
connectDB().catch(console.dir);
