// app/layout.tsx
import { arcadiaFont } from "./fonts";
import { Providers } from "./providers";

//import the analytics
import { Analytics } from "@vercel/analytics/react";

  
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" className={arcadiaFont.variable}>
      <body>
        <Providers>
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
