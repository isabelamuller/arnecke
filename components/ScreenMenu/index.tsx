import { useTickSound } from "@/utils/useSound";
import { IoCloseOutline } from "react-icons/io5";
import { IScreenMenuProps } from "./types";
import { loadScreenMenuStyles } from "./styles";
import { SCREEN_MENU_ITEMS } from "./data";

export const ScreenMenu = ({ onClose }: IScreenMenuProps) => {
  const styles = loadScreenMenuStyles();
  const playTick = useTickSound();

  return (
    <div className={styles.wrapper}>
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
