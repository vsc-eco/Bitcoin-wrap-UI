import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "../../../utils/db"
import { BitcoinAddressModel } from "../../../utils/Model";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Establish the connection 
    await connectDB();

    // Take the BTC address from the request and store it to database
    if (req.method === "POST") {
      const { address, label } = req.body;

      // Check if the address already exists
      const existingAddress = await BitcoinAddressModel.findOne({ address });
      if (existingAddress) {
        // Address already exists, do nothing
        return res.status(409).json({ message: "Address already exists" });
      }
      
      const newAddress = new BitcoinAddressModel({ address, label });
      await newAddress.save();
      res.status(201).json(newAddress);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}
