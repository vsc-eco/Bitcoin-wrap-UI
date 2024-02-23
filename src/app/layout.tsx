"use client";
// app/layout.tsx
import { Providers } from "./providers";

import Navbar from "../components/Navbar";

//import the analytics
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
            <Navbar />
            {children}
            <Analytics />
          </Providers>
      </body>
    </html>
  );
}
