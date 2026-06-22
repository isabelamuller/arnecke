"use client";

import Image from "next/image";
import Link from "next/link";

import { Layout } from "@/components/Layout";
import { RESEARCH_ARTICLES } from "./data";
import { loadResearchStyles } from "./styles";
import { PageTitleSetter } from "@/components/PageTitleProvider";
import { useTranslation } from "@/i18n/useTranslation";

export const ResearchView = () => {
  const styles = loadResearchStyles();
  const { t } = useTranslation();

  return (
    <>
      <PageTitleSetter title={t("Research.titlePage")} />
      <Layout widthSize="entire">
        <div className={styles.wrapper}>
          {RESEARCH_ARTICLES.map((article, index) => (
            <Link
              key={article.slug}
              href={`/research/${article.slug}`}
              className={styles.cardWrapper}
            >
              <div className={styles.content}>
                <Image
                  src={article.image}
                  alt=""
                  fill
                  objectFit="cover"
                  className={styles.image}
                />
                <div className={styles.overlay} />
                <div className={styles.textContent}>
                  <span className={styles.year}>{article.year}</span>
                  <div>
                    <h2 className={styles.title}>
                      {t(`Research.articles.${article.slug}.title`)}
                    </h2>
                    <p className={styles.description}>
                      {t(`Research.articles.${article.slug}.description`)}
                    </p>
                  </div>
                  <div className={styles.bottomContent}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div className={styles.research}>
                      <span>{t("Research.readLabel")}</span>
                      <span className={styles.arrow}>→</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Layout>
    </>
  );
};
