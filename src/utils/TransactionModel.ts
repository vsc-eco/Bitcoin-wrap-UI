import mongoose from "mongoose";
import { Schema, Document } from "mongoose";

interface TransactionModel extends Document {
  address: String;
  txid: String;
  value: Number;
  status: String;
  fee: Number;
  created_at: Date;
}

const TransactionsSchema = new Schema<TransactionModel>({
  address: {
    type: String,
    required: true,
  },
  txid: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "failed"],
    required: true,
  },
  fee: Number,
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export const BitcoinTransactionModel = mongoose.models.TransactionModel
  ? mongoose.model<TransactionModel>("TransactionSchema")
  : mongoose.model<TransactionModel & Document>(
      "TransctionSchema",
      TransactionsSchema
    );
