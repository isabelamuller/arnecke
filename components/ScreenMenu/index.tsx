import { useTickSound } from "@/utils/useSound";
import { IoCloseOutline } from "react-icons/io5";
import { IScreenMenuProps } from "./types";
import { loadScreenMenuStyles } from "./styles";
import { SCREEN_MENU_ITEMS } from "./data";
import Image from "next/image";

export const ScreenMenu = ({ onClose }: IScreenMenuProps) => {
  const styles = loadScreenMenuStyles();
  const playTick = useTickSound();

  return (
    <div className={styles.wrapper}>
      <div className="absolute left-1/2 -translate-x-1/2 top-4">
        <Image
          src="/images/logo-preto.png"
          alt="Arnecke logo"
          width={86}
          height={40}
        />
      </div>
      <button className={styles.closeButton} onClick={onClose}>
        <IoCloseOutline size={30} color="black" />
      </button>
      <ul className={styles.menuList}>
        {SCREEN_MENU_ITEMS.map((item, index) => (
          <li className={styles.listItem} key={index}>
            <a href={item.href} onClick={playTick} onMouseEnter={playTick}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
