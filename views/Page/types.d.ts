export interface IPageItem {
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
  description?: string;
  items?: IPageItem[];
  borderedItems?: boolean;
  isModal?: boolean;
  squaredImages?: boolean;
  hoverLabel?: string;
  widthSize?: "full" | "medium" | "entire";
  hasHoverImage?: boolean;
}
