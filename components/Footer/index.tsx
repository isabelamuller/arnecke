"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoLogoInstagram } from "react-icons/io";
import { ScreenMenu } from "../ScreenMenu";
import { useTickSound } from "@/utils/useSound";
import { loadFooterStyles } from "./styles";

export const Footer = () => {
  const styles = loadFooterStyles();
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
        <Image
          src="/images/signature.png"
          alt="Arnecke logo"
          width={120}
          height={48}
          className={styles.logo}
        />
        <div className={styles.nav}>
          <button
            type="button"
            onClick={openArchive}
            className={styles.archiveButton}
          >
            Archive
          </button>
          <a
            href="https://www.instagram.com/_arnecke/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            <IoLogoInstagram size={16} />
            Instagram
          </a>
          <Link
            href="https://arnecke.lojavirtualnuvem.com.br/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.shopLink}
          >
            Shop ↗
          </Link>
        </div>
        <div className={styles.divider} />
        <div className={styles.credits}>
          <p>© {new Date().getFullYear()} Arnecke. All rights reserved.</p>
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
      </footer>
      <div className={styles.archiveOverlay(isArchiveOpen)}>
        <ScreenMenu onClose={closeArchive} />
      </div>
    </>
  );
};
