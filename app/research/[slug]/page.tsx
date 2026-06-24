import { Metadata } from "next";
import { notFound } from "next/navigation";

import { RESEARCH_ARTICLES } from "@/views/Research/data";
import { getMetadata } from "@/utils/getMetada";
import { ResearchSlugPageProps } from "./types";
import { ResearchSlugContent } from "./ResearchSlugContent";

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

  const page = RESEARCH_ARTICLES.find((item) => item.slug === slug);

  if (!page) {
    notFound();
  }

  return <ResearchSlugContent slug={page.slug} />;
}
