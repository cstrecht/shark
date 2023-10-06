import "../globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shark Pool",
  description: "A dummy place to swim.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${nunito.className} relative mx-64 min-h-screen bg-grey2`}
      >
        {children}
      </body>
    </html>
  );
}
