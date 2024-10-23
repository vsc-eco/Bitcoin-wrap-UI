//TODO: Declare the SignedProfilePic function and implement the signMessage function there

import {
  AccountUpdate2Operation,
  OperationName,
  VirtualOperationName,
} from '@hiveio/dhive'
import { signAndBrodcastTransaction } from '../../vscClient/client'
import { HIVE_PREFIX, aioha } from '../auth/hive'
import { Asset, Chain } from './assets'
import { Blockchain } from './types'
import { Asset as HiveAsset, KeyTypes } from '@aioha/aioha'
import { PostingJsonMetadata, Profile } from '../VSC'

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

function assetToCurrency(asset: Asset): HiveAsset {
  switch (asset.name) {
    case 'HIVE':
      return HiveAsset.HIVE
    case 'HBD':
      return HiveAsset.HBD
  }
}
