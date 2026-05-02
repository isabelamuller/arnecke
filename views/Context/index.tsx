import { CONTEXT_ITEMS } from "./data";
import { PageView } from "../Page";

export const ContextView = () => {
  return (
    <PageView
      title="Context"
      description="Context description"
      items={CONTEXT_ITEMS}
    />
  );
};
