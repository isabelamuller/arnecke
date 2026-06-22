"use client";

import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { GoTriangleRight } from "react-icons/go";

import { ScreenMenu } from "../ScreenMenu";
import { useTickSound } from "@/utils/useSound";
import { loadHamburguerMenuStyles } from "./styles";
import { menuItems, socialItems } from "./data";
import { IThemeProps } from "../Header";
import { usePageTitle } from "../PageTitleProvider";
import { useTranslation } from "@/i18n/useTranslation";

export const HamburguerMenu = ({ theme }: IThemeProps) => {
  const styles = loadHamburguerMenuStyles(theme);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);

  const playTick = useTickSound();
  const { pageTitle } = usePageTitle();
  const { t } = useTranslation();

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
        <button className={styles.buttonWrapper} onClick={toggleMenu}>
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
          <span className={styles.verticalText}>
            {t("HamburguerMenu.verticalText")}
          </span>
          <div className={styles.verticalLineRight} />
          <ul>
            {menuItems.map((menuItem, index) => (
              <li className={styles.listItem} key={menuItem.id}>
                <a
                  className={styles.listLink}
                  href={menuItem.href}
                  onClick={
                    menuItem.id === "nucleo" ? toggleArchiveClick : closeMenu
                  }
                >
                  {t(`HamburguerMenu.${menuItem.translationKey}`)}
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
          {t("HamburguerMenu.footerText")}
        </div>
      </div>
      <div className={styles.archiveWrapper(isArchiveOpen)}>
        <ScreenMenu onClose={() => setIsArchiveOpen(false)} />
      </div>
    </>
  );
};
