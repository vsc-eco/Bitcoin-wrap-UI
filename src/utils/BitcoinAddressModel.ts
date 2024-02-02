//Schemas for storing the btc address , //address as a parameter in the post request
//Schema for storing the list of transactions associated particular btc adress
import mongoose, { Schema, Document } from "mongoose";

interface BitcoinAddress extends Document {
  address: string;
  status: string;
  createdAt: Date;
  pingedAt: Date;
}
const BitcoinAddressSchema = new Schema<BitcoinAddress>({
  address: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  //when it stops checking then it would reset
  pingedAt: {
    type: Date,
    default: Date.now
  },
});

export const BitcoinAddressModel = mongoose.models.BitcoinAddress
  ? mongoose.model<BitcoinAddress>("BitcoinAddress")
  : mongoose.model<BitcoinAddress & Document>(
      "BitcoinAddress",
      BitcoinAddressSchema
    );


