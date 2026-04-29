import type { Metadata } from "next";

export const getMetadata = (pageTitle?: string): Metadata => ({
  title: {
    default: pageTitle ? `${pageTitle} | Arnecke` : "Arnecke",
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
    title: pageTitle ? `${pageTitle} | Arnecke` : "Arnecke",
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
    title: pageTitle ? `${pageTitle} | Arnecke` : "Arnecke",
    description: "Arnecke portfolio page.",
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
});
