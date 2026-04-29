import { FaShoppingBag } from "react-icons/fa";
import { IoLogoInstagram, IoLogoWhatsapp } from "react-icons/io";

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
    label: "Archive",
    italic: true,
  },
];

export const socialItems = [
  {
    href: "https://instagram.com",
    icon: <IoLogoInstagram size={18} />,
  },
  {
    href: "https://wa.me/5511999999999",
    icon: <IoLogoWhatsapp size={18} />,
  },
];
