import { PageDraggable } from "../PageDragable";
import { CONTEXT_ITEMS } from "./data";

export const ContextView = () => {
  return (
    <PageDraggable items={CONTEXT_ITEMS} title="context" isModal={false} />
  );
};
