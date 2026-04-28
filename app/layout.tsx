"use client";

import type { Metadata } from "next";
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
  const isContact = pathname === "/contact";
  return (
    <html
      lang="pt-BR"
      className={`${helvetica.variable} ${systemia.variable} ${denton.variable}`}
    >
      <body
        className={`${helvetica.className} bg-color-arnecke-blue text-color-arnecke-white min-h-[calc(100vh-49px)] antialiased`}
      >
        <Header />
        {children}
        {!isContact && <Footer />}
      </body>
    </html>
  );
}
