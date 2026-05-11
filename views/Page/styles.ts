import classnames, {
  alignItems,
  cursor,
  display,
  gap,
  gridColumn,
  gridTemplateColumns,
  group,
  height,
  inset,
  justifyContent,
  objectFit,
  opacity,
  overflow,
  position,
  transitionDuration,
  transitionProperty,
  width,
  zIndex,
} from "tailwindcss-classnames";

import { TPageImageLayout } from "./types";

export const loadPageStyles = (
  imageLayout: TPageImageLayout,
  isScaleUpImage: boolean,
) => ({
  wrapper: classnames(
    zIndex("z-10"),
    gap("gap-2"),
    width("w-full"),
    imageLayout === "horizontal-row"
      ? classnames(display("flex"), "flex-wrap" as any)
      : classnames(
          display("grid"),
          gridTemplateColumns("grid-cols-3", "lg:grid-cols-5"),
        ),
  ),
  item: classnames(
    zIndex("z-0"),
    "hover:z-[999]" as any,
    imageLayout === "horizontal-row"
      ? ("basis-[calc((100%-16px)/3)] md:basis-auto shrink-0" as any)
      : gridColumn("col-span-1"),
  ),
  imageWrapper: (borderedItems: boolean) =>
    classnames(
      group("group"),
      cursor("cursor-pointer"),
      position("relative"),
      overflow("overflow-visible"),
      imageLayout === "square-grid" ? ("aspect-square" as any) : undefined,
      imageLayout === "horizontal-row"
        ? height("h-[160px]" as any, "md:h-[320px]" as any)
        : undefined,
      borderedItems ? ("border-1" as any) : undefined,
      borderedItems ? ("border-transparent" as any) : undefined,
      borderedItems ? ("hover:border-[#0200F7]" as any) : undefined,
    ),
  image: (hasHoverImage: boolean) =>
    classnames(
      transitionProperty("transition-all"),
      isScaleUpImage
        ? transitionDuration("duration-200")
        : transitionDuration("duration-300"),
      isScaleUpImage && ("lg:origin-center" as any),
      isScaleUpImage && ("lg:group-hover:scale-[1.]" as any),
      hasHoverImage && ("group-hover:opacity-0" as any),
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
            width("w-full"),
            objectFit("object-contain"),
          )
        : undefined,
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
