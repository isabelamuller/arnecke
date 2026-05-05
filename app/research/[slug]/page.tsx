import { Layout } from "@/components/Layout";
import { RESEARCH_ARTICLES } from "@/views/Research/data";
import { notFound } from "next/navigation";
import { loadResearchSubpageStyles } from "./styles";
import { ResearchSlugPageProps } from "./types";
import { getMetadata } from "@/utils/getMetada";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: ResearchSlugPageProps): Promise<Metadata> {
  const { slug } = await params;

  const page = RESEARCH_ARTICLES.find((item) => item.slug === slug);

  if (!page) {
    return getMetadata();
  }

  return getMetadata(page.title);
}

export default async function ResearchSlugPage({
  params,
}: ResearchSlugPageProps) {
  const { slug } = await params;
  const styles = loadResearchSubpageStyles();

  const page = RESEARCH_ARTICLES.find((item) => item.slug === slug);

  if (!page) {
    notFound();
  }

  const Article = await page.component();

  return (
    <Layout widthSize="article">
      <div className={styles.titleContent}>
        <h1 className={styles.title}>{page.title}</h1>
        <span>{page.description}</span>
      </div>
      <article className={styles.article}>
        <Article.default />
      </article>
    </Layout>
  );
}
