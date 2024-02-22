"use client";
// app/layout.tsx
import { Providers } from "./providers";
import { RouteComponentProvider } from "../context/routeContext";
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
          <RouteComponentProvider>
            <Navbar />
            {children}
            <Analytics />
          </RouteComponentProvider>
        </Providers>
      </body>
    </html>
  );
}
