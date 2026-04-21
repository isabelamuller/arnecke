import Image from "next/image";
import { HamburguerMenu } from "../HamburguerMenu";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="bg-color-arnecke-blue border-b-1 border-color-arnecke-white w-full h-16 flex gap-x-2 items-center fixed top-0 left-0 z-50 px-4">
      <div className="w-full max-w-[50px] h-full flex items-center border-r-1 border-color-arnecke-white">
        <HamburguerMenu />
      </div>
      <ul className="font-systemia flex gap-3 w-full justify-between px-20 items-center">
        <li className="flex items-center">
          <Link href="/" className="block w-[80px]">
            <Image
              src="/images/name-blue-bg.png"
              alt="Arnecke logo"
              width={80}
              height={40}
              className="object-contain"
            />
          </Link>
        </li>
        <li className="after:bottom-[-2px] relative cursor-pointer after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full">
          COLEÇÃO I
        </li>
        <li className="after:bottom-[-2px] relative cursor-pointer after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full">
          COLEÇÃO II
        </li>
      </ul>
    </header>
  );
};
