"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { GoTriangleRight, GoTriangleLeft } from "react-icons/go";
import { Layout } from "@/components/Layout";
import { useTickSound } from "@/utils/useSound";

import { Modal } from "@/components/Modal";
import { loadExploreStyles } from "./styles";
import { EXPLORE_ITEMS, IExploreItem } from "./data";

export const ExploreView = () => {
  const styles = loadExploreStyles();

  const [selectedItem, setSelectedItem] = useState<IExploreItem>();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const [mounted, setMounted] = useState(false);

  const playTick = useTickSound();

  useEffect(() => {
    setMounted(true);
  }, []);

  function openModal(item: IExploreItem) {
    setSelectedItem(item);
    setSelectedImageIndex(0);
    playTick();
  }

  function closeModal() {
    setIsClosing(true);

    setTimeout(() => {
      setSelectedItem(undefined);
      setSelectedImageIndex(0);
      setIsClosing(false);
    }, 300);
  }

  function goToPreviousImage() {
    if (!selectedItem) return;

    setSelectedImageIndex((currentIndex) =>
      currentIndex === 0 ? selectedItem.images.length - 1 : currentIndex - 1,
    );

    playTick();
  }

  function goToNextImage() {
    if (!selectedItem) return;

    setSelectedImageIndex((currentIndex) =>
      currentIndex === selectedItem.images.length - 1 ? 0 : currentIndex + 1,
    );

    playTick();
  }

  const hasMultipleImages = selectedItem && selectedItem.images.length > 1;
  const selectedImage = selectedItem?.images[selectedImageIndex];

  return (
    <>
      <Layout widthSize="narrow">
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <h1 className={styles.title}>Explore</h1>
            <p className={styles.description}>Escrever algo aqui.</p>
          </div>

          {EXPLORE_ITEMS.map((item, index) => (
            <div className={styles.item} key={index}>
              <button onMouseEnter={playTick} onClick={() => openModal(item)}>
                <div className={styles.imageWrapper}>
                  <img
                    src={item.images[0].src}
                    alt={item.title || ""}
                    className="h-full w-full object-cover"
                  />
                </div>
              </button>
            </div>
          ))}
        </div>
      </Layout>

      {mounted &&
        selectedItem &&
        selectedImage &&
        createPortal(
          <Modal isClosing={isClosing} onClose={closeModal}>
            <div className="col-span-12 md:col-span-5">
              <div className="flex h-full flex-col gap-4">
                <div className="relative flex items-center justify-center overflow-hidden p-5 aspect-square">
                  <img
                    key={selectedImage.src}
                    src={selectedImage.src}
                    alt={selectedItem.title || ""}
                    className="max-h-[50vh] w-full max-w-[400px] object-contain grayscale-[8%]"
                  />
                  {hasMultipleImages && (
                    <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between">
                      <button
                        type="button"
                        onClick={goToPreviousImage}
                        className="pointer-events-auto flex h-9 w-9 cursor-pointer items-center justify-center text-color-arnecke-blue transition-all hover:scale-105 hover:opacity-80"
                      >
                        <GoTriangleLeft />
                      </button>
                      <button
                        type="button"
                        onClick={goToNextImage}
                        className="pointer-events-auto flex h-9 w-9 cursor-pointer items-center justify-center text-color-arnecke-blue transition-all hover:scale-105 hover:opacity-80"
                      >
                        <GoTriangleRight />
                      </button>
                    </div>
                  )}
                </div>
                {hasMultipleImages && (
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-color-arnecke-blue/60">
                      {String(selectedImageIndex + 1).padStart(2, "0")} /{" "}
                      {String(selectedItem.images.length).padStart(2, "0")}
                    </p>
                    <div className="flex items-center gap-2">
                      {selectedItem.images.map((image, index) => (
                        <button
                          key={image.src}
                          type="button"
                          onClick={() => {
                            setSelectedImageIndex(index);
                            playTick();
                          }}
                          className={`h-10 w-8 cursor-pointer overflow-hidden border transition-all ${
                            selectedImageIndex === index
                              ? "border-color-arnecke-blue opacity-100"
                              : "border-transparent opacity-45 hover:opacity-80"
                          }`}
                          aria-label={`Ir para imagem ${index + 1}`}
                        >
                          <img
                            src={image.src}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="col-span-12 md:col-span-6">
              <h2 className="mb-5 text-md font-bold uppercase leading-[0.85] tracking-[-0.07em] text-color-arnecke-blue">
                {selectedItem.title}
              </h2>
              <p className="text-sx leading-relaxed">
                {selectedItem.description}
              </p>
            </div>
          </Modal>,
          document.body,
        )}
    </>
  );
};
