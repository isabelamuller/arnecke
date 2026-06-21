import { PageDraggable } from "../PageDragable";
import { FOOTBALL_ITEMS } from "./data";

export const FootballView = () => {
  return (
    <PageDraggable isModal={false} items={FOOTBALL_ITEMS} title="football" />
  );
};
