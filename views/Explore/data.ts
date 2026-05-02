import { IResearchItem } from "@/views/Research/types";

export interface IExploreItem {
  title: string;
  images: {
    src: string;
  }[];
  description: string;
}

export const EXPLORE_ITEMS: IExploreItem[] = [
  {
    title: "Pesquisa da coleção 1",
    images: [
      {
        src: "/images/jacket-front.png",
      },
      {
        src: "/images/jacket-back.png",
      },
    ],
    description: "Texto do research 001. Descricao.",
  },
];
