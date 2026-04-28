"use client";

import { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { GoTriangleRight } from "react-icons/go";
import { FaShoppingBag } from "react-icons/fa";
import { ScreenMenu } from "../ScreenMenu";
import { useTickSound } from "@/utils/useSound";
import { IoLogoInstagram, IoLogoWhatsapp } from "react-icons/io";

export const HamburguerMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const playTick = useTickSound();

  useEffect(() => {
    const page = document.getElementById("page-content");

    if (!page) return;

    page.classList.remove(
      "translate-x-1/3",
      "translate-x-full",
      "lg:translate-x-1/3",
    );

    const updatePagePosition = () => {
      if (!isMenuOpen) {
        page.style.transform = "translateX(0)";
        page.style.pointerEvents = "auto";
        return;
      }

      const isDesktop = window.innerWidth >= 1024;

      page.style.transform = isDesktop
        ? "translateX(33.333vw)"
        : "translateX(100vw)";

      page.style.pointerEvents = "none";
    };

    updatePagePosition();

    window.addEventListener("resize", updatePagePosition);

    return () => {
      window.removeEventListener("resize", updatePagePosition);

      if (!isMenuOpen) {
        page.style.transform = "translateX(0)";
        page.style.pointerEvents = "auto";
      }
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    playTick();
  };

  function closeMenu() {
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
        className={`fixed top-0 left-0 h-screen lg:w-1/3 w-full z-40 bg-color-arnecke-blue text-white transform transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.18,1)] ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="relative h-full w-full px-5 pt-[70px] pb-6 font-helvetica overflow-hidden">
          <span className="absolute top-4 right-5 text-[10px] uppercase tracking-[0.35em] text-white/50">
            Menu
          </span>

          <span className="absolute bottom-7 right-5 text-[10px] uppercase tracking-[0.35em] text-white/40 rotate-90 origin-bottom-right">
            Scoring goals
          </span>
          <div className="absolute left-5 top-[70px] h-[calc(100%-100px)] w-[1px] bg-white/20 lg:block hidden" />
          <ul className="lg:ml-5 flex flex-col">
            <li className="border-t border-white/25">
              <a
                href="https://arnecke.lojavirtualnuvem.com.br/"
                onClick={closeMenu}
                className="group flex items-center justify-between py-5 uppercase"
              >
                <span className="cursor-pointer flex items-center gap-3 text-[20px] leading-none font-bold tracking-[-0.05em]">
                  Shop
                  <FaShoppingBag size={18} className="opacity-60" />
                </span>

                <span className="text-[11px] tracking-[0.3em] opacity-40 group-hover:opacity-100 transition-opacity">
                  01
                </span>
              </a>
            </li>
            <li className="border-t border-white/25">
              <button
                onClick={closeMenu}
                className="group flex w-full items-center justify-between py-5 uppercase text-left"
              >
                <span className="cursor-pointer text-[20px] leading-none font-bold tracking-[-0.05em]">
                  Circle Numbers
                </span>
                <span className="text-[11px] tracking-[0.3em] opacity-40 group-hover:opacity-100 transition-opacity">
                  02
                </span>
              </button>
            </li>
            <li className="cursor-pointer border-t border-white/20">
              <a
                href="/contact"
                onClick={closeMenu}
                className="group flex items-center justify-between py-5 uppercase"
              >
                <span className="cursor-pointer text-[20px] leading-none font-bold tracking-[-0.05em]">
                  Contato
                </span>
                <span className="text-[11px] tracking-[0.3em] opacity-40 group-hover:opacity-100 transition-opacity">
                  03
                </span>
              </a>
            </li>
            <li className="border-y border-white/25">
              <button
                onClick={toggleArchiveClick}
                className="group flex w-full items-center justify-between py-5 uppercase text-left"
              >
                <span className="cursor-pointer text-[20px] leading-none font-bold tracking-[-0.05em] italic">
                  Archive
                </span>
                <span className="text-[11px] tracking-[0.3em] opacity-40 group-hover:opacity-100 transition-opacity">
                  04
                </span>
              </button>
            </li>
          </ul>
          <div className="absolute bottom-16 left-10 right-10">
            <div className="flex flex-row gap-2">
              <a
                href="https://instagram.com"
                target="_blank"
                className="group relative"
              >
                <IoLogoInstagram
                  size={18}
                  className="opacity-70 group-hover:opacity-100 transition-all duration-300"
                />
              </a>
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                className="group relative"
              >
                <IoLogoWhatsapp
                  size={18}
                  className="opacity-70 group-hover:opacity-100 transition-all duration-300"
                />
              </a>
            </div>
          </div>
          <div className="absolute right-0 top-[70px] h-[calc(100%-100px)] w-[1px] bg-white/20 lg:block hidden" />
          <div className="absolute bottom-5 left-10 text-[10px] uppercase tracking-[0.25em] text-white/40">
            Since 2024 © Expanding experiences
          </div>
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
