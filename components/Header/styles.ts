import classnames, {
  alignItems,
  display,
  fontSize,
  grayscale,
  group,
  inset,
  justifyContent,
  opacity,
  padding,
  position,
  textTransform,
  transitionProperty,
  width,
  zIndex,
} from "tailwindcss-classnames";

export const loadHeaderStyles = () => ({
  wrapper: (theme: "blue" | "white") =>
    classnames(
      position("fixed"),
      inset("top-0", "left-0"),
      zIndex("z-50"),
      width("w-full"),
      theme === "blue"
        ? ("bg-color-arnecke-blue" as any)
        : ("bg-color-arnecke-white" as any),
      "font-systemia" as any,
      theme === "blue"
        ? ("text-color-arnecke-white" as any)
        : ("text-color-arnecke-blue" as any),
    ),
  content: classnames(
    position("relative"),
    display("flex"),
    alignItems("items-center"),
    justifyContent("justify-between"),
    width("w-full"),
    padding("px-4", "py-3"),
  ),
  logoWrapper: classnames(
    position("absolute"),
    inset("left-1/2"),
    group("group"),
    "-translate-x-1/2" as any,
  ),
  shopLink: classnames(
    display("hidden", "md:block"),
    fontSize("text-xs"),
    textTransform("uppercase"),
    display("flex"),
    alignItems("items-center"),
    transitionProperty("transition"),
    opacity("hover:opacity-60"),
    "tracking-[0.22em]" as any,
  ),
  blackLogo: classnames(
    position("relative"),
    grayscale("grayscale", "hover:grayscale-0"),
  ),
});
