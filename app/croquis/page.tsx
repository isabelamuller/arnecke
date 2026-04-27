import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Croquis | Arnecke",
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
    title: "Croquis | Arnecke",
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

export default function Article() {
  return (
    <div className="px-5 mt-20 text-lg text-justify max-w-[1295px] mx-auto">
      <h1 className="uppercase md:text-[7vw] text-[14vw] font-bold leading-[1.3] tracking-wide">
        Croquis
      </h1>
      <p>
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
        ut aliquip ex ea commodo consequat. Duis aute irure dolor in
        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
        qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit
        amet, consectetur adipisc amet, consectetur adipisc amet, consectetur
        adipisc amet, consectetur adipisc amet, consectetur adipisc
      </p>
      <img
        src="/images/sketch-home.jpg"
        className="p-3 float-right w-[270px]"
        alt=""
      />
      <p>
        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
        ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
        dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
        nulla pariatur. Excepteur sint occaecat cupidatat non
      </p>
      <p>
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
        qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
        officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
        officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
        officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        proident, sunt in culpa qui officia deserunt mollit anim
      </p>
      <iframe
        data-testid="embed-iframe"
        src="https://open.spotify.com/embed/album/6dVIqQ8qmQ5GBnJ9shOYGE?utm_source=generator"
        width="100%"
        height="352"
        allowFullScreen
        style={{ marginTop: 10, marginBottom: 10 }}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="eager"
      ></iframe>
      <p>
        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
        ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
        dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
        nulla pariatur. Excepteur sint occaecat cupidatat non
      </p>
      <img
        src="/images/sketch-home.jpg"
        className="p-3 float-left w-[300px]"
        alt=""
      />
    </div>
  );
}
