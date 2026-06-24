"use client";

import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { denton, helvetica, systemia } from "./fonts";
import { usePathname } from "next/navigation";
import { PageTitleProvider } from "@/components/PageTitleProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isBlueTheme = pathname === "/" || pathname === "/contact";
  const isContact = pathname === "/contact-us";
  const isComingSoon = pathname === "/coming-soon";

  const theme = isBlueTheme ? "blue" : "white";

  const shouldShowHeader = !isComingSoon;
  const shouldShowFooter = !isContact && !isComingSoon;

  return (
    <html
      lang="pt"
      className={`${helvetica.variable} ${systemia.variable} ${denton.variable}`}
    >
      <body
        className={`${helvetica.className} ${
          isBlueTheme
            ? "bg-color-arnecke-blue text-color-arnecke-white"
            : "bg-color-arnecke-white text-color-arnecke-blue"
        } min-h-[calc(100vh-49px)] overflow-x-hidden antialiased`}
      >
        <PageTitleProvider>
          {shouldShowHeader && <Header theme={theme} />}
          <main
            id="page-content"
            className="transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.18,1)] will-change-transform"
          >
            {children}
          </main>
          {shouldShowFooter && <Footer theme={theme} />}
        </PageTitleProvider>
      </body>
    </html>
  );
}
