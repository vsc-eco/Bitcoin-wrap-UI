//Schemas for storing the btc address , //address as a parameter in the post request  
//Schema for storing the list of transactions associated particular btc adress
import mongoose, {Schema, Document} from "mongoose";


interface BitcoinAddress {
    address: string,
    to: String,
    label: string,
    createdAt: Date,
    expireAt: Date
    
 }

 const BitcoinAddressSchema = new Schema<BitcoinAddress>({
  address: {
    type: String,
    required: true,
    unique: true
  },
  to:{
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expireAt: {
    type: Date,
    
  }
});

export const BitcoinAddressModel = mongoose.model<BitcoinAddress & Document>('BitcoinAddress', BitcoinAddressSchema);
