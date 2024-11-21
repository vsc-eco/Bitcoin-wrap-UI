import { getNonce, uint8ArrayToBase64Url } from '@vsc.eco/client/dist/utils'
import { submitTxQuery } from '@vsc.eco/client/dist/queries'
import Axios from 'axios'
import { encodePayload } from 'dag-jose-utils'
import { Tr } from '@chakra-ui/react'
import { aioha } from '../hooks/auth/hive'
import { CompletedIntents, IntentsBuilder, TransactionIntent } from './intents'

type Client = {
  api: string
  userId: string
  nonce: number | null
  netId: 'testnet/0bf2e474-6b9e-4165-ad4e-a0d78968d20c'
}

export type DepositToDexTransaction = {
  op: 'call_contract'
  action: 'deposit'
  contract_id: 'vs41q9c3ygqhcuxhu07meg3klwnsfadwfy52dtjjx5s4346d3p7q9684pngr6ug45hvh'
  payload: {
    hbd: number
    hive: number
  }
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
  | DepositToDexTransaction

export type Signer<ExtraArgs extends any[] = []> = (
  tx: OffchainTransactionContainerV2,
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

export interface SignatureContainer {
  __t: 'vsc-sig'
  sigs: Signature[]
}

/**
 * Offchain transaction format
 */
export interface OffchainTransactionContainerV2 {
  __t: 'vsc-tx'
  __v: '0.2'
  headers: {
    // payer?: string
    // lock_block?: number
    // expire_block?: number
    nonce: number
    required_auths: string[]
    //Tuple of transaction intent enum and arguments as querystring
    intents: CompletedIntents
    type: TransactionDbType
  }
  tx: Transaction
}

/**
 * Onchain transaction format
 */
export interface OnchainTransactionContainerV2 {
  __t: 'vsc-tx'
  __v: '0.2'
  net_id: 'testnet/0bf2e474-6b9e-4165-ad4e-a0d78968d20c'
  headers: {
    // payer?: string
    // lock_block?: number
    // expire_block?: number
    //Tuple of transaction intent enum and arguments as querystring
    intents: CompletedIntents
    type: TransactionDbType
  }
  tx: Transaction
}

export function createClient(userId: string, api?: string): Client {
  return {
    api: api ?? 'https://api.vsc.eco',
    userId,
    nonce: null,
    netId: 'testnet/0bf2e474-6b9e-4165-ad4e-a0d78968d20c',
  }
}

type TupleRemoveFirstTwoValues<T extends any[]> = T extends [
  any,
  any,
  ...infer Rest,
]
  ? [...Rest]
  : []

export async function signAndBroadcastTransaction<
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

  const txData: OffchainTransactionContainerV2 = {
    __t: 'vsc-tx',
    __v: '0.2',
    headers: {
      // payer?: string
      // lock_block?: number
      // expire_block?: number
      nonce: client.nonce!,
      required_auths: [client.userId],
      //Tuple of transaction intent enum and arguments as querystring
      // intents: [], // todo: intents? todo: 1 giant string, type wrong
      // todo: plus 1 for HBD, and I can pass both in so its more structured
      intents: IntentsBuilder.fromIntents([
        [TransactionIntent['hive.allow_transfer'], { token: 'HIVE', limit: 1 }],
      ]),
      type: TransactionDbType.input,
    },
    tx,
  }

  alert('txData:' + JSON.stringify(txData))

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

  console.log({
    query: submitTxQuery,
    variables: { tx: txEncoded, sig: sigEncoded },
  })

  const { data } = await Axios.post(`${client.api}/api/v1/graphql`, {
    query: submitTxQuery,
    variables: {
      tx: txEncoded,
      sig: sigEncoded,
    },
  })
  console.log(data)
  alert(JSON.stringify(data))
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

export type OnchainTransaction = DepositTransaction | Transaction

export type DepositTransaction = {
  op: 'deposit'
  payload: {
    tk: 'HIVE' | 'HBD'
    to: string
    from: string
    memo?: string
    amount: number
  }
}

export type SubmittedTransaction = {
  id: string
}

export type HiveSigner<
  ExtraJsonArgs extends any[] = [],
  ExtraTransferArgs extends any[] = ExtraJsonArgs,
> = {
  json(
    auth: 'active' | 'posting',
    id: 'vsc.tx',
    tx: OnchainTransactionContainerV2,
    ...signerArgs: ExtraJsonArgs
  ): SubmittedTransaction | Promise<SubmittedTransaction>
  transfer(
    tx: DepositTransaction,
    ...signerArgs: ExtraTransferArgs
  ): SubmittedTransaction | Promise<SubmittedTransaction>
}

export async function signAndBroadcastTransactionToHive<
  HiveSignerInstance extends HiveSigner<
    ExtraJsonSignerArgs,
    ExtraTransferSignerArgs
  >,
  ExtraJsonSignerArgs extends any[],
  ExtraTransferSignerArgs extends any[],
  Tx extends OnchainTransaction,
>(
  tx: Tx,
  signer: HiveSignerInstance,
  auth: 'active' | 'posting',
  client: Client,
  ...signerArgs: TupleRemoveFirstTwoValues<
    Parameters<
      HiveSignerInstance[Tx['op'] extends 'deposit' ? 'transfer' : 'json']
    >
  >
): Promise<TransactionResult> {
  alert('op is ' + tx.op)
  if (tx.op === 'deposit') {
    const res = await signer.transfer(
      tx,
      // @ts-ignore
      ...signerArgs,
    )
    return res
  }

  // todo: 1 for each intent types, separate file,
  // todo: "builds intents" new file in vsc client called intents.ts call it a day

  const txData: OnchainTransactionContainerV2 = {
    __t: 'vsc-tx',
    __v: '0.2',
    net_id: client.netId,
    headers: {
      // payer?: string
      // lock_block?: number
      // expire_block?: number
      //Tuple of transaction intent enum and arguments as querystring
      // intents: [[TransactionIntent['hive.allow_transfer'], '?token=HIVE&limit=1']],
      intents: IntentsBuilder.fromIntents([
        [TransactionIntent['hive.allow_transfer'], { token: 'HIVE', limit: 1 }],
      ]),
      type: TransactionDbType.input,
    },
    tx,
  }

  alert('trying to sign')
  const res = await signer.json(
    auth,
    'vsc.tx',
    txData,
    // @ts-ignore
    aioha,
    ...signerArgs,
  )
  return res
}
