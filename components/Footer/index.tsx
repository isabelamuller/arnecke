"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoLogoInstagram } from "react-icons/io";
import { ScreenMenu } from "../ScreenMenu";
import { useTickSound } from "@/utils/useSound";
import { loadFooterStyles } from "./styles";
import { IThemeProps } from "../Header";

export const Footer = ({ theme }: IThemeProps) => {
  const styles = loadFooterStyles(theme);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const playTick = useTickSound();

  function openArchive() {
    setIsArchiveOpen(true);
    playTick();
  }

  function closeArchive() {
    setIsArchiveOpen(false);
    playTick();
  }

  return (
    <>
      <footer className={styles.wrapper}>
        <div className={styles.inner}>
          <div className={styles.topBar}>
            <button
              type="button"
              onClick={openArchive}
              className={styles.navLink}
            >
              Núcleo
            </button>
            <a
              href="https://www.instagram.com/_arnecke/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <IoLogoInstagram size={14} />
              Instagram
            </a>
            <Link
              href="https://arnecke.lojavirtualnuvem.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.navLink}
            >
              Shop
            </Link>
          </div>
          <div className={styles.logoWrapper}>
            <Image
              src={
                theme === "blue"
                  ? "/images/logo-contact.png"
                  : "/images/footer-logo.png"
              }
              alt="Arnecke logo"
              width={192}
              height={20}
            />
          </div>
          <div className={styles.divider} />
          <div className={styles.credits}>
            <p>
              © {new Date().getFullYear()} ARNECKE LTDA. All rights reserved.
            </p>
            <p>
              Created by{" "}
              <a
                href="https://www.linkedin.com/in/isabela-m%C3%BCllerrr/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.creditLink}
              >
                Isa.
              </a>
            </p>
          </div>
        </div>
      </footer>
      <div className={styles.archiveOverlay(isArchiveOpen)}>
        <ScreenMenu onClose={closeArchive} />
      </div>
    </>
  );
};
