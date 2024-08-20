import { Aioha, initAioha, KeyTypes, Providers } from "@aioha/aioha";
import { Authenticator, AuthInfo } from "./types";

const aioha =
  typeof window === "undefined"
    ? new Aioha()
    : initAioha({
        hiveauth: {
          name: "3Speak",
          // description: "Aioha test app",
        },
        hivesigner: {
          app: "3speak.tv",
          callbackURL: window.location.origin + "/hivesigner.html", // TODO set properly
          scope: ["login", "vote"],
        },
      });

export const HIVE_PREFIX = "hive:";

export const hive = {
  login(provider: Providers, username: string) {
    return aioha
      .login(provider, username, {
        keyType: KeyTypes.Active,
        msg: `Allow VSC Defi to initiate transactions for you`,
        hiveauth: {
          cbWait(payload, evt, cancel) {
            console.log("hiveauth event", evt);
            console.log("hiveauth payload", payload);
          },
        },
      })
      .then((res) => {
        if (res.success) {
          return {
            userId: `${HIVE_PREFIX}${username}`,
          } satisfies AuthInfo;
        }
        throw new Error(res.error);
      });
  },
  logout() {
    return aioha.logout();
  },
} satisfies Authenticator;
