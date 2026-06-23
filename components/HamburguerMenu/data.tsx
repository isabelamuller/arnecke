import { IoLogoInstagram, IoIosMail } from "react-icons/io";

export const menuItems = [
  {
    id: "shop",
    translationKey: "shop",
    href: "https://arnecke.lojavirtualnuvem.com.br/",
  },
  {
    id: "circleNumbers",
    translationKey: "circleNumbers",
    href: "/circle-numbers",
  },
  {
    id: "contact",
    translationKey: "contact",
    href: "/contact",
  },
  {
    id: "nucleo",
    translationKey: "nucleo",
    href: "#",
  },
];

export const socialItems = [
  {
    href: "https://www.instagram.com/arnecke.circle/",
    icon: <IoLogoInstagram size={18} />,
    target: "_blank",
  },
  {
    href: "mailto:team@arneckework.com",
    icon: <IoIosMail size={18} />,
    target: "_self",
  },
];
