import { EXPLORE_ITEMS } from "./data";
import { PageView } from "../Page";

export const ExploreView = () => {
  return (
    <PageView
      title="Explore"
      description="Explore description"
      items={EXPLORE_ITEMS}
      borderedItems
      squaredImages
    />
  );
};
