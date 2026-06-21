import { FaShoppingBag } from "react-icons/fa";
import { IoLogoInstagram, IoIosMail } from "react-icons/io";

export const menuItems = [
  {
    label: "Shop",
    href: "https://arnecke.lojavirtualnuvem.com.br/",
    icon: <FaShoppingBag size={18} className="opacity-60" />,
  },
  {
    label: "Circle Numbers",
    href: "/circle-numbers",
  },
  {
    label: "Contato",
    href: "/contact",
  },
  {
    label: "Núcleo",
    italic: true,
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
