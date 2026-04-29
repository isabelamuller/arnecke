"use client";

import { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { GoTriangleRight } from "react-icons/go";
import { ScreenMenu } from "../ScreenMenu";
import { useTickSound } from "@/utils/useSound";
import { loadHamburguerMenuStyles } from "./styles";
import { menuItems, socialItems } from "./data";

export const HamburguerMenu = () => {
  const styles = loadHamburguerMenuStyles();
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
        document.documentElement.style.overflowX = "";
        document.body.style.overflowX = "";
        return;
      }
      const isDesktop = window.innerWidth >= 1024;
      page.style.transform = isDesktop
        ? "translateX(33.333vw)"
        : "translateX(100vw)";

      page.style.pointerEvents = "none";
      document.documentElement.style.overflowX = "hidden";
      document.body.style.overflowX = "hidden";
    };
    updatePagePosition();
    window.addEventListener("resize", updatePagePosition);
    return () => {
      window.removeEventListener("resize", updatePagePosition);
      page.style.transform = "translateX(0)";
      page.style.pointerEvents = "auto";
      document.documentElement.style.overflowX = "";
      document.body.style.overflowX = "";
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
        className={styles.buttonWrapper}
        aria-label="Toggle menu"
        onClick={toggleMenu}
      >
        {isMenuOpen ? (
          <IoCloseOutline size={20} />
        ) : (
          <GoTriangleRight size={20} />
        )}
      </button>
      <div className={styles.wrapper(isMenuOpen)}>
        <div className={styles.content}>
          <span className={styles.exploreText}>Explore</span>
          <span className={styles.verticalText}>Scoring goals</span>
          <div className={styles.verticalLineRight} />
          <ul>
            {menuItems.map((menuItem, index) => (
              <li className={styles.listItem} key={index}>
                <a
                  className={styles.listLink}
                  href={menuItem.href}
                  onClick={
                    menuItem.label === "Archive"
                      ? toggleArchiveClick
                      : closeMenu
                  }
                >
                  {menuItem.label}
                  <span className={styles.numberWrapper}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <div className={styles.socialWrapper}>
            {socialItems.map((socialItem, index) => (
              <a
                key={index}
                href={socialItem.href}
                target="_blank"
                className={styles.socialItem}
              >
                {socialItem.icon}
              </a>
            ))}
          </div>
        </div>
        <div className={styles.verticalLineLeft} />
        <div className={styles.horizontalText}>
          Since 2024 © Expanding experiences
        </div>
      </div>
      <div className={styles.archiveWrapper(isArchiveOpen)}>
        <ScreenMenu onClose={() => setIsArchiveOpen(false)} />
      </div>
    </>
  );
};
