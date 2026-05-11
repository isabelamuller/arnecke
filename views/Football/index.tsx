import { PageView } from "../Page";
import { FOOTBALL_ITEMS } from "./data";

export const FootballView = () => {
  return (
    <PageView
      title="Football"
      items={FOOTBALL_ITEMS}
      imageLayout="horizontal-row"
      isScaleUpImage
    />
  );
};
