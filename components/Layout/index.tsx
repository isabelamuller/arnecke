import { loadLayoutStyles } from "./styles";
import { ILayoutProps } from "./types";

export const Layout = ({
  children,
  widthSize = "full",
  theme = "white",
}: ILayoutProps) => {
  const styles = loadLayoutStyles();

  return <div className={styles.wrapper(widthSize, theme)}>{children}</div>;
};
