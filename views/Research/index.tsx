import Image from "next/image";
import Link from "next/link";

import { Layout } from "@/components/Layout";
import { RESEARCH_ARTICLES } from "./data";
import { loadResearchStyles } from "./styles";

export const ResearchView = () => {
  const styles = loadResearchStyles();

  return (
    <Layout widthSize="entire">
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1 className={styles.pageTitle}>Research</h1>
          <p>Descricao pagina research</p>
        </div>
        {RESEARCH_ARTICLES.map((article, index) => (
          <Link
            key={index}
            href={`/research/${article.slug}`}
            className={styles.cardWrapper}
          >
            <div className={styles.content}>
              <Image
                src={article.image}
                alt={article.title}
                fill
                objectFit="cover"
                className={styles.image}
              />
              <div className={styles.overlay} />
              <div className={styles.textContent}>
                <span className={styles.year}>{article.year}</span>
                <div>
                  <h2 className={styles.title}>{article.title}</h2>
                  <p className={styles.description}>{article.description}</p>
                </div>
                <div className={styles.bottomContent}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div className={styles.research}>
                    <span>Ler pesquisa</span>
                    <span className={styles.arrow}>→</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
};
