import { Aioha, KeyTypes } from '@aioha/aioha'
import { DepositTransaction, HiveSigner } from '../client'
import { TransferOperation } from '@hiveio/dhive/lib/chain/operation'

export const aiohaSigner = {
  async json(auth, id, tx, aioha: Aioha) {
    alert(JSON.stringify(tx) + '|||||||||' + JSON.stringify(aioha))
    alert('aioha.customJSON:::::' + aioha.customJSON)
    const res = await aioha.customJSON(mapAuthToKeyType(auth), id, tx)
    if (!res.success) {
      throw new Error(res.error)
    }
    return {
      id: res.result,
    }
  },
  async transfer(tx, aioha) {
    const operation: TransferOperation = [
      'transfer',
      {
        from: tx.payload.from,
        to: tx.payload.to,
        amount: `${tx.payload.amount.toFixed(3)} ${tx.payload.tk}`,
        memo: tx.payload.memo || '',
      },
    ]

    const res = await aioha.signAndBroadcastTx([operation], KeyTypes.Active)
    if (!res.success) {
      throw new Error(res.error)
    }
    return { id: res.result }
  },
} satisfies HiveSigner<[Aioha]>

function mapAuthToKeyType(auth: 'active' | 'posting'): KeyTypes {
  switch (auth) {
    case 'active':
      return KeyTypes.Active
    case 'posting':
      return KeyTypes.Posting
  }
}
