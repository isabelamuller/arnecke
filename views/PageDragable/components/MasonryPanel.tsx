import { memo } from "react";
import { BalancedMasonryGrid, Frame } from "@masonry-grid/react";

import { FRAME_WIDTH, GAP, TILE_WIDTH } from "../constants";
import { TMeasuredImage } from "../types";
import { IPageItem } from "@/views/Page/types";

type TMasonryPanelProps = {
  images: TMeasuredImage[];
  onImagePointerDown?: (item: IPageItem) => void;
};

export const MasonryPanel = memo(function MasonryPanel({
  images,
  onImagePointerDown,
}: TMasonryPanelProps) {
  return (
    <div
      className="bg-color-arnecke-white text-color-arnecke-blue"
      style={{
        width: TILE_WIDTH,
        boxSizing: "border-box",
      }}
    >
      <BalancedMasonryGrid frameWidth={FRAME_WIDTH} gap={GAP}>
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
