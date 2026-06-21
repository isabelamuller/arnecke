import { PageView } from "@/views/Page";
import { CROQUIS_ITEMS } from "./data";

export const CroquisView = () => {
  return (
    <PageView
      title="local"
      items={CROQUIS_ITEMS}
      imageLayout="masonry-grid"
      widthSize="entire"
      hasHoverImage
      isModal={false}
    />
  );
};
