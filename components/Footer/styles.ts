import classnames, {
  alignItems,
  cursor,
  display,
  flexDirection,
  gap,
  height,
  inset,
  margin,
  padding,
  position,
  textAlign,
  textTransform,
  transitionDuration,
  transitionProperty,
  translate,
  width,
} from "tailwindcss-classnames";

export const loadFooterStyles = () => ({
  wrapper: classnames(
    width("w-full"),
    padding("px-5", "py-10"),
    margin("mx-auto"),
    display("flex"),
    flexDirection("flex-col"),
    alignItems("items-center"),
    textAlign("text-center"),
    gap("gap-6"),
    "bg-color-arnecke-blue" as any,
    "text-color-arnecke-white" as any,
    "font-helvetica" as any,
    "max-w-[700px]" as any,
  ),
  logo: classnames("invert" as any),
  nav: classnames(
    display("flex"),
    alignItems("items-center"),
    gap("gap-4"),
    textTransform("uppercase"),
    "text-[12px]" as any,
  ),
  archiveButton: classnames(
    cursor("cursor-pointer"),
    transitionProperty("transition-opacity"),
    textTransform("uppercase"),
    "hover:opacity-60" as any,
  ),
  socialLink: classnames(
    display("flex"),
    alignItems("items-center"),
    gap("gap-2"),
    transitionProperty("transition-opacity"),
    "hover:opacity-60" as any,
  ),
  shopLink: classnames(
    transitionProperty("transition-opacity"),
    "hover:opacity-60" as any,
  ),
  divider: classnames(width("w-full"), height("h-px"), "bg-white/10" as any),
  credits: classnames(
    display("flex"),
    flexDirection("flex-col"),
    alignItems("items-center"),
    gap("gap-1"),
    "text-[11px]" as any,
    "text-white/50" as any,
  ),
  creditLink: classnames(
    transitionProperty("transition-colors"),
    "text-white/80" as any,
    "hover:text-white" as any,
  ),

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
