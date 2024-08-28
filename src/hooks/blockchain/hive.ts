import { HIVE_PREFIX, aioha } from '../auth/hive'
import { Asset, Chain } from './assets'
import { Blockchain } from './types'
import { Asset as HiveAsset } from '@aioha/aioha'

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
    //         same applies to HIVE only asset
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
} satisfies Blockchain

function assetToCurrency(asset: Asset): HiveAsset {
  switch (asset.name) {
    case 'HIVE':
      return HiveAsset.HIVE
    case 'HBD':
      return HiveAsset.HBD
  }
}
