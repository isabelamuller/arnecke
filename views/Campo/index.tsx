"use client";

import { useTranslation } from "@/i18n/useTranslation";
import { PageDraggable } from "../PageDragable";
import { CONTEXT_ITEMS } from "./data";

export const CampoView = () => {
  const { t } = useTranslation();

  return <PageDraggable items={CONTEXT_ITEMS} title={t("Campo.titlePage")} />;
};
