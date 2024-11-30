import localFont from "next/font/local";
import "./globals.css";
import Sidenav from "@/components/sidenav";
import Providers from "./providers";
import { auth } from "@/app/auth";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" className="h-screen w-screen">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex">
          {session && (
            <div className="fixed h-screen">
              <Sidenav />
            </div>
          )}
          <div className="flex-1 w-[calc(100vw-240px)]">
            <Providers>{children}</Providers>
          </div>
        </div>
      </body>
    </html>
  );
}
