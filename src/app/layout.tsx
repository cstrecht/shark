import Navbar from "@/components/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shark Pool",
  description: "A dummy place to swim.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${nunito.className} mx-64 min-h-screen relative bg-grey2`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
