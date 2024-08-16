import {
  MagicLinkPopupActions,
  useMagicLinkPopup,
} from "magic-link-popup-react";
import { create } from "zustand";
import { hive } from "./hive";
import { Authenticator, AuthInfo } from "./types";
import {
  LOCAL_STORAGE_ACCESS_TOKEN_KEY,
  LOCAL_STORAGE_USER_ID_KEY,
  LOCAL_STORAGE_DID_ENTROPY_KEY,
  LOCAL_STORAGE_DID_PUBLIC_KEY_KEY,
} from "./localStorageKeys";
import { eth } from "./wagmi-web3modal";

type AuthState = {
  authenticated: boolean;
} & (
  | {
      authenticated: true;
      userId: string;
    }
  | {
      authenticated: false;
    }
);

const AuthStore = create<AuthState>(() => {
  if (typeof window === "undefined") {
    // TODO SSR support
    return {
      authenticated: false,
    };
  } else {
    const userId = window.localStorage.getItem(LOCAL_STORAGE_USER_ID_KEY);
    if (userId) {
      return {
        authenticated: true,
        userId,
      };
    }
    return {
      authenticated: false,
    };
  }
});

export const useAuth = AuthStore;

const authenticators = {
  hive,
  eth,
} satisfies Record<string, Authenticator>;

export type AuthMethod = keyof typeof authenticators;

type AuthOptions<Method extends AuthMethod> = Parameters<
  (typeof authenticators)[Method]["login"]
>;

const requestLogin = async ({ userId }: AuthInfo) => {
  window.localStorage.setItem(LOCAL_STORAGE_USER_ID_KEY, userId);
  AuthStore.setState(
    {
      authenticated: true,
      userId,
    },
    true
  );
};

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
    );
  },
  logout() {
    window.localStorage.removeItem(LOCAL_STORAGE_USER_ID_KEY);
    for (const authenticator of Object.values(authenticators)) {
      authenticator.logout();
    }
    AuthStore.setState({ authenticated: false }, true);
  },
} as const;
