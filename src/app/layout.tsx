"use client";
// app/layout.tsx
import { Providers } from "./providers";
import Navbar from "../components/Navbar";

//import the analytics
import { Analytics } from "@vercel/analytics/react";
import { connectDB } from "./api/Database";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  connectDB();
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
