import { NextResponse } from "next/server";
import { client } from "../../../utils/db";


export async function POST(req: Request, ) {
  
  await client.connect();
  try {

    const db = client.db('test');
    const bitcoinAddresses = db.collection('bitcoinAddresses');

    const body = await req.json();

    if (!Array.isArray(body)) {
      return NextResponse.json({ error: "Invalid input format" });

    }

    for (const item of body) {
      const { address, status } = item;

      if (!address || !status) {
        continue;
      }

      const existingAddress = await bitcoinAddresses.findOne({ address });
      if (existingAddress) {
        return NextResponse.json({ message: "Address already exists" });

      }

      const newAddress = { address, status, created_at: Date.now(), pingedAt: Date.now()};
      await bitcoinAddresses.insertOne(newAddress);
    }

    return NextResponse.json({ message: "Data processed successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Couldnt Process it!" });
  } finally {
    await client.close();
  }
}
