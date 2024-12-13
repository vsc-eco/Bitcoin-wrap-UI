import type { Signer } from '../client'
import { Config, signTypedData } from '@wagmi/core'
import { encodePayload, convertCBORToEIP712TypedData } from '../message'

export const wagmiSigner = (async (txData, _, config: Config) => {
  const encodedPayload = (await encodePayload(txData)).linkedBlock
  const eip712TypedData = convertCBORToEIP712TypedData(
    'vsc.network',
    encodedPayload,
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
    rawTx: encodedPayload,
  }
}) satisfies Signer<[Config]>
