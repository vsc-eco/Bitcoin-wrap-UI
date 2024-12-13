import type { Signer } from '../client'
import { Config, signTypedData } from '@wagmi/core'
import {
  encodePayload,
  convertCBORToEIP712TypedData,
  decode,
  encode,
} from '../message'

export const wagmiSigner = (async (txData, _, config: Config) => {
  // not doing encode/decode for txData because convertCBORToEIP712TypedData handles internally
  const res = (await encodePayload(txData)).linkedBlock
  const eip712TypedData = convertCBORToEIP712TypedData(
    'vsc.network',
    res,
    'tx_container_v0',
  )

  const signature = await signTypedData(config, eip712TypedData as any)

  const sigs = [
    {
      t: 'eip191',
      s: signature,
    } as const,
  ]

  return {
    sigs,
    rawTx: res,
  }
}) satisfies Signer<[Config]>
