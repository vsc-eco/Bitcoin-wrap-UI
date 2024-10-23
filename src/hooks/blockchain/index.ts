'use client'
import { create } from 'zustand'
import { hive } from './hive'
import { Blockchain, TransferResult } from './types'
import {
  LOCAL_STORAGE_ACCESS_TOKEN_KEY,
  LOCAL_STORAGE_USER_ID_KEY,
  LOCAL_STORAGE_DID_ENTROPY_KEY,
  LOCAL_STORAGE_DID_PUBLIC_KEY_KEY,
} from './localStorageKeys'
import { eth } from './wagmi-web3modal'
import { cookieStorage, parseCookie } from 'wagmi'
import { cookies } from '../../app/providers'

type BlockchainState = {
  pendingTxs: TransferResult[]
}

function cookieToInitialState(cookie?: string | null) {
  if (!cookie) return undefined
  const key = LOCAL_STORAGE_USER_ID_KEY
  const parsed = parseCookie(cookie, key)
  if (!parsed) return undefined
  return parsed
}

function lazy<T extends Record<any, any>>(f: () => T): T {
  let value: T | undefined
  return new Proxy<T>(
    (() => {}) as any,
    new Proxy<ProxyHandler<T>>({} as any, {
      get(
        target,
        handlerType,
        receiver,
      ): ProxyHandler<T>[keyof ProxyHandler<T>] {
        return (target, ...args) => {
          if (!value) {
            value = f()
          }
          return Reflect[handlerType](value, ...args)
        }
      },
    }),
  )
}

const BlockchainStore = lazy(() =>
  create<BlockchainState>(() => {
    const userId =
      cookieToInitialState(cookies) ||
      cookieStorage.getItem(LOCAL_STORAGE_USER_ID_KEY)
    return {
      pendingTxs: [],
    }
  }),
)

export const useBlockchain = BlockchainStore

const blockchains = {
  hive,
  eth,
} satisfies Record<string, Blockchain>

export type BlockchainMethod = keyof typeof blockchains

type BlockchainOperation<
  BlockchainSet extends BlockchainMethod = BlockchainMethod,
> = {
  [Blockchain in BlockchainSet]: keyof (typeof blockchains)[Blockchain]
}[BlockchainSet]

type BlockchainOptions<
  Method extends BlockchainMethod,
  Operation extends BlockchainOperation<Method>,
> = (typeof blockchains)[Method][Operation] extends (...args: any[]) => any
  ? Parameters<(typeof blockchains)[Method][Operation]>
  : never

type BlockchainOperationResult<
  Method extends BlockchainMethod,
  Operation extends BlockchainOperation<Method>,
> = (typeof blockchains)[Method][Operation] extends (...args: any[]) => any
  ? ReturnType<(typeof blockchains)[Method][Operation]>
  : never

const resultHandler = async <
  Operation extends BlockchainOperation<Method>,
  Method extends BlockchainMethod,
>(
  operation: Operation,
  method: Method,
  result: BlockchainOperationResult<Method, Operation>,
): Promise<Awaited<BlockchainOperationResult<Method, Operation>>> => {
  const res = await result
  switch (operation) {
    case 'transfer':
      BlockchainStore.setState(state => ({
        ...state,
        pendingTxs: state.pendingTxs.concat(res),
      }))
  }
  return res
}

export const BlockchainActions = <
  Method extends BlockchainMethod,
  Operation extends BlockchainOperation<Method>,
>(
  method: Method,
  operation: Operation,
  ...args: BlockchainOptions<Method, Operation>
): Promise<Awaited<BlockchainOperationResult<Method, Operation>>> =>
  resultHandler(
    operation,
    method,
    // @ts-ignore :^)
    blockchains[method][operation](
      //@ts-ignore
      ...args,
    ) as BlockchainOperationResult<Method, Operation>,
  )
