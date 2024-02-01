import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "../../../utils/db";
import { BitcoinAddressModel } from "../../../utils/BitcoinAddressModel";

// export async function POST(req: Request) {
//   //connecting to the database
//   await connectDB();

//   const body = await req.json();

//   for (const item of body) {
//     const { address, status } = item;

//     // Input validation
//     if (!address || !status) {
//       return Response.json({ message: "Missing address or label" });
//     }

//     // if the address already exists
//     const existingAddress = await BitcoinAddressModel.findOne({ address });
//     if (existingAddress) {
//       return Response.json({ message: "Address already exists" });
//     }

//     const newAddress = new BitcoinAddressModel({ address, status });
//     await newAddress.save();

//     return Response.json(newAddress);
//   }
// }


export async function POST(req: Request) {
  // Connecting to the database (Assuming connectDB() is a function you've defined)
  await connectDB();

  const body = await req.json(); // Parse the incoming request body

  // Check if the body is an array
  if (!Array.isArray(body)) {
      return new Response(JSON.stringify({ error: "Invalid input format" }), {
          status: 400,
          headers: {
              'Content-Type': 'application/json',
          },
      });
  }

  // Iterate over each object in the array
  for (const item of body) {
      const { address, status } = item;

      // Perform input validation for each item
      if (!address || !status) {
          continue; // Skip invalid items or handle as needed
      }

      // Check if the address already exists in the database
      const existingAddress = await BitcoinAddressModel.findOne({ address });
      if (!existingAddress) {
          // Create and save a new address if it doesn't exist
          const newAddress = new BitcoinAddressModel({ address, status });
          await newAddress.save();
      }
  }

  return new Response(JSON.stringify({ message: "Data processed successfully" }), {
      status: 200,
      headers: {
          'Content-Type': 'application/json',
      },
  });
}