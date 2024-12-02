import localFont from "next/font/local";
import "./globals.css";
import { auth } from "@/app/auth";
import Providers from "@/app/providers";
import Sidenav from "@/components/ui/sidenav";


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
    <html lang="en" className="h-full w-full bg-[#222831]">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex">
          {session && (
            <div className="fixed h-full">
              <Sidenav />
            </div>
          )}
          <div className="flex-1 ml-50 bg-[#222831]">
            <Providers>{children}</Providers>
          </div>
        </div>
      </body>
    </html>
  );
}