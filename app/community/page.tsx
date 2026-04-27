import { Metadata } from "next";
import { CommunityView } from "@/views/Community";

export const metadata: Metadata = {
  title: {
    default: "Community | Arnecke",
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
    title: "Community | Arnecke",
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
    title: "Community | Arnecke",
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

export default function CommunityPage() {
  return <CommunityView />;
}
