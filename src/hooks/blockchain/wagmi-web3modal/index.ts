import { HIVE_PREFIX } from '../../auth/hive'
import { Chain } from '../assets'
import { Blockchain } from '../types'
import { getAccount } from '@wagmi/core'
import {
  TransactionResult,
  createClient,
  signAndBrodcastTransaction,
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
  async transfer(to, amount, asset) {
    ensureAuthenticated()

    amount *= 1000

    let res: TransactionResult
    if (to.startsWith(HIVE_PREFIX)) {
      if (asset.chain === Chain.HIVE) {
        // withdraw
        res = await signAndBrodcastTransaction(
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
        res = await signAndBrodcastTransaction(
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
        res = await signAndBrodcastTransaction(
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
