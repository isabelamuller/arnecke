"use client";

import Image from "next/image";
import { IoLogoInstagram, IoLogoWhatsapp } from "react-icons/io";

export const ContactView = () => {
  return (
    <div className="relative px-5 h-screen font-helvetica">
      <h1 className="absolute mt-[-70px] inset-0 flex items-center justify-center text-center uppercase text-[24px] font-bold tracking-wide px-5">
        "Água mole em pedra dura, tanto bate até que fura"
      </h1>
      <div className="absolute bottom-5 left-0 w-full flex flex-col items-center gap-3">
        <div className="flex gap-3">
          <a
            href="https://www.instagram.com/_arnecke/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <IoLogoInstagram size={24} color="white" />
          </a>
          <a
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <IoLogoWhatsapp size={24} color="white" />
          </a>
          <span>email@email.com</span>
        </div>
        <Image
          src="/images/logo-contact.png"
          alt="Arnecke Logo"
          width={200}
          height={100}
        />
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Arnecke. Todos os direitos
          reservados.
        </p>
      </div>
    </div>
  );
};
