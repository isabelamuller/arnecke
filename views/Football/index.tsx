"use client";

import { useTranslation } from "@/i18n/useTranslation";
import { PageDraggable } from "../PageDragable";
import { FOOTBALL_ITEMS } from "./data";

export const FootballView = () => {
  const { t } = useTranslation();
  return (
    <PageDraggable items={FOOTBALL_ITEMS} title={t("Football.titlePage")} />
  );
};
