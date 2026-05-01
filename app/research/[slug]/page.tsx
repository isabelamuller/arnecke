import { Layout } from "@/components/Layout";
import { RESEARCH_ITEMS } from "@/views/Research/data";
import { notFound } from "next/navigation";

interface ResearchSlugPageProps {
  params: {
    slug: string;
  };
}

export default function ResearchSlugPage({ params }: ResearchSlugPageProps) {
  const page = RESEARCH_ITEMS.find((item) => item.slug === params.slug);

  if (!page) {
    notFound();
  }

  return (
    <Layout>
      <h1>{page.title}</h1>
      <p>{page.description}</p>
    </Layout>
  );
}
