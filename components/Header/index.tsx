import Image from "next/image";
import { HamburguerMenu } from "../HamburguerMenu";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="bg-color-arnecke-blue font-systemia w-full flex items-center justify-between fixed top-0 left-0 z-50 px-4 py-3">
      <HamburguerMenu />
      <Link href="/" className="absolute left-1/2 -translate-x-1/2">
        <Image
          src="/images/logo-branco.png"
          alt="Arnecke logo"
          width={80}
          height={40}
          className="object-contain"
        />
      </Link>
      <Link
        className="hover:opacity-90 transition-opacity md:block hidden"
        href="https://arnecke.lojavirtualnuvem.com.br/"
      >
        SHOP
      </Link>
    </header>
  );
};
