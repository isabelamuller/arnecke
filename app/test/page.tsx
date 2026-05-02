import { EXPLORE_ITEMS } from "@/views/Explore/data";
import { PageView } from "@/views/Page";

export default function Test() {
  return (
    <PageView
      title="context"
      description="All the refs."
      items={EXPLORE_ITEMS}
      borderedItems
    />
  );
}
