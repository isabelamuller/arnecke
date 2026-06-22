"use client";

import { useEffect, useState } from "react";

import { COMMUNITY_IMAGES } from "./data";
import { IPageItem } from "../Page/types";
import { PageView } from "../Page";
import { useTranslation } from "@/i18n/useTranslation";

export const CommunityView = () => {
  const { t } = useTranslation();
  const [images, setImages] = useState<IPageItem[]>([]);

  useEffect(() => {
    const shuffled = [...COMMUNITY_IMAGES].sort(() => Math.random() - 0.5);
    setImages(shuffled);
  }, []);

  return (
    <PageView
      title={t("Community.title")}
      items={images}
      imageLayout="masonry-grid"
      isModal={false}
      hoverLabel={t("Community.hoverLabel")}
    />
  );
};
