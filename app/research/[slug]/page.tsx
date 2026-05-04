import { Layout } from "@/components/Layout";
import { RESEARCH_ARTICLES } from "@/views/Research/data";
import { notFound } from "next/navigation";

interface ResearchSlugPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ResearchSlugPage({
  params,
}: ResearchSlugPageProps) {
  const { slug } = await params;

  const page = RESEARCH_ARTICLES.find((item) => item.slug === slug);

  if (!page) {
    notFound();
  }

  return (
    <Layout>
      <h1>{page.title}</h1>
    </Layout>
  );
}
