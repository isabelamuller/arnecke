"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { PageTitleSetter } from "@/components/PageTitleProvider";

import { getImages } from "../utils";
import { IPageDraggableProps } from "../types";
import { PageLoading } from "./PageLoading";

const INITIAL_REPEAT_COUNT = 4;
const REPEATS_PER_LOAD = 2;

function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    const image = new window.Image();

    image.onload = () => resolve();
    image.onerror = () => resolve();

    image.src = src;
  });
}

export const PageMasonry = ({ title, items }: IPageDraggableProps) => {
  const sourceImages = useMemo(() => getImages(items), [items]);

  const [isLoadingImages, setIsLoadingImages] = useState(true);
  const [repeatCount, setRepeatCount] = useState(INITIAL_REPEAT_COUNT);

  const loadMoreTriggerRef = useRef<HTMLDivElement | null>(null);
  const isAddingMoreRef = useRef(false);

  const imagesToWait = Math.min(sourceImages.length, 6);

  const repeatedImages = useMemo(() => {
    if (!sourceImages.length) {
      return [];
    }

    return Array.from({ length: repeatCount }).flatMap((_, repeatIndex) => {
      const shiftedImages = sourceImages.map((_, imageIndex) => {
        const shiftedIndex = (imageIndex + repeatIndex) % sourceImages.length;

        return sourceImages[shiftedIndex];
      });

      const imagesForRepeat =
        repeatIndex % 2 === 0 ? shiftedImages : [...shiftedImages].reverse();

      return imagesForRepeat.map((image) => ({
        ...image,
        repeatIndex,
      }));
    });
  }, [repeatCount, sourceImages]);

  useEffect(() => {
    let isCurrentLoad = true;

    async function loadInitialImages() {
      setRepeatCount(INITIAL_REPEAT_COUNT);

      if (!sourceImages.length) {
        setIsLoadingImages(false);
        return;
      }

      setIsLoadingImages(true);

      const priorityImages = sourceImages
        .slice(0, imagesToWait)
        .map((image) => preloadImage(image.src));

      await Promise.all(priorityImages);

      if (isCurrentLoad) {
        setIsLoadingImages(false);
      }
    }

    loadInitialImages();

    return () => {
      isCurrentLoad = false;
    };
  }, [sourceImages, imagesToWait]);

  useEffect(() => {
    const triggerElement = loadMoreTriggerRef.current;

    if (!triggerElement || !sourceImages.length) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || isAddingMoreRef.current) {
          return;
        }

        isAddingMoreRef.current = true;

        setRepeatCount((currentRepeatCount) => {
          return currentRepeatCount + REPEATS_PER_LOAD;
        });

        requestAnimationFrame(() => {
          isAddingMoreRef.current = false;
        });
      },
      {
        root: null,
        rootMargin: "1200px 0px",
        threshold: 0,
      },
    );

    observer.observe(triggerElement);

    return () => {
      observer.disconnect();
    };
  }, [sourceImages.length]);

  return (
    <>
      <PageTitleSetter title={title} />
      {isLoadingImages && <PageLoading />}
      <div
        className={[
          "min-h-screen w-full overflow-y-auto bg-color-arnecke-white px-3 py-3",
          "transition-opacity duration-500",
          isLoadingImages ? "opacity-0" : "opacity-100",
        ].join(" ")}
      >
        <div className="columns-2 gap-3 sm:columns-5">
          {repeatedImages.map((image, index) => (
            <figure
              key={`${image.src}-${image.slug || index}-${image.repeatIndex}`}
              className="mb-3 break-inside-avoid"
            >
              <img
                src={image.src}
                alt={image.title || ""}
                draggable={false}
                loading={index < imagesToWait ? "eager" : "lazy"}
                decoding="async"
                className="block h-auto w-full select-none object-contain"
              />
            </figure>
          ))}
        </div>
        <div ref={loadMoreTriggerRef} className="h-px w-full" />
      </div>
    </>
  );
};
