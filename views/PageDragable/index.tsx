"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { IPageItem } from "../Page/types";
import { Modal } from "@/components/Modal";
import { ModalContent } from "@/components/Modal/ModalContent";
import { useTickSound } from "@/utils/useSound";

import { InfiniteTile } from "./components/InfiniteTile";
import { MasonryPanel } from "./components/MasonryPanel";

import { useDraggablePanel } from "./hooks/useDraggablePanel";
import { useElementSize } from "./hooks/useElementSize";
import { useMeasuredImages } from "./hooks/useMeasuredImages";

import { GAP, REPEATED_TILES, TILE_GAP, TILE_WIDTH } from "./constants";
import { getImages, modulo } from "./utils";
import { IPageDraggableProps } from "./types";

export const PageDraggable = ({ items }: IPageDraggableProps) => {
  return (
    <Suspense fallback={null}>
      <PageDraggableContent items={items} />
    </Suspense>
  );
};

const PageDraggableContent = ({ items }: IPageDraggableProps) => {
  const sourceImages = useMemo(() => getImages(items), []);
  const measuredImages = useMeasuredImages(sourceImages);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const clickedItemRef = useRef<IPageItem | null>(null);

  const [selectedItem, setSelectedItem] = useState<IPageItem>();
  const [isClosing, setIsClosing] = useState(false);
  const [mounted, setMounted] = useState(false);

  const playTick = useTickSound();

  const {
    offset,
    isDragging,
    hasDraggedRef,
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

  useEffect(() => {
    if (!mounted) return;

    const itemSlug = searchParams.get("item");

    if (!itemSlug) {
      setSelectedItem(undefined);
      return;
    }

    const item = items.find((item) => item.slug === itemSlug);

    if (!item) return;

    setSelectedItem(item);
  }, [mounted, searchParams]);

  function updateUrlWithItem(item: IPageItem) {
    if (!item.slug) return;

    const params = new URLSearchParams(searchParams.toString());

    params.set("item", item.slug);

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  }

  function removeItemFromUrl() {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("item");

    const queryString = params.toString();

    router.push(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  }

  function openModal(item: IPageItem) {
    setSelectedItem(item);
    updateUrlWithItem(item);
    playTick();
  }

  function closeModal() {
    setIsClosing(true);
    removeItemFromUrl();
    playTick();

    setTimeout(() => {
      setSelectedItem(undefined);
      setIsClosing(false);
    }, 300);
  }

  function handlePanelPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    const target = event.target as HTMLElement;

    if (!target.closest("[data-draggable-image='true']")) {
      clickedItemRef.current = null;
    }

    handlePointerDown(event);
  }

  function handlePanelPointerUp(event: React.PointerEvent<HTMLDivElement>) {
    const itemToOpen = clickedItemRef.current;

    handlePointerUp(event);

    if (itemToOpen && !hasDraggedRef.current) {
      openModal(itemToOpen);
    }

    clickedItemRef.current = null;
  }

  if (!measuredImages.length) return null;

  return (
    <>
      <section
        className={[
          "relative h-screen w-screen overflow-hidden",
          "select-none touch-none",
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
                onImagePointerDown={(item) => {
                  clickedItemRef.current = item;
                }}
              />
            )),
          )}
        </div>
      </section>

      {mounted &&
        selectedItem &&
        createPortal(
          <Modal isClosing={isClosing} onClose={closeModal}>
            <ModalContent selectedItem={selectedItem} />
          </Modal>,
          document.body,
        )}
    </>
  );
};
