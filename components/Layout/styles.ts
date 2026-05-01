import classnames, {
  fontFamily,
  margin,
  maxWidth,
  overflow,
  padding,
  position,
  textColor,
} from "tailwindcss-classnames";

export const loadLayoutStyles = () => ({
  wrapper: (widthSize: "full" | "medium" | "narrow", theme: "blue" | "white") =>
    classnames(
      position("relative"),
      overflow("overflow-hidden"),
      theme === "blue"
        ? ("text-color-arnecke-white" as any)
        : "text-color-arnecke-blue",
      "font-helvetica" as any,
      padding("px-5", "pb-20"),
      "pt-24" as any,
      margin("mx-auto"),
      maxWidth(
        widthSize === "full"
          ? "max-w-7xl"
          : widthSize === "medium"
            ? "max-w-5xl"
            : "max-w-3xl",
      ),
    ),
});
