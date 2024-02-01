import axios from "axios";
import { connectDB } from "../../../utils/db";
import { BitcoinTransactionModel } from "../../../utils/TransactionModel";
import { BitcoinAddressModel } from "../../../utils/BitcoinAddressModel";
import cron from "node-cron";
import { NextResponse } from "next/server";

//function for fetching the transactions


// We would have two cron jobs and two var
// 1. remainingTime  3600 -> 0 making it a global variable

//1. cron job run after every second that will decrement the var with one second
//2. cron job run after every 5 mins it will execute the main function if that elapsed time is not zero
//3. we would be making two functions for calling  cron jobs runCron1 and  runCron2
//4. When the post route is hit initiliaze time remaining to 3600
//5. Run cron jobs function should execute

// cron job function 2

/**
 * get transactions
 * Options:
 * - Status: pending or confirmed or both
 * - By block height $gt, $lt, etc
 * - By address
 * - Decode transaction <-- talk with me when you get to that
 * -- Extracting the value
 * -- Extracting the destination
 * -- Extracting fee
 * --
 */
//
//TODO: we have to take the address as the user input
export async function GET(req: Request) {
  const url = new URL(req.url);
  //we would be fetching the transactions directly from the database
  const address = url.searchParams.get("address")
  // const address = '1wiz18xYmhRX6xStj2b9t1rwWX4GKUgpv';
  const response = await axios.get(`https://mempool.space/api/address/${address}/txs`);
  
  // Assuming you want to return the JSON array of transactions directly:
  return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: {
          'Content-Type': 'application/json'
      }
  });

  //for pending and confirmed transactions 
}


//Things to figure out
// How to start the cron job 