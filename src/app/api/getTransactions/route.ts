import axios from "axios";
import { client } from "../../../utils/db";
import cron from "node-cron";
import { NextResponse } from "next/server";



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
//
//TODO: we have to take the address as the user input
export async function GET(req: Request) {
  
   await client.connect();
   try{
     const db = client.db('test');
     const Transactions = db.collection('TransactionSchema')

     //apply the filter 
     const query = {}
     const options = {}

     const result = await Transactions.find({}).toArray()
     
     return NextResponse.json(result)
   }catch(err){
    console.error(err)
   }

}


//Things to figure out
// How to start the cron job 