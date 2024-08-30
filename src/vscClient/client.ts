import { getNonce, uint8ArrayToBase64Url } from '@vsc.eco/client/dist/utils'
import { submitTxQuery } from '@vsc.eco/client/dist/queries'
import Axios from 'axios'
import { encodePayload } from 'dag-jose-utils'

type Client = {
  api: string
  userId: string
  nonce: number | null
}

export type CallContractTransaction = {
  op: 'call_contract'
  action: string
  contract_id: string
  payload: any
}

export type TransferTransaction = {
  op: 'transfer'
  payload: {
    tk: 'HIVE' | 'HBD'
    to: string
    from: string
    memo?: string
    amount: number
  }
}

export type WithdrawTransaction = {
  op: 'withdraw'
  payload: {
    tk: 'HIVE' | 'HBD'
    to: string
    from: string
    memo?: string
    amount: number
  }
}

export type Transaction =
  | CallContractTransaction
  | WithdrawTransaction
  | TransferTransaction

export type Signer<ExtraArgs extends any[] = []> = (
  tx: TransactionContainerV2,
  client: Client,
  ...signerArgs: ExtraArgs
) => SignedTransaction | Promise<SignedTransaction>

export type Signature =
  | {
      t: 'eip191'
      s: string
    }
  | {
      alg: string
      kid: string
      sig: string
    }

export type SignedTransaction = {
  sigs: Signature[]
  rawTx: Uint8Array
}

export type TransactionResult = {
  id: string
}

export enum TransactionDbType {
  null,
  input,
  output,
  virtual,
  core,
  anchor_ref,
}

export enum TransactionIntent {
  'money.spend' = 'money.spend',
}

export interface SignatureContainer {
  __t: 'vsc-sig'
  sigs: Signature[]
}

/**
 * Offchain transaction format
 */
export interface TransactionContainerV2 {
  __t: 'vsc-tx'
  __v: '0.2'
  headers: {
    // payer?: string
    // lock_block?: number
    // expire_block?: number
    nonce: number
    required_auths: string[]
    //Tuple of transaction intent enum and arguments as querystring
    intents: [TransactionIntent, string][]
    type: TransactionDbType
  }
  tx: Transaction
}

export function createClient(userId: string, api?: string): Client {
  return {
    api: api ?? 'https://api.vsc.eco',
    userId,
    nonce: null,
  }
}

type TupleRemoveFirstTwoValues<T extends any[]> = T extends [
  any,
  any,
  ...infer Rest,
]
  ? [...Rest]
  : []

export async function signAndBrodcastTransaction<
  SigningFunc extends Signer<ExtraSignerArgs>,
  ExtraSignerArgs extends any[],
>(
  tx: Transaction,
  signer: SigningFunc,
  client: Client,
  ...signerArgs: TupleRemoveFirstTwoValues<Parameters<SigningFunc>>
): Promise<TransactionResult> {
  if (client.nonce === null) {
    client.nonce = await getNonce(client.userId, `${client.api}/api/v1/graphql`)
  }

  const txData: TransactionContainerV2 = {
    __t: 'vsc-tx',
    __v: '0.2',
    headers: {
      // payer?: string
      // lock_block?: number
      // expire_block?: number
      nonce: client.nonce!,
      required_auths: [client.userId],
      //Tuple of transaction intent enum and arguments as querystring
      intents: [],
      type: TransactionDbType.input,
    },
    tx,
  }

  const signedTx = await signer(
    txData,
    client,
    // @ts-ignore
    ...signerArgs,
  )

  const sigEncoded = uint8ArrayToBase64Url(
    (
      await encodePayload({
        __t: 'vsc-sig',
        sigs: signedTx.sigs,
      })
    ).linkedBlock,
  )
  const txEncoded = uint8ArrayToBase64Url(signedTx.rawTx)

  const { data } = await Axios.post(`${client.api}/api/v1/graphql`, {
    query: submitTxQuery,
    variables: {
      tx: txEncoded,
      sig: sigEncoded,
    },
  })
  console.log(data)
  if (data?.data?.submitTransactionV1) {
    const submitResult = data.data.submitTransactionV1
    client.nonce!++
    console.log(submitResult)
    return {
      id: submitResult.id,
    }
  }

  throw new Error(`vsc transaction failed: ${data.error}`)
}
