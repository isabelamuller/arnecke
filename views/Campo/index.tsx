import { PageDraggable } from "../PageDragable";
import { CONTEXT_ITEMS } from "./data";

export const CampoView = () => {
  return <PageDraggable items={CONTEXT_ITEMS} title="campo" isModal={false} />;
};
