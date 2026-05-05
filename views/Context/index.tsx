import { PageView } from "../Page";
import { CONTEXT_ITEMS } from "./data";

export const ContextView = () => {
  return (
    <PageView
      title="Context"
      description="Context description"
      items={CONTEXT_ITEMS}
      squaredImages={false}
    />
  );
};
