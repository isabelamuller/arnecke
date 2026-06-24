"use client";

import { ComponentType, useEffect, useState } from "react";

import { Layout } from "@/components/Layout";
import { PageTitleSetter } from "@/components/PageTitleProvider";
import { useTranslation } from "@/i18n/useTranslation";
import { RESEARCH_ARTICLES } from "@/views/Research/data";

import { loadResearchSubpageStyles } from "./styles";

type ResearchSlugContentProps = {
  slug: string;
};

export const ResearchSlugContent = ({ slug }: ResearchSlugContentProps) => {
  const styles = loadResearchSubpageStyles();
  const { t, language } = useTranslation();

  const [Article, setArticle] = useState<ComponentType | null>(null);

  const page = RESEARCH_ARTICLES.find((item) => item.slug === slug);

  useEffect(() => {
    let isMounted = true;

    async function loadArticle() {
      setArticle(null);

      const currentPage = RESEARCH_ARTICLES.find((item) => item.slug === slug);

      if (!currentPage) return;

      const articleModule = await currentPage.componentByLanguage[language]();

      if (!isMounted) return;

      setArticle(() => articleModule.default);
    }

    loadArticle();

    return () => {
      isMounted = false;
    };
  }, [slug, language]);

  if (!page) return null;

  const title = t(`Research.articles.${slug}.title`);
  const description = t(`Research.articles.${slug}.description`);

  return (
    <>
      <PageTitleSetter title={`${t("Research.titlePage")} - ${title}`} />

      <Layout widthSize="article">
        <div className={styles.titleContent}>
          <h1 className={styles.title}>{title}</h1>
          <span>{description}</span>
        </div>

        <article className={styles.article}>
          {Article ? <Article /> : null}
        </article>
      </Layout>
    </>
  );
};
