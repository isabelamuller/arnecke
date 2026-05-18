export type TPageImageLayout =
  | "square-grid"
  | "masonry-grid"
  | "horizontal-row";

export interface IPageItem {
  eyebrow?: string;
  title?: string;
  images?: {
    src: string;
  }[];
  description?: string;
  year?: string;
  collection?: {
    title: string;
    link: string;
  };
  link?: string;
  slug?: string;
}

export interface IPageProps {
  title: string;
  items?: IPageItem[];
  borderedItems?: boolean;
  isModal?: boolean;
  hoverLabel?: string;
  widthSize?: "full" | "medium" | "entire";
  hasHoverImage?: boolean;
  isScaleUpImage?: boolean;
  imageLayout: TPageImageLayout;
}
