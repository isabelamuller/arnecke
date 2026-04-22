import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { denton, helvetica, systemia } from "./fonts";

export const metadata: Metadata = {
  title: {
    default: "Arnecke",
    template: "%s | Arnecke",
  },
  description: "Arnecke portfolio page.",
  keywords: ["Arnecke", "Moda", "Portfolio", "Design", "Fashion"],
  authors: [{ name: "Isabela Müller" }],
  creator: "Jose Arnecke",
  publisher: "Jose Arnecke",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://www.arnecke.vercel.app",
    siteName: "Arnecke",
    title: "Arnecke",
    description: "Arnecke portfolio page.",
    images: [
      {
        url: "/images/logo-sozinho.png",
        width: 1200,
        height: 630,
        alt: "Arnecke Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arnecke",
    description: "Arnecke portfolio page",
    images: ["/images/logo-sozinho.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
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
