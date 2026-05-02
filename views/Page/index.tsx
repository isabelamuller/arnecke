"use client";

import { Layout } from "@/components/Layout";
import { IPageItem, IPageProps } from "./types";
import { loadPageStyles } from "./styles";
import { useTickSound } from "@/utils/useSound";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Modal } from "@/components/Modal";
import { ModalContent } from "@/components/Modal/ModalContent";
import { useRouter } from "next/navigation";

export const PageView = ({
  title,
  description,
  items,
  borderedItems = false,
  isModal = true,
  squaredImages = true,
  hoverLabel,
  widthSize = "entire",
  hasHoverImage = false,
}: IPageProps) => {
  const styles = loadPageStyles();
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<IPageItem>();
  const [isClosing, setIsClosing] = useState(false);
  const [mounted, setMounted] = useState(false);

  const playTick = useTickSound();

  useEffect(() => {
    isModal && setMounted(true);
  }, []);

  function openModal(item: IPageItem) {
    setSelectedItem(item);
    playTick();
  }

  function closeModal() {
    setIsClosing(true);

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
      <Layout widthSize={widthSize}>
        <div className={styles.wrapper}>
          <div className={styles.titleContent}>
            <h1 className={styles.title}>{title}</h1>
            <span>{description}</span>
          </div>
          {items?.map((item, index) => {
            const hasNavigation = !!item.link || !!item.slug;
            const shouldShowHoverImage =
              hasHoverImage && !!item.images?.[1]?.src;
            return (
              <div
                key={item.slug || item.link || index}
                onMouseEnter={playTick}
                onClick={() => handleItemClick(item)}
              >
                <div
                  className={styles.imageWrapper(borderedItems, squaredImages)}
                >
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
