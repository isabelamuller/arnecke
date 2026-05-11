import { PageView } from "../Page";
import { CONTEXT_ITEMS } from "./data";

export const ContextView = () => {
  return (
    <PageView
      title="Context"
      items={CONTEXT_ITEMS}
      imageLayout="masonry-grid"
      isScaleUpImage
    />
  );
};
