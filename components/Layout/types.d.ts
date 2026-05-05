import { ReactNode } from "react";
import { WidthSize } from ".";

export interface ILayoutProps {
  children: ReactNode;
  widthSize?: "full" | "medium" | "entire" | "article";
  theme?: "blue" | "white";
}
