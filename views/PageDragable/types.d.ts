import { IPageItem } from "../Page/types";

export type TImage = {
  src: string;
  title: string;
  slug: string;
  item: IPageItem;
};

export type TMeasuredImage = TImage & {
  width: number;
  height: number;
};

export type TSize = {
  width: number;
  height: number;
};

export type TOffset = {
  x: number;
  y: number;
};

export interface IPageDraggableProps {
  items: IPageItem[];
  title: string;
  isModal?: boolean;
}
