import type { Metadata } from "next";

const SITE_URL = "https://arnecke.vercel.app";
const title = "Arnecke";
const description = "Arnecke portfolio page.";
const ogImage = `${SITE_URL}/images/og-image.png`;

export const getMetadata = (pageTitle?: string): Metadata => {
  const fullTitle = pageTitle ? `${pageTitle} | Arnecke` : title;

  return {
    title: {
      default: fullTitle,
      template: "%s | Arnecke",
    },
    description,
    keywords: ["Arnecke", "Moda", "Portfolio", "Design", "Fashion"],
    authors: [{ name: "Isabela Müller" }],
    creator: "Jose Arnecke",
    publisher: "Jose Arnecke",

    metadataBase: new URL(SITE_URL),

    openGraph: {
      type: "website",
      locale: "pt_BR",
      url: SITE_URL,
      siteName: "Arnecke",
      title: fullTitle,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "Arnecke Preview",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
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
};
