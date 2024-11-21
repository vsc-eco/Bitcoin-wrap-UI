import { Asset, Chain } from './assets'

export interface Blockchain {
  // todo: pass in contract addr... some validation logic needs to be fixed? but send to contract id
  // todo: start with 0 if i want, 1
  transfer(to: string, amount: number, asset: Asset): Promise<TransferResult>
  signProfilePicture?(image: Blob): Promise<SignedProfilePicture>
  updateProfile?(profile: Record<string, string>): Promise<UpdateProfileResult>
  // callContract(action: string, payload: any, contract_id: string): Promise<ContractCallResult> // todo
  depositToDex(hbd: number, hive: number): Promise<DepositToDexResult> // todo: both
}

export type DepositToDexResult =
  | {
      success: true
      txId: string
    }
  | {
      success: false
      error: string
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
