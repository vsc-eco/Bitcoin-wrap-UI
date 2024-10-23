import { Asset, Chain } from './assets'

export interface Blockchain {
  transfer(to: string, amount: number, asset: Asset): Promise<TransferResult>
  signProfilePicture?(image: Blob): Promise<SignedProfilePicture>
  updateProfile?(profile: Record<string, string>): Promise<UpdateProfileResult>
}

export type TransferResult = {
  chain: Chain
  txId: string
}

export type SignedProfilePicture =
  | {
      success: true
      result: string
      publicKey?: string
    }
  | {
      success: false
      error: string
      errorCode: number
    }

export type UpdateProfileResult = {}
