"use client";

import { useMemo } from "react";

import { EXPLORE_ITEMS } from "./data";
import { PageView } from "../Page";
import { useTranslation } from "@/i18n/useTranslation";

export const ExploreView = () => {
  const { t, language } = useTranslation();

  const translatedItems = useMemo(() => {
    return EXPLORE_ITEMS.map((item) => {
      const itemBaseKey = `Explore.items.${item.slug}`;

      return {
        ...item,
        eyebrow: item.eyebrow ? t(`${itemBaseKey}.eyebrow`) : undefined,
        title: t(`${itemBaseKey}.title`),
        description: t(`${itemBaseKey}.description`),
        collection: item.collection
          ? {
              ...item.collection,
              title: t(`${itemBaseKey}.collectionTitle`),
            }
          : undefined,
      };
    });
  }, [t, language]);

  return (
    <PageView
      title={t("Explore.title")}
      items={translatedItems}
      borderedItems
      imageLayout="square-grid"
    />
  );
};
