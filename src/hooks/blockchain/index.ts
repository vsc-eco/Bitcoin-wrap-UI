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
        console.log('getting handler', handlerType)
        return (target, ...args) => {
          console.log('using handler', handlerType)
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

type FunctionKey<
  Container extends Record<any, any>,
  Key extends keyof Container,
> = Container[Key] extends (...args: any[]) => any ? Key : never

type BlockchainOperation = FunctionKey<
  (typeof blockchains)[keyof typeof blockchains],
  keyof (typeof blockchains)[keyof typeof blockchains]
>

type BlockchainOptions<
  Method extends BlockchainMethod,
  Operation extends BlockchainOperation,
> = Parameters<(typeof blockchains)[Method][Operation]>

type BlockchainOperationResult<
  Method extends BlockchainMethod,
  Operation extends BlockchainOperation,
> = ReturnType<(typeof blockchains)[Method][Operation]>

const resultHandler = async <
  Operation extends BlockchainOperation,
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
  Operation extends BlockchainOperation,
  Method extends BlockchainMethod,
>(
  operation: Operation,
  method: Method,
  ...args: BlockchainOptions<Method, Operation>
): Promise<Awaited<BlockchainOperationResult<Method, Operation>>> =>
  resultHandler(
    operation,
    method,
    blockchains[method][operation](
      //@ts-ignore
      ...args,
    ) as BlockchainOperationResult<Method, Operation>,
  )
