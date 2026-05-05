declare module "*.mdx" {
  import type { ComponentType } from "react";

  const MDXComponents: ComponentType;

  export default MDXComponents;
}
