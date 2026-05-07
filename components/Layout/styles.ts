import classnames, {
  margin,
  maxWidth,
  minHeight,
  overflow,
  padding,
  position,
} from "tailwindcss-classnames";

export const loadLayoutStyles = () => ({
  wrapper: (
    widthSize: "full" | "medium" | "entire" | "article",
    theme: "blue" | "white",
  ) =>
    classnames(
      position("relative"),
      overflow("overflow-hidden"),
      minHeight("min-h-screen"),
      padding("py-20", "px-5"),
      margin("mx-auto"),
      theme === "blue"
        ? ("text-color-arnecke-white" as any)
        : ("text-color-arnecke-blue" as any),
      maxWidth(
        widthSize === "full"
          ? "max-w-7xl"
          : widthSize === "medium"
            ? "max-w-5xl"
            : widthSize === "article"
              ? "max-w-xl"
              : ("max-w-[1440px]" as any),
      ),
      "font-helvetica" as any,
    ),
});
