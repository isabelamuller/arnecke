"use client";

import { useEffect, useState } from "react";
import { COMMUNITY_IMAGES } from "./data";
import { IPageItem } from "../Page/types";
import { PageView } from "../Page";

export const CommunityView = () => {
  const [images, setImages] = useState<IPageItem[]>([]);

  useEffect(() => {
    const shuffled = [...COMMUNITY_IMAGES].sort(() => Math.random() - 0.5);
    setImages(shuffled);
  }, []);

  return (
    <PageView
      title="Community"
      description="Community view"
      items={images}
      squaredImages={false}
      isModal={false}
      hoverLabel="View on Instagram"
    />
  );
};
