"use client";

import { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { GoTriangleRight } from "react-icons/go";

import { ScreenMenu } from "../ScreenMenu";
import { useTickSound } from "@/utils/useSound";
import { loadHamburguerMenuStyles } from "./styles";
import { menuItems, socialItems } from "./data";
import { IThemeProps } from "../Header";
import { usePageTitle } from "../PageTitleProvider";

export const HamburguerMenu = ({ theme }: IThemeProps) => {
  const styles = loadHamburguerMenuStyles(theme);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const playTick = useTickSound();
  const { pageTitle } = usePageTitle();

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
      <div className={styles.headerTriggerWrapper}>
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
        <span className={styles.pageTitle}>{pageTitle}</span>
      </div>
      <div className={styles.wrapper(isMenuOpen)}>
        <div className={styles.content}>
          <span className={styles.verticalText}>Scoring goals</span>
          <div className={styles.verticalLineRight} />
          <ul>
            {menuItems.map((menuItem, index) => (
              <li className={styles.listItem} key={index}>
                <a
                  className={styles.listLink}
                  href={menuItem.href}
                  onClick={
                    menuItem.label === "Núcleo" ? toggleArchiveClick : closeMenu
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
                target={socialItem.target}
                rel="noopener noreferrer"
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
