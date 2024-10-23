'use client'
import { create } from 'zustand'
import { hive } from './hive'
import { Authenticator, AuthInfo } from './types'
import {
  LOCAL_STORAGE_ACCESS_TOKEN_KEY,
  LOCAL_STORAGE_USER_ID_KEY,
  LOCAL_STORAGE_DID_ENTROPY_KEY,
  LOCAL_STORAGE_DID_PUBLIC_KEY_KEY,
} from './localStorageKeys'
import { eth } from './wagmi-web3modal'
import { cookieStorage, parseCookie } from 'wagmi'
import { cookies } from '../../app/providers'

export type AuthState = {
  authenticated: boolean
} & (
  | {
      authenticated: true
      userId: string
    }
  | {
      authenticated: false
    }
)

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

const AuthStore = lazy(() =>
  create<AuthState>(() => {
    const userId =
      cookieToInitialState(cookies) ||
      cookieStorage.getItem(LOCAL_STORAGE_USER_ID_KEY)
    if (userId) {
      return {
        authenticated: true,
        userId,
      }
    }
    return {
      authenticated: false,
    }
  }),
)

export const useAuth = AuthStore

const authenticators = {
  hive,
  eth,
} satisfies Record<string, Authenticator>

export type AuthMethod = keyof typeof authenticators

type AuthOptions<Method extends AuthMethod> = Parameters<
  (typeof authenticators)[Method]['login']
>

const requestLogin = async ({ userId }: AuthInfo) => {
  cookieStorage.setItem(LOCAL_STORAGE_USER_ID_KEY, userId)
  AuthStore.setState(
    {
      authenticated: true,
      userId,
    },
    true,
  )
}

export const AuthActions = {
  login<Method extends AuthMethod>(
    method: Method,
    ...args: AuthOptions<Method>
  ) {
    return (
      authenticators[method]
        // @ts-ignore TS is dumb
        .login(...args)
        .then(requestLogin)
    )
  },
  logout() {
    cookieStorage.removeItem(LOCAL_STORAGE_USER_ID_KEY)
    for (const authenticator of Object.values(authenticators)) {
      authenticator.logout()
    }
    AuthStore.setState({ authenticated: false }, true)
  },
  fakeLogin(userId: string) {
    return requestLogin({ userId })
  },
} as const

if (typeof window !== 'undefined') {
  ;(globalThis as any).AuthActions = AuthActions
}
