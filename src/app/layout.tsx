import localFont from "next/font/local";
import "./globals.css";
import Providers from "@/app/providers";
import Sidenav from "@/components/ui/sidenav";
import clsx from "clsx";
import { createClient } from "../../utils/supabase/server";

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
  const supabase = await createClient();
  const {  data: { user }, error,} = await supabase.auth.getUser();

  return (
    <html lang="en" className="h-full w-full bg-[#222831]">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex">
          <div className="bg-[#222831] w-full h-full">
            <Providers>{children}</Providers>
          </div>
        </div>
      </body>
    </html>
  );
}