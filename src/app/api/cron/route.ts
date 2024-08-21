import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import { BitcoinAddress } from '../../../utils/BitcoinAddressModel'
import { Transaction } from '../../../utils/TransactionModel'
import { callbackify } from 'util'

//TODO: adding the indexing for the destinations

type TransctionsSchema = {
  txid: string
  address: any
  vin: {
    prevout: {
      scriptpubkey_address: string
      value: number
    }
  }[]
  vout: {
    scriptpubkey_address: string
    value: number
  }[]
  size: number
  fee: number
  status: {
    confirmed: boolean
  }
  stored_at: Date
}

export async function GET(req: NextRequest) {
  return NextResponse.json({})
  // //connect to the mongo client
  // await client.connect();
  // const db = client.db("test");
  // //Taking a bitcoinAddress schema
  // const bitcoinAddresses = db.collection("bitcoinAddresses");
  // //creating a transaction schema
  // const Transactions = db.collection("TransactionSchema");
  // //creating a variable for storing the timestamp of 1 hour ago
  // const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  // console.log(Number(oneHourAgo));
  // //writing a query for fetching the address that are pinged less than an hour ago
  // const query = { pingedAt: { $gt: Number(oneHourAgo) } };
  // //fetching the addresses
  // const fetchedAddresses = await bitcoinAddresses.find(query).toArray();
  // if(fetchedAddresses.length === 0){
  //   return NextResponse.json({message: "No Addresses that are pinged recently an hour ago!"})
  // }
  // for (const result of fetchedAddresses) {
  //   console.log("This is the address", result.address);
  //   try {
  //     const { data } = await axios.get<Transaction>(
  //       `https://mempool.space/api/address/${result.address}/txs`
  //     );
  //     // console.log("These are the transactions -> ", data)
  //     const customData = data.map((item) => ({
  //       txid: item.txid,
  //       address: result.address,
  //       vin: {
  //         prevout: {
  //           address: item.vin[0].prevout.scriptpubkey_address,
  //           value: item.vin[0].prevout.value,
  //         },
  //       },
  //       vout: item.vout.map((i) => ({
  //         destination: i.scriptpubkey_address,
  //         value: i.value,
  //       })),
  //       size: item.size,
  //       fee: item.fee,
  //       status: item.status.confirmed ? "confirmed" : "pending",
  //       stored_at: new Date(),
  //     }));
  //     // Update it into the database
  //     for (const transaction of customData) {
  //       // console.log(transaction)
  //       const filter = { txid: transaction.txid };
  //       const updateDocument = {
  //         $set: transaction,
  //       };
  //       await Transactions.updateOne(filter, updateDocument, {
  //         upsert: true,
  //       });
  //       //create an index
  //       await Transactions.createIndex({
  //         "vout.destination": 1
  //       })
  //       // getting the indexes
  //       let indexes = await Transactions.indexInformation();
  //       console.log(indexes)
  //       return NextResponse.json({
  //         message: "Transactions updated in the database",
  //       });
  //     }
  //   } catch (error) {
  //     console.error(
  //       `Error fetching transactions for address ${result.address}:`,
  //       error
  //     );
  //   }
  // }
}
