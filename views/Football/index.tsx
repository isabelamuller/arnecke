import { PageDraggable } from "../PageDragable";
import { FOOTBALL_ITEMS } from "./data";

export const FootballView = () => {
  return <PageDraggable items={FOOTBALL_ITEMS} title="futebol" />;
};
