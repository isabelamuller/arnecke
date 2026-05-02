"use client";

import { RESEARCH_ITEMS } from "./data";
import { PageView } from "../Page";

export const ResearchView = () => {
  return (
    <PageView
      title="Research"
      description="Research page"
      items={RESEARCH_ITEMS}
      isModal={false}
      hoverLabel="Open Research"
    />
  );
};
