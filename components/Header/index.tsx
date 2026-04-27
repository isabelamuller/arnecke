import Image from "next/image";
import { HamburguerMenu } from "../HamburguerMenu";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="bg-color-arnecke-blue font-systemia w-full h-16 flex items-center fixed top-0 left-0 z-50 px-4">
      <div className="absolute left-5 w-[50px] flex items-center h-full">
        <HamburguerMenu />
      </div>
      <div className="absolute lg:left-[98px] lg:translate-x-0 left-1/2 -translate-x-1/2  flex items-center h-full">
        <Link href="/" className="w-[150px]">
          <Image
            src="/images/logo-branco.png"
            alt="Arnecke logo"
            width={150}
            height={40}
            className="object-contain"
          />
        </Link>
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 lg:flex hidden items-center h-full">
        <Link href="/">
          <Image
            src="/images/logo-branco-redondo.png"
            alt="Shop"
            width={40}
            height={40}
          />
        </Link>
      </div>
      <div className="absolute text-[33px] leading-none tracking-tighter right-4 flex items-center h-full lg:flex hidden">
        <Link
          className="hover:opacity-90 transition-opacity"
          href="https://arnecke.lojavirtualnuvem.com.br/"
        >
          SHOP
        </Link>
      </div>
    </header>
  );
};
