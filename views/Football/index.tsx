import { PageView } from "../Page";
import { FOOTBALL_ITEMS } from "./data";

export const FootballView = () => {
  return (
    <PageView
      title="Football"
      description="Football description"
      items={FOOTBALL_ITEMS}
      squaredImages={false}
    />
  );
};
