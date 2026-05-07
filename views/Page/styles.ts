import classnames, {
  alignItems,
  cursor,
  display,
  flexDirection,
  fontSize,
  gap,
  gridColumn,
  gridTemplateColumns,
  group,
  height,
  inset,
  justifyContent,
  justifySelf,
  lineHeight,
  margin,
  maxWidth,
  objectFit,
  opacity,
  overflow,
  position,
  textTransform,
  transitionDuration,
  transitionProperty,
  width,
  zIndex,
} from "tailwindcss-classnames";

import { TPageImageLayout } from "./types";

export const loadPageStyles = (imageLayout: TPageImageLayout) => ({
  wrapper: classnames(
    zIndex("z-10"),
    gap("gap-2"),
    width("w-full"),

    imageLayout === "horizontal-row"
      ? classnames(
          display("flex"),
          alignItems("items-start"),
          overflow("overflow-x-auto"),
        )
      : classnames(
          display("grid"),
          gridTemplateColumns("grid-cols-3", "lg:grid-cols-5"),
        ),
  ),

  item: classnames(
    imageLayout === "horizontal-row" ? ("shrink-0" as any) : undefined,
    imageLayout !== "horizontal-row" ? gridColumn("col-span-1") : undefined,
  ),

  titleContent: classnames(
    gridColumn("col-span-3", "lg:col-span-5"),
    margin("lg:mb-10", "mb-5"),
    display("flex"),
    flexDirection("flex-col"),
    alignItems("items-center"),
    width("w-full"),
    maxWidth("md:max-w-sm", "max-w-full"),
    justifySelf("justify-self-center"),
    "[&>span]:text-sm" as any,
    "[&>span]:italic" as any,
    "[&>span]:opacity-50" as any,
  ),

  title: classnames(
    textTransform("uppercase"),
    lineHeight("leading-none"),
    fontSize("text-4xl"),
    "tracking-[-0.04em]" as any,
    "font-denton" as any,
  ),

  imageWrapper: (borderedItems: boolean) =>
    classnames(
      group("group"),
      cursor("cursor-pointer"),
      position("relative"),
      overflow("overflow-hidden"),

      imageLayout === "square-grid" ? ("aspect-square" as any) : undefined,
      imageLayout === "horizontal-row" ? ("h-[360px]" as any) : undefined,

      borderedItems ? ("border-1" as any) : undefined,
      borderedItems ? ("border-transparent" as any) : undefined,
      borderedItems ? ("hover:border-[#0200F7]" as any) : undefined,
    ),

  image: (hasHoverImage: boolean) =>
    classnames(
      transitionProperty("transition-opacity"),
      transitionDuration("duration-300"),

      imageLayout === "square-grid"
        ? classnames(
            width("w-full"),
            height("h-full"),
            objectFit("object-cover"),
          )
        : undefined,

      imageLayout === "masonry-grid"
        ? classnames(width("w-full"), height("h-auto"))
        : undefined,

      imageLayout === "horizontal-row"
        ? classnames(
            height("h-full"),
            width("w-auto"),
            objectFit("object-contain"),
          )
        : undefined,

      hasHoverImage ? ("group-hover:opacity-0" as any) : undefined,
    ),

  hoverImage: classnames(
    position("absolute"),
    inset("inset-0"),
    opacity("opacity-0"),
    transitionProperty("transition-opacity"),
    transitionDuration("duration-300"),
    "group-hover:opacity-100" as any,

    imageLayout === "square-grid"
      ? classnames(width("w-full"), height("h-full"), objectFit("object-cover"))
      : undefined,

    imageLayout === "masonry-grid"
      ? classnames(width("w-full"), height("h-full"), objectFit("object-cover"))
      : undefined,

    imageLayout === "horizontal-row"
      ? classnames(
          height("h-full"),
          width("w-auto"),
          objectFit("object-contain"),
        )
      : undefined,
  ),

  imageHoverOverlay: classnames(
    position("absolute"),
    inset("inset-0"),
    display("flex"),
    alignItems("items-center"),
    justifyContent("justify-center"),
    opacity("opacity-0"),
    transitionProperty("transition-opacity"),
    transitionDuration("duration-300"),
    "bg-black/40" as any,
    "text-color-arnecke-white" as any,
    "group-hover:opacity-100" as any,
    "pointer-events-none" as any,
    "[&>span]:font-systemia" as any,
    "[&>span]:uppercase" as any,
    "[&>span]:text-[10px]" as any,
    "[&>span]:tracking-[0.24em]" as any,
    "[&>span]:mt-auto" as any,
    "[&>span]:p-2" as any,
  ),
});
