import { HIVE_PREFIX } from '../../auth/hive'
import { Chain } from '../assets'
import { Blockchain } from '../types'
import { getAccount } from '@wagmi/core'
import {
  CallContractTransaction,
  TransactionResult,
  createClient,
  signAndBroadcastTransaction,
} from '../../../vscClient/client'
import { useAuth } from '../../auth'
import { multiConfig } from '../../auth/wagmi-web3modal/config'
import { ETH_PREFIX } from '../../auth/wagmi-web3modal'
import { wagmiSigner } from '../../../vscClient/eth/wagmi'

const vscClient = createClient(
  'unknown',
  process.env['NEXT_PUBLIC_VSC_NODE_URL'],
)

const ensureAuthenticated = () => {
  const auth = useAuth.getState()
  if (!auth.authenticated) {
    throw new Error('not logged in')
  }
  const userId = auth.userId
  if (!userId.startsWith(ETH_PREFIX)) {
    throw new Error('not logged in with EVM wallet')
  }
  vscClient.userId = userId

  const { address } = getAccount(multiConfig)
  if (userId.slice(ETH_PREFIX.length) !== address) {
    throw new Error(
      `logged in account mismatch: ${userId.slice(ETH_PREFIX.length)} !== ${address}`,
    )
  }
}

export const eth = {
  // async callContract(action, payload, contract_id) {

  //   const tx: CallContractTransaction = {
  //     op: 'call_contract',
  //     action,
  //     contract_id,
  //     payload,
  //   }

  //   const res = await signAndBroadcastTransaction(
  //     tx,
  //     wagmiSigner,
  //     vscClient,
  //     multiConfig,
  //   )

  //   return {
  //     txId: res.id,
  //   }
  // },

  // todo

  async depositToDex(hbd, hive) {
    alert(' calling eth dex method ')
    // ensureAuthenticated()

    // const res = await signAndBroadcastTransaction(
    //   {
    //     op: 'deposit_to_dex',
    //     payload: {
    //       hbd,
    //       hive,
    //     },
    //   },
    //   wagmiSigner,
    //   vscClient,
    //   multiConfig,
    // )

    return {
      success: true,
      txId: 'todo',
    }
  },

  async transfer(to, amount, asset) {
    ensureAuthenticated()

    amount *= 1000

    let res: TransactionResult
    if (to.startsWith(HIVE_PREFIX)) {
      if (asset.chain === Chain.HIVE) {
        // withdraw
        res = await signAndBroadcastTransaction(
          {
            op: 'withdraw',
            payload: {
              to,
              from: vscClient.userId,
              tk: asset.name,
              amount,
            },
          },
          wagmiSigner,
          vscClient,
          multiConfig,
        )
      } else {
        // transfer
        res = await signAndBroadcastTransaction(
          {
            op: 'transfer',
            payload: {
              to,
              from: vscClient.userId,
              tk: asset.name,
              amount,
            },
          },
          wagmiSigner,
          vscClient,
          multiConfig,
        )
      }
    } else {
      if (asset.chain !== Chain.VSC) {
        throw new Error(
          `VSC Accounts can't transfer assets from ${Chain[asset.chain]}`,
        )
      } else {
        // transfer
        res = await signAndBroadcastTransaction(
          {
            op: 'transfer',
            payload: {
              to,
              from: vscClient.userId,
              tk: asset.name,
              amount,
            },
          },
          wagmiSigner,
          vscClient,
          multiConfig,
        )
      }
    }

    return {
      chain: Chain.VSC,
      txId: res.id,
    }
  },
} satisfies Blockchain
