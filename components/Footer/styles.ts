import classnames, {
  alignItems,
  cursor,
  display,
  flexDirection,
  fontSize,
  gap,
  gridTemplateColumns,
  height,
  inset,
  justifyContent,
  letterSpacing,
  lineHeight,
  margin,
  maxWidth,
  opacity,
  padding,
  position,
  textAlign,
  textTransform,
  transitionDuration,
  transitionProperty,
  translate,
  width,
} from "tailwindcss-classnames";

export const loadFooterStyles = (theme: "blue" | "white") => ({
  wrapper: classnames(
    width("w-full"),
    margin("mx-auto"),
    padding("px-5", "py-10", "md:py-14"),
    display("flex"),
    justifyContent("justify-center"),
    "font-helvetica" as any,
    theme === "blue"
      ? ("bg-color-arnecke-blue" as any)
      : ("bg-color-arnecke-white" as any),
    theme === "blue"
      ? ("text-color-arnecke-white" as any)
      : ("text-color-arnecke-blue" as any),
  ),

  inner: classnames(
    width("w-full"),
    maxWidth("max-w-[600px]" as any),
    display("flex"),
    flexDirection("flex-col"),
    alignItems("items-center"),
    textAlign("text-center"),
    gap("gap-5"),
  ),
  topBar: classnames(
    width("w-full"),
    display("flex"),
    alignItems("items-center"),
    justifyContent("justify-center"),
    gap("gap-2", "md:gap-5"),
    textTransform("uppercase"),
    fontSize("text-[11px]" as any, "md:text-xs"),
    letterSpacing("tracking-[0.18em]" as any),
  ),
  navLink: classnames(
    cursor("cursor-pointer"),
    transitionProperty("transition-opacity"),
    transitionDuration("duration-300"),
    opacity("hover:opacity-50"),
    textTransform("uppercase"),
  ),
  socialLink: classnames(
    display("flex"),
    alignItems("items-center"),
    gap("gap-1"),
    cursor("cursor-pointer"),
    transitionProperty("transition-opacity"),
    transitionDuration("duration-300"),
    opacity("hover:opacity-50"),
  ),
  logoWrapper: classnames(
    width("w-full"),
    display("flex"),
    justifyContent("justify-center"),
  ),
  divider: classnames(
    width("w-full"),
    height("h-px"),
    theme === "blue" ? ("bg-white/20" as any) : ("bg-[#0200F7]/15" as any),
  ),
  credits: classnames(
    width("w-full"),
    display("flex"),
    flexDirection("flex-col", "md:flex-row"),
    alignItems("items-center"),
    justifyContent("justify-between"),
    gap("gap-1", "md:gap-4"),
    fontSize("text-[11px]" as any),
    opacity("opacity-50"),
  ),
  creditLink: classnames(
    transitionProperty("transition-opacity"),
    transitionDuration("duration-300"),
    opacity("hover:opacity-60"),
    "underline underline-offset-2" as any,
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
