import cron from "node-cron";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
/**
 * get transactions
 * Options:
 * - Status: pending or confirmed or both
 * - By block height $gt, $lt, etc
 * - By address
 * - Decode transaction <-- talk with me when you get to that
 * -- Extracting the value
 * -- Extracting the destination
 * -- Extracting fee == 3390
 * --
 */

export async function GET(req: Request) {
  // await client.connect();
  // try {
  //   const db = client.db("test");
  //   const Transactions = db.collection("TransactionSchema");
  //   const url = new URL(req.url);
  //   const params = url.searchParams
  //   let fee = Number(params.get('fee'))
  //   let status = params.get('status')
  //   let address = params.get('address')
  //   const query = {}
  //   if(fee){
  //     query['fee'] = { $eq: fee}
  //   }
  //   if(status){
  //     query['status'] = {$eq: status}
  //   }
  //   if(address){
  //     query['address'] = {$eq: address}
  //   }
  //   const result = await Transactions.find(query).toArray();
  //   return NextResponse.json(result);
  // } catch (err) {
  //   console.error(err);
  //   return NextResponse.json({
  //     error: "An error occurred while fetching transactions",
  //   });
  // }
}
