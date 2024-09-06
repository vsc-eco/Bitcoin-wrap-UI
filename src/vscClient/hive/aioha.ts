import { Aioha, KeyTypes } from '@aioha/aioha'
import { HiveSigner } from '../client'

export const aiohaSigner = {
  async json(auth, id, tx, aioha) {
    const res = await aioha.customJSON(mapAuthToKeyType(auth), id, tx)
    if (!res.success) {
      throw new Error(res.error)
    }
    return {
      id: res.result,
    }
  },
  async transfer(tx, aioha) {
    const res = await aioha.signAndBroadcastTx
  },
} // satisfies HiveSigner<[Aioha]>

function mapAuthToKeyType(auth: 'active' | 'posting'): KeyTypes {
  switch (auth) {
    case 'active':
      return KeyTypes.Active
    case 'posting':
      return KeyTypes.Posting
  }
}
