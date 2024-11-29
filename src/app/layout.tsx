"use client";

import localFont from "next/font/local";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Sidenav from "@/components/sidenav";
import { SessionProvider } from "next-auth/react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  return (
    <html lang="en" className="h-screen w-screen">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <div className="flex">
            <div className="fixed h-screen">
              <Sidenav />
            </div>
            <div className="flex-1 ml-60">
              {" "}
              <QueryClientProvider client={queryClient}>
                {children}
              </QueryClientProvider>
            </div>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
