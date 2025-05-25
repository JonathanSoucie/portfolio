import type { Metadata } from "next";
import "./globals.css";
import NavBar from "../components/NavBar";
/* eslint-disable @next/next/no-page-custom-font */

export const metadata: Metadata = {
  title: "Jonathan Soucie",
  description: "Portfolio site",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;1,300&family=Raleway:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#0d0d0d] text-white font-merriweather m-0">
        <NavBar />
        {children}
      </body>
    </html>
  );
}
