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

  const playTick = useTickSound();

  useEffect(() => {
    if (isModal) {
      setMounted(true);
    }
  }, [isModal]);

  useEffect(() => {
    if (!isModal || !mounted) return;

    const itemSlug = searchParams.get("item");

    if (!itemSlug) {
      setSelectedItem(undefined);
      return;
    }

    const item = items?.find((item) => item.slug === itemSlug);

    if (!item) return;

    setSelectedItem(item);
  }, [isModal, mounted, searchParams, items]);

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

  function handleItemClick(item: IPageItem) {
    playTick();

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
            const hasNavigation = !!item.link || !!item.slug;
            const shouldShowHoverImage =
              hasHoverImage && !!item.images?.[1]?.src;
            return (
              <div
                key={item.slug || item.link || index}
                className={styles.item}
                onMouseEnter={playTick}
                onClick={() => handleItemClick(item)}
              >
                <div className={styles.imageWrapper(borderedItems)}>
                  {!!item.images?.[0]?.src && (
                    <>
                      <img
                        src={item.images[0].src}
                        alt={item.title || ""}
                        className={styles.image(shouldShowHoverImage)}
                      />
                      {shouldShowHoverImage && (
                        <img
                          src={item.images[1].src}
                          alt={item.title || ""}
                          className={styles.hoverImage}
                        />
                      )}
                    </>
                  )}
                  {hasNavigation && !!hoverLabel && (
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
      {isModal &&
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
