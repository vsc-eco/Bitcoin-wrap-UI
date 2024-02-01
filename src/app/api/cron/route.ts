import { NextResponse } from "next/server";
import axios from "axios";
import { connectDB } from "../../../utils/db";
import { BitcoinTransactionModel } from "../../../utils/TransactionModel";
import { BitcoinAddressModel } from "../../../utils/BitcoinAddressModel";
import cron from "node-cron";


export async function fetchTransactions(address: String) {
    try {
      const response = await axios.get(
        `https://mempool.space/address/${address}/txs`
      );
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.error("Error fetching the transactions: ", err);
      return null;
    }
  }

  
  async function checkForTx() {
    //connect the database
    await connectDB();
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const fetchedAddresses = await BitcoinAddressModel.find({
        pinged_At: { $gt: oneHourAgo },
      });
    //check for the new transactions
    for (const {address} of fetchedAddresses) {
      try {
        let transactions = await fetchTransactions(address);
  
        //process each pending transactions
        for (const tx of transactions) {
          //check if the transactions is already on your database
  
            await BitcoinTransactionModel.findOneAndUpdate(
              { txid: tx.txid },
              { ...tx, status: tx.status.confirmed === true ? 'confirmed': "pending"}, {
                upsert: true
              }
            );
        }
      } catch (err) {
        console.error(err);
      }
    }
  }
export async function GET(req: Request){
 await checkForTx();
 return Response.json({message: "api executed"})
}