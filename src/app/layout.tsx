// app/layout.tsx
import localFont from "next/font/local";
import { Providers } from "./providers";

//import the analytics
import { Analytics } from "@vercel/analytics/react";


const myFont = localFont({
    src: './ArcadiaText-Variable.woff2',
    display: 'swap',
  })
  
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" className={myFont.className}>
      <body>
        <Providers>
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
