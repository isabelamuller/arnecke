"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";

import { IPageItem } from "../Page/types";

import { InfiniteTile } from "./components/InfiniteTile";
import { MasonryPanel } from "./components/MasonryPanel";

import { useDraggablePanel } from "./hooks/useDraggablePanel";
import { useElementSize } from "./hooks/useElementSize";
import { useMeasuredImages } from "./hooks/useMeasuredImages";

import { GAP, REPEATED_TILES, TILE_GAP, TILE_WIDTH } from "./constants";
import { getImages, modulo } from "./utils";
import { IPageDraggableProps } from "./types";
import { PageTitleSetter } from "@/components/PageTitleProvider";

export const PageDraggable = ({
  title,
  items,
  isModal = true,
}: IPageDraggableProps) => {
  return (
    <Suspense fallback={null}>
      <PageDraggableContent title={title} items={items} isModal={isModal} />
    </Suspense>
  );
};

const PageDraggableContent = ({
  title,
  items,
  isModal,
}: IPageDraggableProps) => {
  const sourceImages = useMemo(() => getImages(items), [items]);
  const measuredImages = useMeasuredImages(sourceImages);

  const clickedItemRef = useRef<IPageItem | null>(null);

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

  useEffect(() => {
    setMounted(true);
  }, []);

  const isLoading = !mounted || measuredImages.length === 0;

  function handlePanelPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    const target = event.target as HTMLElement;

    if (!target.closest("[data-draggable-image='true']")) {
      clickedItemRef.current = null;
    }

    handlePointerDown(event);
  }

  function handlePanelPointerUp(event: React.PointerEvent<HTMLDivElement>) {
    handlePointerUp(event);

    clickedItemRef.current = null;
  }

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
        onPointerDown={handlePanelPointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePanelPointerUp}
        onPointerCancel={handlePanelPointerUp}
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
