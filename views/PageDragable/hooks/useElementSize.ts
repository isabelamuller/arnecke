import { useEffect, useRef, useState } from "react";
import { TSize } from "../types";

export function useElementSize<TElement extends HTMLElement>(
  dependencies: unknown[],
) {
  const elementRef = useRef<TElement | null>(null);
  const [size, setSize] = useState<TSize>({ width: 0, height: 0 });

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;

    function updateSize() {
      const elementBounds = element.getBoundingClientRect();
      const images = Array.from(element.querySelectorAll("img"));

      const visualBounds = images.reduce(
        (bounds, image) => {
          const imageBounds = image.getBoundingClientRect();

          return {
            width: Math.max(
              bounds.width,
              imageBounds.right - elementBounds.left,
            ),
            height: Math.max(
              bounds.height,
              imageBounds.bottom - elementBounds.top,
            ),
          };
        },
        {
          width: element.scrollWidth,
          height: element.scrollHeight,
        },
      );

      setSize({
        width: Math.ceil(visualBounds.width),
        height: Math.ceil(visualBounds.height),
      });
    }

    const updateAfterLayout = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(updateSize);
      });
    };

    updateAfterLayout();

    const resizeObserver = new ResizeObserver(updateAfterLayout);
    const mutationObserver = new MutationObserver(updateAfterLayout);

    resizeObserver.observe(element);

    mutationObserver.observe(element, {
      childList: true,
      subtree: true,
      attributes: true,
    });

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, dependencies);

  return {
    elementRef,
    size,
  };
}
