import React, { useCallback, useContext, useLayoutEffect } from "react";
import { hash } from "@stablelib/sha256";
import { Ed25519Provider } from "key-did-provider-ed25519";
import KeyResolver from "key-did-resolver";
import { DID } from "dids";
import { DHive } from "../const";
import { createGlobalState } from "react-hooks-global-state";
import { RouteComponentContext } from "./routeContext";

declare global {
  interface Window {
    hive_keychain: {
      requestSignBuffer(
        hiveName: any,
        message: string,
        type: string,
        callback: (e: any) => void,
        url: string,
        label: string
      ): void;
      requestBroadcast(
        username: string,
        data: any[],
        type: string,
        callback: (e: any) => void
      ): void;
      AccountContext: React.ContextType<typeof AccountContext>;
    };
  }
}

interface AuthInfo {
  authId: string;
  authSecret: Uint8Array;
}

function normalizeAuthSecret(authSecret64: Uint8Array): Uint8Array {
  const authSecret = new Uint8Array(32);
  for (let i = 0; i < authSecret.length; i++) {
    authSecret[i] = authSecret64[i];
  }
  return authSecret;
}

//login authentication
export class AccountContextClass {
  // Setting DID and hiveName to the null initially
  private did: DID | null = null;
  private hiveName: string | null = null;

  //function for storing the authInfo
  storeAuth(authInfo: AuthInfo) {
    localStorage!.setItem("login.auth", JSON.stringify(authInfo));
  }

  //function for retrieving the authInfo
  getAuth(): AuthInfo | null {
    const authInfo = localStorage!.getItem("login.auth");
    return authInfo ? JSON.parse(authInfo) : null;
  }

  async checkLogin() {
    const auth = this.getAuth();

    if (!auth) {
      console.log("LOGIN FAILED!");
      return;
    }
    auth.authSecret = new Uint8Array(Object.values(auth.authSecret));

    const didInfo = await this.createIdentity(auth);

    this.hiveName = auth.authId;

    return didInfo;
  }

  async createIdentity({ authId, authSecret }: AuthInfo) {
    const provider = new Ed25519Provider(authSecret);
    const did = new DID({ provider, resolver: KeyResolver.getResolver() });
    await did.authenticate();
    this.did = did;
    return did;
  }

  async loginWithHive(hiveName: string) {
    const loginResult: any = await new Promise((resolve, reject) => {
      if (window.hive_keychain == undefined) {
        return;
      }
      window.hive_keychain.requestSignBuffer(
        null,
        "Allow this account to control your identity",
        "Posting",
        (e: any) => {
          if (e.success) {
            resolve(e);
          } else {
            return reject(e);
          }
          console.log(window);
        },
        "https://hive-api.3speak.tv",
        "Login to Hive Finance"
      );
    });

    const { username } = loginResult.data;

    localStorage.setItem;

    const authId = `hive:${username}`;
    const authSecret = normalizeAuthSecret(
      hash(Buffer.from(loginResult.result))
    );
    const did = await this.createIdentity({ authId, authSecret });
    this.storeAuth({ authId, authSecret });
    this.hiveName = authId;

    const accountInfo = (await DHive.database.getAccounts([username]))[0];
    let json_metadata = JSON.parse(accountInfo.posting_json_metadata);
    if (json_metadata?.did !== did.id) {
      json_metadata.did = did.id;
      if (window.hive_keychain == undefined) {
        return;
      }
      window.hive_keychain.requestBroadcast(
        username,
        [
          [
            "account_update2",
            {
              account: username,
              json_metadata: "",
              posting_json_metadata: JSON.stringify(json_metadata),
            },
          ],
        ],
        "Posting",
        (e: any) => console.log(e)
      );
    }
  }

  async runLoginComplete() {
    // Implement your logic here
  }

  //public method to get hiveName
  getHiveName(): any {
    return this.hiveName;
  }

  //public function to get did
  getDid(): any {
    return this.did;
  }
}

export const AccountContext = React.createContext(new AccountContextClass()); //this is the export variables

const initialState = { count: 0, did: null, didRaw: null, hiveName: null };
const { useGlobalState } = createGlobalState(initialState);

export const useAccountContext = function () {
  const ac = useContext(AccountContext);
  //importing the routing context
  const { state, dispatch } = useContext(RouteComponentContext)!;
  const [myDid, setMyDid] = useGlobalState("did");
  const [myAuth, setMyAuth] = useGlobalState("didRaw");
  const [myHiveName, setMyHiveName] = useGlobalState("hiveName");

  const triggerLoginWithHive = useCallback(async () => {
    // console.log("Triggering login with Hive...");
    console.log("Hive name:", ac.getHiveName());

    try {
      await ac.loginWithHive(ac.getHiveName() || ""); // Pass the hiveName here
      console.log("Login with Hive successful");

      if (ac.getDid()) {
        console.log("Setting DID:", ac.getDid());
        console.log("DID set successfully");
      }

      setMyDid(ac.getDid().id);
      setMyAuth(ac.getDid());
      setMyHiveName(ac.getHiveName().split(":")[1]);

      console.log("Setting myDid:", ac.getDid());
      dispatch({ type:"SET_RENDER", payload: "trade"})
      
    } catch (error) {
      console.error("Error during login:", error);
    }
  }, [ac, setMyDid]);

  useLayoutEffect(() => {
    ac.checkLogin().then((e) => {
      if (e) {
        console.log("did check login", e);
        setMyDid((e as any).id);
        setMyAuth(e as any);
        console.log("(e as any).getHiveName()", ac.getHiveName());
        setMyHiveName(ac.getHiveName().split(":")[1]);
      }
    });
  }, []);

  return {
    loggedIn: !!myDid,
    myDid,
    myAuth,
    myHiveName,
    triggerLoginWithHive,
  };

  // window.AccountContext = AccountContext; Not recommended, consider alternatives in a React application
};
