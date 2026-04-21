import localFont from "next/font/local";

export const helvetica = localFont({
  src: [
    {
      path: "../public/fonts/Helvetica/Helvetica-Bold.woff",
      weight: "700",
    },
    {
      path: "../public/fonts/Helvetica/helvetica-light.woff",
      weight: "300",
    },
  ],
  variable: "--font-helvetica",
});

export const systemia = localFont({
  src: [
    {
      path: "../public/fonts/Systemia/Systemia-Extrabold.otf",
      weight: "800",
    },
  ],
  variable: "--font-systemia",
});

export const denton = localFont({
  src: [
    {
      path: "../public/fonts/Denton/Denton-bold.otf",
      weight: "700",
    },
  ],
  variable: "--font-denton",
});
