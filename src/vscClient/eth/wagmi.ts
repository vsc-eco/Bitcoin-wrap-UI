import { convertEIP712Type } from '@vsc.eco/client/dist/utils'
import { encode, decode } from '@ipld/dag-cbor'
// import { hashTypedData, recoverTypedDataAddress, recoverAddress } from 'viem'
import { encodePayload } from 'dag-jose-utils'
import type { Signer } from '../client'
import { Config, signTypedData } from '@wagmi/core'

export const wagmiSigner = (async (txData, client, config: Config) => {
  alert('DOING DECODE STUFF' + JSON.stringify(txData))
  const types = convertEIP712Type(decode(encode(txData)))
  const signature = await signTypedData(config, types as any)

  const sigs = [
    {
      t: 'eip191',
      //Key id copy
      s: signature,
    } as const,
  ]

  const rawTx = (await encodePayload(txData)).linkedBlock

  return {
    sigs,
    rawTx,
  }
}) satisfies Signer<[Config]>
