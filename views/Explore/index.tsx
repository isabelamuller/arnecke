import { EXPLORE_ITEMS } from "./data";
import { PageView } from "../Page";

export const ExploreView = () => {
  return (
    <PageView
      title="Explorar"
      items={EXPLORE_ITEMS}
      borderedItems
      imageLayout="square-grid"
    />
  );
};
