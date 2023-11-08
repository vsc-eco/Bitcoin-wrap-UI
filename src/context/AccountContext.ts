// TODO To debug this code in typescript 
import React, { useCallback, useEffect, useState, useContext } from 'react';
import { hash } from '@stablelib/sha256';
import { Ed25519Provider } from 'key-did-provider-ed25519';
import KeyResolver from 'key-did-resolver';
import { DID } from 'dids';
import { DHive } from '../const';
import { createGlobalState } from 'react-hooks-global-state';



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

class AccountContextClass {
  private did: DID | null = null;
  private hiveName: string | null = null;

  storeAuth(authInfo: AuthInfo) {
    localStorage.setItem('login.auth', JSON.stringify(authInfo));
  }

  getAuth(): AuthInfo | null {
    const authInfo = localStorage.getItem('login.auth');
    return authInfo ? JSON.parse(authInfo) : null;
  }

  async checkLogin() {
    const auth = this.getAuth();

    if (!auth) {
      console.log('LOGIN FAILED!');
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
    const loginResult = await new Promise((resolve, reject) => {
      window.hive_keychain.requestSignBuffer(
        hiveName,
        'Allow this account to control your identity',  
        'Posting',
        (e: any) => {
          if (e.success) {
            resolve(e);
          } else {
            return reject(e);
          }
        },
        'https://hive-api.3speak.tv',
        'Login to SPK network'
      );
    });

    const { username } = loginResult.data;

    const authId = `hive:${username}`;
    const authSecret = normalizeAuthSecret(
      hash(Buffer.from(loginResult.result))
    );
    const did = await this.createIdentity({ authId, authSecret });
    this.storeAuth({ authId, authSecret });
    this.hiveName = authId;

    const accountInfo = (await DHive.database.getAccounts([username]))[0];
    let json_metadata = JSON.parse(accountInfo.posting_json_metadata);
    if (!json_metadata?.did) {
      json_metadata.did = did.id;
      window.hive_keychain.requestBroadcast(
        username,
        [['account_update2', {
          account: username,
          json_metadata: '',
          posting_json_metadata: JSON.stringify(json_metadata),
        }]],
        'Posting',
        (e: any) => console.log(e)
      );
    }
  }

  async runLoginComplete() {
    // Implement your logic here
  }
}

export const AccountContext = React.createContext(new AccountContextClass());

const initialState = { count: 0, did: null, ceramic: null };
const { useGlobalState } = createGlobalState(initialState);

// export const useAccountContext = function () {
//   const ac = useContext(AccountContext);
//   const [myDid, setMyDid] = useGlobalState('did');
//   const { Ceramic } = useCeramic();

//   const triggerLoginWithHive = useCallback(async () => {
//     await ac.loginWithHive(ac.hiveName || ''); // Pass the hiveName here
//     if (ac.did) {
//       await Ceramic.setDID(ac.did);
//     }
//     setMyDid(ac.did);
//   }, [ac, setMyDid, Ceramic]);

//   return {
//     loggedIn: !!myDid,
//     myDid,
//     triggerLoginWithHive,
//   };
// };

// window.AccountContext = AccountContext; // Not recommended, consider alternatives in a React application
