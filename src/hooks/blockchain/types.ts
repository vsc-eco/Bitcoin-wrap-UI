import { Asset, Chain } from './assets'

export interface Blockchain {
  transfer(to: string, amount: number, asset: Asset): Promise<TransferResult>
}

export type TransferResult = {
  chain: Chain
  txId: string
}
