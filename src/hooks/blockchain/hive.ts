//TODO: Declare the SignedProfilePic function and implement the signMessage function there

import {
  AccountUpdate2Operation,
  CustomJsonOperation,
  OperationName,
  VirtualOperationName,
} from '@hiveio/dhive'
import {
  CallContractTransaction,
  createClient,
  DepositToDexTransaction,
  OffchainTransactionContainerV2,
  OnchainTransactionContainerV2,
  signAndBroadcastTransaction,
  signAndBroadcastTransactionToHive,
  TransactionDbType,
} from '../../vscClient/client'
import { HIVE_PREFIX, aioha } from '../auth/hive'
import { Asset, Chain } from './assets'
import { Blockchain, DepositToDexResult } from './types'
import { Asset as HiveAsset, KeyTypes } from '@aioha/aioha'
import { PostingJsonMetadata, Profile } from '../VSC'
import { multiConfig } from '../auth/wagmi-web3modal/config'
import { OperationResult } from '@aioha/aioha/build/types'
import { wagmiSigner } from '../../vscClient/eth/wagmi'
import { aiohaSigner } from '../../vscClient/hive/aioha'
import Transaction from '../../transactions/Transaction'
import { IntentsBuilder, TransactionIntent } from '../../vscClient/intents'

const vscClient = createClient(
  'unknown',
  process.env['NEXT_PUBLIC_VSC_NODE_URL'],
)

export const hive = {
  async transfer(to, amount, asset) {
    let memo: string | undefined = undefined
    if (!to.startsWith(HIVE_PREFIX) || asset.chain === Chain.VSC) {
      memo = `to=${to}`
      to = 'vsc.gateway'
    } else {
      to = to.slice(HIVE_PREFIX.length)
    }
    // TODO check balances
    // TODO if enough balance on VSC prioritize that if asset is on VSC already
    //same applies to HIVE only asset
    const res = await aioha.transfer(to, amount, assetToCurrency(asset), memo)
    console.log('transfer res')
    console.log(res)
    if (!res.success) {
      throw new Error(res.error)
    }
    return {
      chain: Chain.HIVE,
      txId: res.result,
    }
  },

  // async callContract(action: string, payload: any, contract_id: string) {
  //   // ensure the user is logged in
  //   const account = aioha.getCurrentUser();
  //   if (!account) {
  //     throw new Error('Not logged in');
  //   }

  //   // construct the operation as a tuple
  //   const tx: Operation = [
  //     'call_contract',
  //     {
  //       action,
  //       contract_id,
  //       payload,
  //     },
  //   ];

  //   try {
  //     // sign and broadcast the transaction
  //     const res: OperationResult = await aioha.signAndBroadcastTx([tx], KeyTypes.Posting);

  //     // type guard: Check if `res` contains the expected properties
  //     if ('id' in res) {
  //       console.log('Transaction successful:', res);

  //       // return the transaction ID
  //       return {
  //         chain: Chain.HIVE,
  //         txId: res.id, // Safe access to `id`
  //       };
  //     } else {
  //       // handle case where `res` is an error
  //       throw new Error(`Transaction failed: ${res.error}`);
  //     }
  //   } catch (error: any) {
  //     console.error('Error in callContract:', error);

  //     // rethrow a meaningful error
  //     throw new Error(error?.message || 'An unknown error occurred during the transaction.');
  //   }
  // },

  async depositToDex(hbd: number, hive: number): Promise<DepositToDexResult> {
    alert(' calling hive dex method ')
    const account = aioha.getCurrentUser()
    if (!account) throw new Error('Not logged in')

    const tx: DepositToDexTransaction = {
      op: 'call_contract',
      action: 'deposit',
      contract_id:
        'vs41q9c3ygqhcuxhu07meg3klwnsfadwfy52dtjjx5s4346d3p7q9684pngr6ug45hvh',
      payload: { hbd, hive },
    }

    const onchainTxContainerV2: OnchainTransactionContainerV2 = {
      __t: 'vsc-tx',
      __v: '0.2',
      net_id: 'testnet/0bf2e474-6b9e-4165-ad4e-a0d78968d20c',
      headers: {
        intents: IntentsBuilder.fromIntents([
          [
            TransactionIntent['hive.allow_transfer'],
            { token: 'HIVE', limit: 1 },
          ],
        ]),
        type: TransactionDbType.input,
      },
      tx: tx,
    }

    try {
      alert(aioha.customJSON)
      alert(aioha.getCurrentProvider())
      const result = await signAndBroadcastTransactionToHive(
        tx,
        aiohaSigner,
        'posting',
        vscClient,
        onchainTxContainerV2,
        aioha,
      )
      return {
        success: true,
        txId: result.id,
      }
    } catch (error) {
      console.error('Error during depositToDex:', error)
      return {
        success: false,
        error: error.message,
      }
    }
  },

  async signProfilePicture(image) {
    const res = await aioha.signMessage(
      JSON.stringify({
        type: 'Buffer',
        data: [
          ...new TextEncoder().encode('ImageSigningChallenge'),
          ...new Uint8Array(await image.arrayBuffer()),
        ],
      }),
      KeyTypes.Posting,
    )
    return res
  },

  async updateProfile(profile: PostingJsonMetadata) {
    const account = aioha.getCurrentUser()
    if (!account) {
      throw new Error('not logged in')
    }

    //problem: operations[0] is supposed to be an array

    const operation: AccountUpdate2Operation = [
      'account_update2',
      {
        account,
        json_metadata: '',
        posting_json_metadata: JSON.stringify(profile),
        extensions: [],
      },
    ]
    console.log('Operation ->', operation)
    const res = await aioha.signAndBroadcastTx([operation], KeyTypes.Posting)
    return res
  },
} satisfies Blockchain

// todo

function assetToCurrency(asset: Asset): HiveAsset {
  switch (asset.name) {
    case 'HIVE':
      return HiveAsset.HIVE
    case 'HBD':
      return HiveAsset.HBD
  }
}
