import Image from "next/image";
import { IoCloseOutline } from "react-icons/io5";

import { useTickSound } from "@/utils/useSound";
import { useTranslation } from "@/i18n/useTranslation";

import { IScreenMenuProps } from "./types";
import { loadScreenMenuStyles } from "./styles";
import { SCREEN_MENU_ITEMS } from "./data";

export const ScreenMenu = ({ onClose }: IScreenMenuProps) => {
  const styles = loadScreenMenuStyles();
  const playTick = useTickSound();
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <div className="absolute left-1/2 top-4 -translate-x-1/2">
        <Image
          src="/images/logo-preto.png"
          alt="Arnecke logo"
          width={86}
          height={40}
        />
      </div>
      <button type="button" className={styles.closeButton} onClick={onClose}>
        <IoCloseOutline size={30} color="black" />
      </button>
      <ul className={styles.menuList}>
        {SCREEN_MENU_ITEMS.map((item) => (
          <li className={styles.listItem} key={item.translationKey}>
            <a href={item.href} onClick={playTick} onMouseEnter={playTick}>
              {t(`ScreenMenu.${item.translationKey}`)}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
