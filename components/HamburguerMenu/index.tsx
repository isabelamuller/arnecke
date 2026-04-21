"use client";

import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";

export const HamburguerMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <button
        className="cursor-pointer z-50 relative"
        aria-label="Toggle menu"
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        {isMenuOpen ? (
          <IoCloseOutline size={35} />
        ) : (
          <RxHamburgerMenu size={30} />
        )}
      </button>
      <div
        className={`fixed top-16 left-[45px] h-full w-64 z-40 bg-color-arnecke-white transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-[calc(100%+45px)]"
        }`}
      >
        <div className="p-4">
          <ul className="mt-4 space-y-2 font-helvetica">
            <li className="cursor-pointer">Arnecke Universe</li>
            <li className="cursor-pointer">Coleção I</li>
            <li className="cursor-pointer">Coleção II</li>
            <li className="cursor-pointer">Community</li>
            <li className="cursor-pointer">
              <a href="/shop">Shop</a>
            </li>
            <li className="cursor-pointer">Archive</li>
          </ul>
        </div>
      </div>
    </>
  );
};
