import classnames, {
  alignItems,
  backgroundColor,
  cursor,
  display,
  flexDirection,
  fontFamily,
  fontSize,
  gap,
  height,
  inset,
  justifyContent,
  margin,
  opacity,
  padding,
  position,
  textAlign,
  textColor,
  textTransform,
  transitionDuration,
  transitionProperty,
  translate,
  width,
} from "tailwindcss-classnames";

export const loadFooterStyles = () => ({
  wrapper: (theme: "blue" | "white") =>
    classnames(
      width("w-full"),
      padding("px-5", "py-10"),
      margin("mx-auto"),
      display("flex"),
      flexDirection("flex-col"),
      alignItems("items-center"),
      textAlign("text-center"),
      gap("gap-2"),
      "font-helvetica" as any,
      theme === "blue"
        ? ("bg-color-arnecke-blue" as any)
        : "bg-color-arnecke-white",
      theme === "blue"
        ? ("text-color-arnecke-white" as any)
        : "text-color-arnecke-blue",
      "max-w-[700px]" as any,
    ),
  logo: classnames("invert" as any),
  nav: classnames(
    display("flex"),
    alignItems("items-center"),
    gap("gap-4"),
    textTransform("uppercase"),
    fontSize("text-sm"),
  ),
  archiveButton: classnames(
    cursor("cursor-pointer"),
    transitionProperty("transition-opacity"),
    textTransform("uppercase"),
    opacity("hover:opacity-60"),
  ),
  socialLink: classnames(
    display("flex"),
    alignItems("items-center"),
    gap("gap-2"),
    transitionProperty("transition-opacity"),
    opacity("hover:opacity-60"),
  ),
  shopLink: classnames(
    transitionProperty("transition-opacity"),
    opacity("hover:opacity-60"),
  ),
  divider: classnames(width("w-full"), height("h-px"), "bg-blue-500/10" as any),
  credits: classnames(
    display("flex"),
    flexDirection("flex-col"),
    alignItems("items-center"),
    gap("gap-1"),
    opacity("opacity-50"),
    "text-[11px]" as any,
  ),
  creditLink: classnames(transitionProperty("transition-colors")),
  archiveOverlay: (isArchiveOpen: boolean) =>
    classnames(
      position("fixed"),
      inset("inset-0"),
      transitionDuration("duration-300"),
      transitionProperty("transition-transform"),
      "z-[100]" as any,
      "transform" as any,
      "ease-in-out" as any,
      isArchiveOpen
        ? translate("translate-y-0")
        : translate("translate-y-full"),
    ),
});
