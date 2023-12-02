import { useState } from "react";
import Crypto from "crypto";
import { DID } from "dids";
import Axios from 'axios'

const API_URL = "https://api.vsc.eco";
const LOCAL_API = "http://localhost:1337"

export const globalConfig = {
    btcTokenContract: '59dfb8383291734049bfab403ced85a57cbcde6a'
}


async function submitTX(tx) {
    const {data} = await Axios.post(`${API_URL}/api/v1/graphql`, {
        query: `
            query SubmitTx($tx: String) {
                submitTransaction(payload: $tx) {
                    tx_id
                }
            }
        `,
        variables: {
            tx: JSON.stringify(tx)
        }
    })
    console.log(data)
}

async function checkDepositAddr(address) {
    const {data} = await Axios.post(`${API_URL}/api/v1/graphql`, {
        query: `
            query MyQuery($contractId: String, $key: String) {
                contractState(id: $contractId) {
                    state(key: $key)
                }
            }
        `,
        variables: {
            contractId: globalConfig.btcTokenContract,
            key: `btc_addrs/${address}`
        }
    })
    console.log(data)

    if(data.data.contractState.state !== null) {
        return {
            needRegistration: false
        }
    } else {
        return {
            needRegistration: true
        }
    }
}

export async function getOutputs(address) {
    const {data} = await Axios.post(`${API_URL}/api/v1/graphql`, {
        query: `
            query MyOutputs($contractId: String, $key: String, $query: JSON) {
                contractState(id: $contractId) {
                    stateQuery(key: $key, query: $query)
                }
            }
        `,
        variables: {
            contractId: globalConfig.btcTokenContract,
            key: 'outputs',
            query: {
                balance: {
                    $gt: 0
                },
                address: {
                    $eq: address
                }
            }
        }
    })
    
    console.log(data, address)
    return data.data.contractState.stateQuery
}

async function createTx(contract_id: string, args, signer: DID) {
  let contractInput = {
    action: args.action,
    contract_id: contract_id,
    payload: args.payload,
    salt: Crypto.randomBytes(8).toString("base64"),
  };

  //Signed here

  let callContractTx: any = {
    op: 'call_contract',
    type: 1,
    ...contractInput,
  };
  const txContainer = {
    __t: 'vsc-tx',
    __v: '0.1',
    tx: callContractTx,
    // lock_block
  }
  const signedPayload = await signer.createDagJWS(txContainer)

  return signedPayload;
}

async function transferTokens(signer, dest) {

}

function serializeTx(tx) {
    return {
        jws: {
            link: tx.jws.link.toString(),
            payload: tx.jws.payload,
            signatures: tx.jws.signatures
        },
        linkedBlock: Buffer.from(tx.linkedBlock).toString('base64')
    }
}

let registrationPending = false

export function useCreateTx() {
  const [pendingTransactions, setPendingTransactions] = useState();

  const transfer = async (args) => {
    const outputs = await getOutputs(args.did)

    let remainingAmount = args.amount;
    let inputs:Array<{id: string, amount: number}> = [];
    for(let out of outputs) {

        let amt;
        if(out.balance >= remainingAmount) {
            console.log('case 1')
            amt = remainingAmount
        } else if(out.balance < remainingAmount) {
            console.log('case 2')
            amt = out.balance
        }
        remainingAmount = remainingAmount - amt;
        console.log('amt', amt, out.balance, remainingAmount, out, out.Name)
        
        inputs.push({
            id: out._id,
            amount: amt
        })

        if(remainingAmount === 0) {
            break;
        }
    }

    console.log({
        payload: {
            dest: args.dest,
            inputs: inputs,
            asset_type: 'TOKEN:WBTC',
            memo: JSON.stringify({from: 'vaultec', msg: '# via vsc.eco'})
        }
    })
    const signedData = await createTx(globalConfig.btcTokenContract, {
        payload: {
            dest: args.dest,
            inputs: inputs,
            asset_type: 'TOKEN:WBTC',
            memo: JSON.stringify({to: args.destHive, from: 'vaultec', msg: 'via vsc.eco'})
        },
        action: 'applyTx'
    }, args.didAuth)
    console.log(signedData)
    console.log(outputs)
    console.log(await submitTX(serializeTx(signedData)))
  };

  const redeem = async (args) => {
    const outputs = await getOutputs(args.did)

    let remainingAmount = args.amount;
    let inputs:Array<{id: string, amount: number}> = [];
    for(let out of outputs) {
        let amt;
        if(out.balance >= remainingAmount) {
            amt = remainingAmount
        } else if(out.balance < remainingAmount) {
            amt = out.balance
        }
        remainingAmount = remainingAmount - amt;
        
        inputs.push({
            id: out._id,
            amount: amt
        })

        if(remainingAmount === 0) {
            break;
        }
    }

    
    const signedData = await createTx(globalConfig.btcTokenContract, {
        payload: {
            dest: args.dest,
            inputs: inputs,
            asset_type: 'TOKEN:WBTC',
        },
        action: 'redeem'
    }, args.didAuth)
    console.log(signedData)
    console.log(outputs)
  }

  const registerAddr = async (args) => {
    console.log('args.did', args.did)
    const signedData = await createTx(globalConfig.btcTokenContract, {
        payload: {
            addr: args.addr
        },
        action: 'registerDeposit'
    }, args.did)
    console.log(signedData)
    console.log(JSON.stringify(signedData))
    const checkResult = await checkDepositAddr(args.encodedAddr)
    if(checkResult.needRegistration && !registrationPending) {
        registrationPending = true;
        console.log(await submitTX(serializeTx(signedData)))
        setTimeout(() => {
            registrationPending = false;
        }, 120_000)
    }
  };

  return {
    transfer,
    redeem,
    registerAddr,
  };
}
