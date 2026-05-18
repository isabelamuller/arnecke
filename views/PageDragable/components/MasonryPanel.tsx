import { memo, useEffect, useState } from "react";
import { BalancedMasonryGrid, Frame } from "@masonry-grid/react";

import { GAP, TILE_WIDTH } from "../constants";
import { TMeasuredImage } from "../types";
import { IPageItem } from "@/views/Page/types";

type TMasonryPanelProps = {
  images: TMeasuredImage[];
  onImagePointerDown?: (item: IPageItem) => void;
};

const DESKTOP_FRAME_WIDTH = 230;
const MOBILE_FRAME_WIDTH = 100;
const DESKTOP_MEDIA_QUERY = "(min-width: 768px)";

function useResponsiveFrameWidth() {
  const [frameWidth, setFrameWidth] = useState(MOBILE_FRAME_WIDTH);

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);

    function updateFrameWidth() {
      setFrameWidth(
        mediaQuery.matches ? DESKTOP_FRAME_WIDTH : MOBILE_FRAME_WIDTH,
      );
    }

    updateFrameWidth();

    mediaQuery.addEventListener("change", updateFrameWidth);

    return () => {
      mediaQuery.removeEventListener("change", updateFrameWidth);
    };
  }, []);

  return frameWidth;
}

export const MasonryPanel = memo(function MasonryPanel({
  images,
  onImagePointerDown,
}: TMasonryPanelProps) {
  const frameWidth = useResponsiveFrameWidth();

  return (
    <div
      style={{
        width: TILE_WIDTH,
        boxSizing: "border-box",
      }}
    >
      <BalancedMasonryGrid frameWidth={frameWidth} gap={GAP}>
        {images.map((image, index) => (
          <Frame
            key={`${image.src}-${image.slug}-${index}`}
            width={image.width}
            height={image.height}
          >
            <button
              type="button"
              data-draggable-image="true"
              onPointerDownCapture={() => onImagePointerDown?.(image.item)}
              className="group relative z-0 block h-full w-full cursor-pointer overflow-visible border-0 bg-transparent p-0 text-left hover:z-[999]"
            >
              <img
                src={image.src}
                alt={image.title}
                draggable={false}
                className="block h-full w-full object-contain transition-transform duration-300 ease-out group-hover:scale-[1.06]"
              />
            </button>
          </Frame>
        ))}
      </BalancedMasonryGrid>
    </div>
  );
});
