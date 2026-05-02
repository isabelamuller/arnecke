import { PageView } from "@/views/Page";
import { CROQUIS_ITEMS } from "./data";

export const CroquisView = () => {
  return (
    <PageView
      title="Croquis"
      description="Croquis description"
      items={CROQUIS_ITEMS}
      widthSize="entire"
      squaredImages={false}
      hasHoverImage
    />
  );
};
