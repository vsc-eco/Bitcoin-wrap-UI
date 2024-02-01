//Schemas for storing the btc address , //address as a parameter in the post request  
//Schema for storing the list of transactions associated particular btc adress
import mongoose, {Schema, Document} from "mongoose";

interface BitcoinAddress {
    address: string,
    // to: String,
    status: string,
    createdAt: Date,
    pinged_At: Date
    
 }
 const BitcoinAddressSchema = new Schema<BitcoinAddress>({
  address: {
    type: String,
    required: true,
    unique: true
  },
  // to:{
  //   type: String,
  //   required: true,
  // },
  status: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  //when it stops checking then it would reset
  pinged_At: {
    type: Date,
  }
});


 export const BitcoinAddressModel = mongoose.model("BitcoinAddress") || mongoose.model<BitcoinAddress & Document>('BitcoinAddress', BitcoinAddressSchema);
