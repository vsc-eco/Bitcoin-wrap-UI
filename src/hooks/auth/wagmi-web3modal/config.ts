import { defaultWagmiConfig } from "@web3modal/wagmi";
import { cookieStorage, createStorage } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";

export const projectId = process.env["NEXT_PUBLIC_PROJECT_ID"];

if (!projectId) {
  throw new Error("Project ID is not defined");
}

export const multiConfig = defaultWagmiConfig({
  projectId,
  chains: [mainnet, sepolia],
  metadata: {
    name: "My App",
    description: "My app description",
    url: "https://myapp.com",
    icons: ["https://myapp.com/favicon.ico"],
  },
  enableWalletConnect: true,
  enableEIP6963: true,
  enableCoinbase: true,
  enableInjected: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  auth: {
    socials: [
      "google",
      "x",
      "discord",
      "farcaster",
      "github",
      "apple",
      "facebook",
    ],
  },
});
