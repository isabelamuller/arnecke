import Image from "next/image";
import Link from "next/link";
import { HamburguerMenu } from "../HamburguerMenu";
import { loadHeaderStyles } from "./styles";
import { LanguageDropdown } from "../LanguageDropdown";

export interface IThemeProps {
  theme: "blue" | "white";
}

export const Header = ({ theme }: IThemeProps) => {
  const styles = loadHeaderStyles();

  return (
    <header className={styles.wrapper(theme)}>
      <div className={styles.content}>
        <HamburguerMenu theme={theme} />
        <Link
          href="/"
          aria-label="Go to homepage"
          className={styles.logoWrapper}
        >
          {theme === "blue" ? (
            <Image
              src="/images/logo-branco.png"
              alt="Arnecke logo"
              width={86}
              height={40}
            />
          ) : (
            <Image
              src="/images/logo-azul.png"
              alt="Arnecke logo"
              width={86}
              height={40}
            />
          )}
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="https://arnecke.lojavirtualnuvem.com.br/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.shopLink}
          >
            SHOP
          </Link>
          <LanguageDropdown />
        </div>
      </div>
    </header>
  );
};
