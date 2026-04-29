"use client";

import Image from "next/image";
import { IoLogoInstagram, IoLogoWhatsapp } from "react-icons/io";

export const ContactView = () => {
  return (
    <div className="min-h-screen px-5 pt-20 pb-6 font-helvetica text-color-arnecke-white flex flex-col">
      <div className="flex flex-1 items-center justify-center">
        <h1 className="max-w-[720px] text-center uppercase text-[26px] md:text-[44px] font-bold tracking-[-0.04em] leading-[1.1]">
          “Água mole em pedra dura, tanto bate até que fura”
        </h1>
      </div>

      <section className="flex flex-col items-center gap-3 text-center">
        <div className="flex items-center justify-center gap-3 text-[12px] uppercase tracking-[0.18em]">
          <a
            href="https://www.instagram.com/_arnecke/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-60 transition-opacity"
            aria-label="Instagram"
          >
            <IoLogoInstagram size={22} />
          </a>
          <span className="text-white/30">|</span>
          <a
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-60 transition-opacity"
            aria-label="WhatsApp"
          >
            <IoLogoWhatsapp size={22} />
          </a>
          <span className="text-white/30">|</span>
          <a
            href="mailto:email@email.com"
            className="hover:opacity-60 transition-opacity lowercase tracking-normal text-[13px]"
          >
            email@email.com
          </a>
        </div>
        <Image
          src="/images/logo-contact.png"
          alt="Arnecke Logo"
          width={220}
          height={85}
          className="object-contain"
        />
        <p className="text-[11px] text-white/45">
          © {new Date().getFullYear()} Arnecke. Todos os direitos reservados.
        </p>
        <p className="text-[10px] text-white/35">
          Website made by{" "}
          <a
            href="https://www.linkedin.com/in/isabela-m%C3%BCllerrr/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 hover:text-white transition-colors"
          >
            Isa.
          </a>
        </p>
      </section>
    </div>
  );
};
