"use client";

import { usePathname } from "next/navigation";
import Header from "../components/Header";
import "./globals.css";

import { Metamorphous } from "next/font/google";

const metamorphous = Metamorphous({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-morph",
});

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Hide header only on Gate page
  const hideHeader = pathname === "/";

  return (
    <html
      lang="en"
      className={metamorphous.variable}
      suppressHydrationWarning={true}
    >
      <body className="bg-black">
        {!hideHeader && <Header />}
        {children}
      </body>
    </html>
  );
}
