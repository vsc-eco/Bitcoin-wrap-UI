import axios from "axios";
import { client } from "../../../utils/db";}
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
  
   await client.connect();
   try{
     const db = client.db('test');
     const Transctions = db.collection('TransactionSchema')

     const query = {}
     
   }catch(err){
    console.error(err)
   }

}


//Things to figure out
// How to start the cron job 