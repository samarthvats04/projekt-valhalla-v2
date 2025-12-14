"use client";

import { usePathname } from "next/navigation";
import Header from "../components/Header";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
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
      <head>
        <style jsx global>{`
          /* Custom Scrollbar */
          ::-webkit-scrollbar {
            width: 10px;
          }
          
          ::-webkit-scrollbar-track {
            background: transparent;
          }

          ::-webkit-scrollbar-track-piece {
            background: transparent;
          }

          ::-webkit-scrollbar-thumb {
            background: #3f3f46;
            border-radius: 5px;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: #71717a;
          }
          ::-webkit-scrollbar-button {
            background: transparent;
            width: 0;
            height: 0;
          }
          /* Firefox */
          * {
            scrollbar-width: thin;
            scrollbar-color: #3f3f46 #0a0a0a;
          }
        `}</style>
      </head>
      <body className="bg-black">
        {!hideHeader && <Header />}
        {children}
        <Analytics />
      </body>
    </html>
    
  );
}
