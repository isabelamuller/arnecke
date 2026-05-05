import type React from "react";

export interface IResearchArticle {
  slug: string;
  title: string;
  description: string;
  year: string;
  image: string;
  component: () => Promise<{
    default: React.ComponentType;
  }>;
}
