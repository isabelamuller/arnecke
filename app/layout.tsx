"use client";

import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { denton, helvetica, systemia } from "./fonts";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isBlueTheme = pathname === "/" || pathname === "/contact";
  const isContact = pathname === "/contact-us";

  const theme = isBlueTheme ? "blue" : "white";

  return (
    <html
      lang="pt-BR"
      className={`${helvetica.variable} ${systemia.variable} ${denton.variable}`}
    >
      <body
        className={`${helvetica.className} ${
          isBlueTheme
            ? "bg-color-arnecke-blue text-color-arnecke-white"
            : "bg-color-arnecke-white text-color-arnecke-blue"
        } 
        ${isBlueTheme ? "text-color-arnecke-white" : "text-color-arnecke-blue"} 
        min-h-[calc(100vh-49px)] antialiased overflow-x-hidden`}
      >
        <Header theme={theme} />
        <main
          id="page-content"
          className="transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.18,1)] will-change-transform"
        >
          {children}
        </main>
        {!isContact && <Footer theme={theme} />}
      </body>
    </html>
  );
}
