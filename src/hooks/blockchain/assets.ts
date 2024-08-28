export enum Chain {
  VSC = 'VSC',
  HIVE = 'HIVE',
}

export const Asset = {
  VSC_HIVE: {
    name: 'HIVE',
    chain: Chain.VSC,
  },
  VSC_HBD: {
    name: 'HBD',
    chain: Chain.VSC,
  },

  HIVE_HIVE: {
    name: 'HIVE',
    chain: Chain.HIVE,
  },
  HIVE_HBD: {
    name: 'HBD',
    chain: Chain.HIVE,
  },
} as const satisfies Record<string, AssetInfo>

type AssetInfo = {
  name: string
  chain: Chain
}

export type Asset = (typeof Asset)[keyof typeof Asset]

export type AssetName = keyof typeof Asset
