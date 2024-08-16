// app/layout.tsx
import { headers } from "next/headers";
import { cookieToInitialState } from "wagmi";
import { multiConfig } from "../hooks/auth/wagmi-web3modal/config";
import { arcadiaFont } from "./fonts";
import { Providers } from "./providers";

//import the analytics
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookies = headers().get("cookie");

  const initialState = cookieToInitialState(
    multiConfig,
    headers().get("cookie")
  );

  return (
    <html lang="en" className={arcadiaFont.variable}>
      <body>
        <Providers initialState={initialState} cookies={cookies}>
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
