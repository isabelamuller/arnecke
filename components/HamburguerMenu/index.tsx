"use client";

import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { GoTriangleRight } from "react-icons/go";
import { FaShoppingBag } from "react-icons/fa";
import { ScreenMenu } from "../ScreenMenu";
import { useTickSound } from "@/utils/useSound";

export const HamburguerMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const playTick = useTickSound();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  function toggleClick() {
    setIsMenuOpen(false);
    playTick();
  }

  function toggleArchiveClick() {
    setIsMenuOpen(false);
    setIsArchiveOpen(true);
    playTick();
  }

  return (
    <>
      <button
        className="cursor-pointer relative z-[99] flex items-center justify-start"
        aria-label="Toggle menu"
        onClick={toggleMenu}
      >
        {isMenuOpen ? (
          <IoCloseOutline size={20} />
        ) : (
          <GoTriangleRight size={20} />
        )}
      </button>
      <div
        className={`fixed inset-0 z-30 transition-opacity ease-in-out duration-300 ${
          isMenuOpen
            ? "opacity-100 bg-black/10"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMenu}
      />
      <div
        className={`bg-color-arnecke-blue/90 backdrop-blur-md border-r border-white/10 fixed top-[48px] left-0 h-[calc(100vh-49px)] w-60 z-40 shadow-2xl transform transition-transform duration-300 ease-in-out  ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 ml-10">
          <ul className="mt-4 space-y-4 font-helvetica uppercase text-sm tracking-widest">
            <li
              className="cursor-pointer hover:opacity-50 transition-opacity flex items-center relative"
              onClick={toggleClick}
            >
              <FaShoppingBag className="absolute left-[-20px]" />
              <a href="https://arnecke.lojavirtualnuvem.com.br/">Shop</a>
            </li>
            <li
              className="cursor-pointer hover:opacity-50 transition-opacity"
              onClick={toggleClick}
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
              onClick={toggleClick}
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
