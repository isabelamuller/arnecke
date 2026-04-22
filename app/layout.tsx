import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { denton, helvetica, systemia } from "./fonts";

export const metadata: Metadata = {
  title: "Arnecke",
  description: "Arnecke portfolio page",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${helvetica.variable} ${systemia.variable} ${denton.variable}`}
    >
      <body
        className={`${helvetica.className} bg-color-arnecke-blue text-color-arnecke-white min-h-screen antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
