import { web3Modal } from "../../../app/providers";
import { Authenticator } from "../types";
import { disconnect, getAccount } from "@wagmi/core";
import { multiConfig } from "./config";

export const ADDRESS_NOT_AVAILABLE_ERROR = new Error("address not available");

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const ETH_PREFIX = "did:pkh:eip155:1:";

export const eth = {
  async login() {
    console.log("eth connecting");
    await this.logout();
    let done = false;
    let socialLogin = false;
    return new Promise((resolve, reject) => {
      const unsubscribe = web3Modal.subscribeEvents((events) => {
        if (done) {
          return;
        }
        console.log("events log", events.data);
        if (events.data.event === "SOCIAL_LOGIN_STARTED") {
          socialLogin = true;
          return;
        }
        if (!socialLogin && events.data.event === "MODAL_CLOSE") {
          done = true;
          unsubscribe();
          reject(new Error("Web3Modal has closed"));
          return;
        }
        if (events.data.event === "CONNECT_ERROR") {
          throw new Error(events.data.properties.message);
        }
        if (events.data.event === "SOCIAL_LOGIN_ERROR") {
          throw new Error(
            `Failed to login with ${events.data.properties.provider}`
          );
        }
        if (
          events.data.event !== "CONNECT_SUCCESS" &&
          events.data.event !== "SOCIAL_LOGIN_SUCCESS"
        ) {
          return;
        }
        const { address } = getAccount(multiConfig);
        if (!address) {
          done = true;
          unsubscribe();
          reject(new Error("FIXME"));
        }
        done = true;
        unsubscribe();
        resolve({
          userId: `${ETH_PREFIX}${address}`,
        });
      });
      web3Modal.open({ view: "Connect" });
    });
  },
  logout() {
    return disconnect(multiConfig);
  },
} satisfies Authenticator;
