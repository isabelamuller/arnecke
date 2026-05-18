import { memo } from "react";

import { MasonryPanel } from "./MasonryPanel";
import { TMeasuredImage } from "../types";
import { IPageItem } from "@/views/Page/types";

type TInfiniteTileProps = {
  tileX: number;
  tileY: number;
  tileWidth: number;
  tileHeight: number;
  tileStepX: number;
  tileStepY: number;
  images: TMeasuredImage[];
  onImagePointerDown: (item: IPageItem) => void;
};

export const InfiniteTile = memo(function InfiniteTile({
  tileX,
  tileY,
  tileWidth,
  tileHeight,
  tileStepX,
  tileStepY,
  images,
  onImagePointerDown,
}: TInfiniteTileProps) {
  return (
    <div
      className="absolute left-0 top-0"
      style={{
        width: tileWidth,
        height: tileHeight,
        transform: `translate3d(${tileX * tileStepX}px, ${
          tileY * tileStepY
        }px, 0)`,
      }}
    >
      <MasonryPanel images={images} onImagePointerDown={onImagePointerDown} />
    </div>
  );
});
