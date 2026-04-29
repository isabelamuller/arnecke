import Image from "next/image";
import Link from "next/link";
import { HamburguerMenu } from "../HamburguerMenu";
import { loadHeaderStyles } from "./styles";

export const Header = () => {
  const styles = loadHeaderStyles();

  return (
    <header className={styles.wrapper}>
      <div className={styles.content}>
        <HamburguerMenu />
        <Link
          href="/"
          aria-label="Go to homepage"
          className={styles.logoWrapper}
        >
          <Image
            src="/images/logo-branco.png"
            alt="Arnecke logo"
            width={86}
            height={40}
            priority
            className="object-contain"
          />
        </Link>
        <Link
          href="https://arnecke.lojavirtualnuvem.com.br/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.shopLink}
        >
          SHOP
        </Link>
      </div>
    </header>
  );
};
