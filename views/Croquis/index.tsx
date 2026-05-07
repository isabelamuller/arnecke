import { PageView } from "@/views/Page";
import { CROQUIS_ITEMS } from "./data";

export const CroquisView = () => {
  return (
    <PageView
      title="Croquis"
      items={CROQUIS_ITEMS}
      imageLayout="masonry-grid"
      widthSize="entire"
      hasHoverImage
    />
  );
};
