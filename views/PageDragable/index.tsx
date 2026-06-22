"use client";

import { Suspense, useEffect, useMemo, useState } from "react";

import { InfiniteTile } from "./components/InfiniteTile";
import { MasonryPanel } from "./components/MasonryPanel";

import { useDraggablePanel } from "./hooks/useDraggablePanel";
import { useElementSize } from "./hooks/useElementSize";
import { useMeasuredImages } from "./hooks/useMeasuredImages";

import { GAP, REPEATED_TILES, TILE_GAP, TILE_WIDTH } from "./constants";
import { getImages, modulo } from "./utils";
import { IPageDraggableProps } from "./types";
import { PageTitleSetter } from "@/components/PageTitleProvider";
import {
  PageLoading,
  PageMobileMasonry,
  useIsMobile,
} from "./components/Mobile";

export const PageDraggable = ({ title, items }: IPageDraggableProps) => {
  return (
    <Suspense fallback={<PageLoading />}>
      <PageDraggableResponsive title={title} items={items} />
    </Suspense>
  );
};

const PageDraggableResponsive = ({ title, items }: IPageDraggableProps) => {
  const isMobile = useIsMobile();

  if (isMobile === null) {
    return <PageLoading />;
  }

  if (isMobile) {
    return <PageMobileMasonry title={title} items={items} />;
  }

  return <PageDraggableContent title={title} items={items} />;
};

const PageDraggableContent = ({ title, items }: IPageDraggableProps) => {
  const sourceImages = useMemo(() => getImages(items), [items]);
  const measuredImages = useMeasuredImages(sourceImages);

  const [mounted, setMounted] = useState(false);

  const {
    offset,
    isDragging,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  } = useDraggablePanel();

  const { elementRef, size } = useElementSize<HTMLDivElement>([measuredImages]);

  const tileWidth = size.width || TILE_WIDTH;
  const tileHeight = size.height ? size.height + GAP : 3000;

  const tileStepX = tileWidth + TILE_GAP;
  const tileStepY = tileHeight + TILE_GAP;

  const normalizedX = modulo(offset.x, tileStepX);
  const normalizedY = modulo(offset.y, tileStepY);
  const isLoading = !mounted || measuredImages.length === 0;

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-color-arnecke-white text-color-arnecke-black">
          <span className="font-systemia text-[10px] uppercase tracking-[0.3em]">
            Loading
          </span>
        </div>
      )}
      <PageTitleSetter title={title} />
      <section
        className={[
          "relative h-screen w-screen overflow-hidden",
          "select-none touch-none",
          "transition-opacity duration-500",
          isLoading ? "opacity-0" : "opacity-100",
          isDragging ? "cursor-grabbing" : "cursor-grab",
        ].join(" ")}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div
          ref={elementRef}
          className="pointer-events-none absolute left-0 top-0 opacity-0"
        >
          <MasonryPanel images={measuredImages} />
        </div>
        <div
          className="absolute left-0 top-0"
          style={{
            width: tileStepX,
            height: tileStepY,
            transform: `translate3d(${normalizedX - tileStepX}px, ${
              normalizedY - tileStepY
            }px, 0)`,
          }}
        >
          {REPEATED_TILES.map((tileX) =>
            REPEATED_TILES.map((tileY) => (
              <InfiniteTile
                key={`${tileX}-${tileY}`}
                tileX={tileX}
                tileY={tileY}
                tileWidth={tileWidth}
                tileHeight={tileHeight}
                tileStepX={tileStepX}
                tileStepY={tileStepY}
                images={measuredImages}
              />
            )),
          )}
        </div>
      </section>
    </>
  );
};
