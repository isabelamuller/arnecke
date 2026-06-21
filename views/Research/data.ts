import { IResearchArticle } from "./types";

export const RESEARCH_ARTICLES: IResearchArticle[] = [
  {
    slug: "circle-numbers",
    title: "Circle Numbers",
    description:
      "Uma investigação sobre números, função, tipografia e comportamento no futebol.",
    year: "2026",
    image: "/images/research/pesquisa-1/foto-museu.png",
    component: () => import("../../content/circle-numbers.mdx"),
  },
];
