import type { Metadata } from "next";
import {  Montserrat, Poppins} from "next/font/google";
import "./globals.css";
import { Providers } from "./provider";
const montserrat = Montserrat({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
})
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
})
export const metadata: Metadata = {
  title: "Hotel Dashboard",
  description: "Admin dashboard for a hotel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body
        className={`${montserrat.className} ${poppins.className} antialiased`}
      >
        <Providers>
          <main className="flex w-screen h-screen">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
