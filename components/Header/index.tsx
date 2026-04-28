import Image from "next/image";
import Link from "next/link";
import { HamburguerMenu } from "../HamburguerMenu";
import { BsArrowUpRight } from "react-icons/bs";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-color-arnecke-blue font-systemia text-white">
      <div className="relative flex items-center justify-between px-4 py-3">
        <div className="z-10 flex items-center">
          <HamburguerMenu />
        </div>
        <Link
          href="/"
          aria-label="Go to homepage"
          className="absolute left-1/2 -translate-x-1/2 transition duration-300 hover:opacity-75"
        >
          <Image
            src="/images/logo-branco.png"
            alt="Arnecke logo"
            width={86}
            height={40}
            priority
            className="object-contain"
          />
        </Link>
        <Link
          href="https://arnecke.lojavirtualnuvem.com.br/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:block text-[12px] uppercase tracking-[0.22em] flex items-centertransition-opacity hover:opacity-60"
        >
          SHOP
          <BsArrowUpRight size={10} className="inline-block ml-1" />
        </Link>
      </div>
    </header>
  );
};
