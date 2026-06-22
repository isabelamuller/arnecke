"use client";

import { Layout } from "@/components/Layout";
import { IPageItem, IPageProps } from "./types";
import { loadPageStyles } from "./styles";
import { useTickSound } from "@/utils/useSound";
import { Suspense, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Modal } from "@/components/Modal";
import { ModalContent } from "@/components/Modal/ModalContent";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PageTitleSetter } from "@/components/PageTitleProvider";

export const PageView = (props: IPageProps) => {
  return (
    <Suspense fallback={null}>
      <PageViewContent {...props} />
    </Suspense>
  );
};

const PageViewContent = ({
  title,
  items,
  borderedItems = false,
  isModal = true,
  imageLayout,
  hoverLabel,
  widthSize = "entire",
  hasHoverImage = false,
  isScaleUpImage = false,
}: IPageProps) => {
  const styles = loadPageStyles(imageLayout, isScaleUpImage);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedItem, setSelectedItem] = useState<IPageItem>();
  const [isClosing, setIsClosing] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [activeHoverItemKey, setActiveHoverItemKey] = useState<string | null>(
    null,
  );

  const playTick = useTickSound();

  useEffect(() => {
    if (isModal && !hasHoverImage) {
      setMounted(true);
    }
  }, [isModal, hasHoverImage]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: none), (pointer: coarse)");

    function updateIsTouchDevice() {
      setIsTouchDevice(mediaQuery.matches);
    }

    updateIsTouchDevice();

    mediaQuery.addEventListener("change", updateIsTouchDevice);

    return () => {
      mediaQuery.removeEventListener("change", updateIsTouchDevice);
    };
  }, []);

  useEffect(() => {
    if (!isModal || hasHoverImage || !mounted) return;

    const itemSlug = searchParams.get("item");

    if (!itemSlug) {
      setSelectedItem(undefined);
      return;
    }

    const item = items?.find((item) => item.slug === itemSlug);

    if (!item) return;

    setSelectedItem(item);
  }, [isModal, hasHoverImage, mounted, searchParams, items]);

  function getItemKey(item: IPageItem, index: number) {
    return item.slug || item.link || `${item.title}-${index}`;
  }

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

    setTimeout(() => {
      setSelectedItem(undefined);
      setIsClosing(false);
    }, 300);
  }

  function handleItemClick(
    item: IPageItem,
    index: number,
    shouldShowHoverImage: boolean,
  ) {
    playTick();

    if (shouldShowHoverImage) {
      const itemKey = getItemKey(item, index);

      setActiveHoverItemKey((currentKey) =>
        currentKey === itemKey ? null : itemKey,
      );

      return;
    }

    if (isModal) {
      openModal(item);
      return;
    }

    if (item.link) {
      window.open(item.link, "_blank", "noopener,noreferrer");
      return;
    }

    if (item.slug) {
      router.push(item.slug);
    }
  }

  return (
    <>
      <PageTitleSetter title={title} />
      <Layout widthSize={widthSize}>
        <div className={styles.wrapper}>
          {items?.map((item, index) => {
            const itemKey = getItemKey(item, index);
            const hasNavigation = !!item.link || !!item.slug;
            const shouldShowHoverImage =
              hasHoverImage && !!item.images?.[1]?.src;
            const isHoverImageActive =
              isTouchDevice && activeHoverItemKey === itemKey;
            return (
              <div
                key={itemKey}
                className={styles.item}
                onMouseEnter={() => {
                  if (!isTouchDevice) {
                    playTick();
                  }
                }}
                onClick={() =>
                  handleItemClick(item, index, shouldShowHoverImage)
                }
              >
                <div className={styles.imageWrapper(borderedItems)}>
                  {!!item.images?.[0]?.src && (
                    <>
                      <img
                        src={item.images[0].src}
                        alt={item.title || ""}
                        className={[
                          styles.image(shouldShowHoverImage),
                          isHoverImageActive ? "!opacity-0" : "",
                        ].join(" ")}
                      />
                      {shouldShowHoverImage && (
                        <img
                          src={item.images[1].src}
                          alt={item.title || ""}
                          className={[
                            styles.hoverImage,
                            isHoverImageActive ? "!opacity-100" : "",
                          ].join(" ")}
                        />
                      )}
                    </>
                  )}
                  {!shouldShowHoverImage && hasNavigation && !!hoverLabel && (
                    <div className={styles.imageHoverOverlay}>
                      <span>{hoverLabel}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Layout>
      {!hasHoverImage &&
        isModal &&
        mounted &&
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
