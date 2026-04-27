"use client";

import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaShoppingBag } from "react-icons/fa";
import { ScreenMenu } from "../ScreenMenu";

export const HamburguerMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  function toggleArchiveClick() {
    setIsMenuOpen(false);
    setIsArchiveOpen(true);
  }

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
        className={`bg-color-arnecke-blue fixed top-16 left-0 h-[calc(100vh-64px)] w-60 z-40 shadow-2xl transform transition-transform duration-300 ease-in-out  ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 ml-10">
          <ul className="mt-4 space-y-4 font-helvetica uppercase text-sm tracking-widest">
            <li
              className="cursor-pointer hover:opacity-50 transition-opacity flex items-center relative "
              onClick={closeMenu}
            >
              <FaShoppingBag className="absolute left-[-20px]" />
              <a href="https://arnecke.lojavirtualnuvem.com.br/">Shop</a>
            </li>
            <li
              className="cursor-pointer hover:opacity-50 transition-opacity"
              onClick={closeMenu}
            >
              Circle numbers
            </li>
            <li
              className="cursor-pointer hover:opacity-50 transition-opacity underline underline-offset-8"
              onClick={toggleArchiveClick}
            >
              Archive
            </li>
            <li
              className="cursor-pointer hover:opacity-50 transition-opacity"
              onClick={closeMenu}
            >
              <a href="/contact">Contato</a>
            </li>
          </ul>
        </div>
      </div>
      <div
        className={`fixed inset-0 z-[100] transform transition-transform duration-300 ease-in-out ${
          isArchiveOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <ScreenMenu onClose={() => setIsArchiveOpen(false)} />
      </div>
    </>
  );
};
