export const tokens = {
  HBD: {
    id: 1,
    tokenName: 'HBD',
    fullname: 'HBD',
    price: 50.0,
    image: '/hbd_green.svg',
  },
  HIVE: {
    id: 2,
    tokenName: 'HIVE',
    fullname: 'HIVE',
    price: 50000.0,
    image: '/hive.svg',
  },
  WBTC: {
    id: 3,
    tokenName: 'WBTC',
    fullname: 'Wrapped Bitcoin',
    price: 3000.0,
    image: '/bitcoin.svg',
    balanceAddr: '0xAb5801a7D398351b',
  },
} as const

export type TokenName = keyof typeof tokens

export type Token = (typeof tokens)[TokenName]
