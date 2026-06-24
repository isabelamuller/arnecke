import { ComponentType } from "react";

import { Language } from "@/i18n/messages";

export type ResearchArticleModule = {
  default: ComponentType;
};

export type IResearchArticle = {
  slug: string;
  title: string;
  description: string;
  year: string;
  image: string;
  componentByLanguage: Record<Language, () => Promise<ResearchArticleModule>>;
};
