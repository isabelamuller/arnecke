"use client";

import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";

export const HamburguerMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <button
        className="cursor-pointer relative z-50 flex items-center justify-start w-full h-full"
        aria-label="Toggle menu"
        onClick={toggleMenu}
      >
        {isMenuOpen ? (
          <IoCloseOutline size={35} />
        ) : (
          <RxHamburgerMenu size={30} />
        )}
      </button>
      {isMenuOpen && (
        <div
          className="fixed top-16 inset-0 bg-black/10 z-30 transition-opacity"
          onClick={closeMenu}
        />
      )}
      <div
        className={`bg-color-arnecke-blue fixed top-16 left-0 h-[calc(100vh-64px)] w-70 z-40 border-r shadow-2xl transform transition-transform duration-300 ease-in-out  ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 ml-12">
          <ul className="mt-4 space-y-4 font-helvetica uppercase text-sm tracking-widest">
            <li
              className="cursor-pointer hover:opacity-50 transition-opacity"
              onClick={closeMenu}
            >
              Arnecke Universe
            </li>
            <li
              className="cursor-pointer hover:opacity-50 transition-opacity"
              onClick={closeMenu}
            >
              Coleção I
            </li>
            <li
              className="cursor-pointer hover:opacity-50 transition-opacity"
              onClick={closeMenu}
            >
              Coleção II
            </li>
            <li
              className="cursor-pointer hover:opacity-50 transition-opacity"
              onClick={closeMenu}
            >
              Community
            </li>
            <li
              className="cursor-pointer hover:opacity-50 transition-opacity"
              onClick={closeMenu}
            >
              <a
                href="https://arnecke.lojavirtualnuvem.com.br/"
                className="block w-full"
              >
                Shop
              </a>
            </li>
            <li
              className="cursor-pointer hover:opacity-50 transition-opacity"
              onClick={closeMenu}
            >
              Archive
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
