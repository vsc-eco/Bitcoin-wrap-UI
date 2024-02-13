import { useLayoutEffect, useState } from "react";
import { DHive } from "../const";

export function ResolveUsername(name) {
  const [did, setDid] = useState<string | null>(null);
  useLayoutEffect(() => {
    (async () => {
      if (typeof name === 'string' && name.startsWith('did:')) {
        setDid(name);
      } else {
        const accountInfo = (await DHive.database.getAccounts([name]))[0];
        const json_metadata = JSON.parse(accountInfo.posting_json_metadata);
        console.log(json_metadata);
        console.log(json_metadata);
        console.log(accountInfo);
        setDid(json_metadata.did || null);
      }
    })();
  }, [name]);

  return did;
}