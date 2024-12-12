import { describe, it, expect } from '@jest/globals'
import { ConvertCBORToEIP712TypedData, encodePayload } from './message'
import { hashDomain, hashTypedData } from 'viem'

describe('eth msg', () => {
  it('domain hash', () => {
    expect(
      hashDomain({
        domain: {
          name: 'vsc.network',
        },
        types: {
          EIP712Domain: [
            {
              name: 'name',
              type: 'string',
            },
          ],
        },
      }),
    ).toBe('0xb364cbb4ec1c3d3d438ef95f01322f22b04280d481abaa8cd6c7b5c7108f1a7e')
  })

  it('matches conversion', async () => {
    const res = (
      await encodePayload({
        __t: 'vsc-tx',
        __v: '0.2',
        headers: {
          intents: [] as any, // TODO should this be here
          nonce: 13,
          required_auths: [
            'did:pkh:eip155:1:0x88EBB64C264AFf10141149F9770F8D644C9D86C5',
          ],
          type: 1,
        },
        tx: {
          op: 'transfer',
          payload: {
            amount: 1,
            from: 'did:pkh:eip155:1:0x88EBB64C264AFf10141149F9770F8D644C9D86C5',
            tk: 'HIVE',
            to: 'did:pkh:eip155:1:0x88EBB64C264AFf10141149F9770F8D644C9D86C5',
          },
        },
      })
    ).linkedBlock
    expect(
      //   convertEIP712Type({
      ConvertCBORToEIP712TypedData('vsc.network', res, 'tx_container_v0'),
    ).toStrictEqual({
      EIP712Domain: [
        {
          name: 'name',
          type: 'string',
        },
      ],
      domain: {
        name: 'vsc.network',
      },
      primaryType: 'tx_container_v0',
      message: {
        __t: 'vsc-tx',
        __v: '0.2',
        headers: {
          intents: [] as any, // TODO should this be here
          nonce: 13,
          required_auths: [
            'did:pkh:eip155:1:0x88EBB64C264AFf10141149F9770F8D644C9D86C5',
          ],
          type: 1,
        },
        tx: {
          op: 'transfer',
          payload: {
            amount: 1,
            from: 'did:pkh:eip155:1:0x88EBB64C264AFf10141149F9770F8D644C9D86C5',
            tk: 'HIVE',
            to: 'did:pkh:eip155:1:0x88EBB64C264AFf10141149F9770F8D644C9D86C5',
          },
        },
      },
      types: {
        tx_container_v0: [
          {
            name: 'tx',
            type: 'tx_container_v0.tx',
          },
          {
            name: '__t',
            type: 'string',
          },
          {
            name: '__v',
            type: 'string',
          },
          {
            name: 'headers',
            type: 'tx_container_v0.headers',
          },
        ],
        'tx_container_v0.headers': [
          {
            name: 'type',
            type: 'uint256',
          },
          {
            name: 'nonce',
            type: 'uint256',
          },
          {
            name: 'intents',
            type: 'undefined[]',
          },
          {
            name: 'required_auths',
            type: 'string[]',
          },
        ],
        'tx_container_v0.tx': [
          {
            name: 'op',
            type: 'string',
          },
          {
            name: 'payload',
            type: 'tx_container_v0.tx.payload',
          },
        ],
        'tx_container_v0.tx.payload': [
          {
            name: 'tk',
            type: 'string',
          },
          {
            name: 'to',
            type: 'string',
          },
          {
            name: 'from',
            type: 'string',
          },
          {
            name: 'amount',
            type: 'uint256',
          },
        ],
      },
    })
  })

  it('full hash', () => {
    expect(
      hashTypedData({
        primaryType: 'tx_container_v0',
        message: {
          __t: 'vsc-tx',
          __v: '0.2',
          headers: {
            intents: [] as any, // TODO should this be here
            nonce: 13n,
            required_auths: [
              'did:pkh:eip155:1:0x88EBB64C264AFf10141149F9770F8D644C9D86C5',
            ],
            type: 1n,
          },
          tx: {
            op: 'transfer',
            payload: {
              amount: 1n,
              from: 'did:pkh:eip155:1:0x88EBB64C264AFf10141149F9770F8D644C9D86C5',
              tk: 'HIVE',
              to: 'did:pkh:eip155:1:0x88EBB64C264AFf10141149F9770F8D644C9D86C5',
            },
          },
        },
        types: {
          tx_container_v0: [
            {
              name: 'tx',
              type: 'tx_container_v0.tx',
            },
            {
              name: '__t',
              type: 'string',
            },
            {
              name: '__v',
              type: 'string',
            },
            {
              name: 'headers',
              type: 'tx_container_v0.headers',
            },
          ],
          'tx_container_v0.headers': [
            {
              name: 'type',
              type: 'uint256',
            },
            {
              name: 'nonce',
              type: 'uint256',
            },
            {
              name: 'intents',
              type: 'undefined[]',
            },
            {
              name: 'required_auths',
              type: 'string[]',
            },
          ],
          'tx_container_v0.tx': [
            {
              name: 'op',
              type: 'string',
            },
            {
              name: 'payload',
              type: 'tx_container_v0.tx.payload',
            },
          ],
          'tx_container_v0.tx.payload': [
            {
              name: 'tk',
              type: 'string',
            },
            {
              name: 'to',
              type: 'string',
            },
            {
              name: 'from',
              type: 'string',
            },
            {
              name: 'amount',
              type: 'uint256',
            },
          ],
        },
      }),
    ).toBe('0x7193b00c9c20e5fb8721b5c8519a6ba17caae66ecfe24bf30bd22e6b1b112880')
  })
})
