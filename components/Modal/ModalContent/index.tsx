import { useTickSound } from "@/utils/useSound";
import Link from "next/link";
import { useState } from "react";
import { GoTriangleLeft, GoTriangleRight } from "react-icons/go";
import { IModalContentProps } from "./types";
import { loadModalContentStyles } from "./styles";
import { Parser } from "html-to-react";

export const ModalContent = ({ selectedItem }: IModalContentProps) => {
  const styles = loadModalContentStyles();
  const playTick = useTickSound();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState("50% 50%");
  const [isZooming, setIsZooming] = useState(false);

  const images = selectedItem.images ?? [];
  const hasMultipleImages = images.length > 1;
  const selectedImage = images[selectedImageIndex];

  if (!selectedImage) return null;

  function handleZoomMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (!isZooming) return;

    const bounds = event.currentTarget.getBoundingClientRect();

    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;

    setZoomOrigin(`${x}% ${y}%`);
  }

  function goToPreviousImage() {
    setSelectedImageIndex((currentIndex) =>
      currentIndex === 0 ? images.length - 1 : currentIndex - 1,
    );

    playTick();
  }

  function goToNextImage() {
    setSelectedImageIndex((currentIndex) =>
      currentIndex === images.length - 1 ? 0 : currentIndex + 1,
    );

    playTick();
  }

  function openImageModal() {
    setIsImageModalOpen(true);
    playTick();
  }

  function closeImageModal() {
    setIsImageModalOpen(false);
    setIsZooming(false);
    setZoomOrigin("50% 50%");
    playTick();
  }

  return (
    <>
      <div className={styles.rightWrapper}>
        <div className={styles.rightContent}>
          <div className={styles.images}>
            <button
              type="button"
              onClick={openImageModal}
              className={styles.imageButton}
            >
              <span className="absolute inset-0 opacity-50 text-[10px]">
                clique para dar zoom
              </span>
              <div className={styles.imageFrame}>
                <img
                  key={selectedImage.src}
                  src={selectedImage.src}
                  alt=""
                  className={styles.image}
                />
              </div>
            </button>
            {hasMultipleImages && (
              <div className={styles.buttons}>
                <button
                  type="button"
                  onClick={goToPreviousImage}
                  className={styles.button}
                >
                  <GoTriangleLeft />
                </button>
                <button
                  type="button"
                  onClick={goToNextImage}
                  className={styles.button}
                >
                  <GoTriangleRight />
                </button>
              </div>
            )}
          </div>
          {hasMultipleImages && (
            <div className={styles.bottomRightContent}>
              <span>
                {String(selectedImageIndex + 1).padStart(2, "0")} /{" "}
                {String(images.length).padStart(2, "0")}
              </span>

              <div className={styles.tinyImagesBottom}>
                {images.map((image, index) => (
                  <button
                    key={image.src}
                    type="button"
                    onClick={() => {
                      setSelectedImageIndex(index);
                      playTick();
                    }}
                    className={styles.tinyImageWrapper(
                      selectedImageIndex,
                      index,
                    )}
                  >
                    <img src={image.src} alt="" className={styles.tinyImage} />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={styles.leftWrapper}>
        <div className={styles.leftContent}>
          <div className="mb-5 border-b border-[#0200F7]/20 pb-3">
            <span className="mb-2 block font-helvetica text-[10px] uppercase tracking-[0.28em] opacity-60">
              {selectedItem?.eyebrow}
            </span>
            <h2 className="font-denton text-2xl font-bold uppercase leading-[0.85] tracking-[-0.04em] md:text-4xl">
              {selectedItem.title}
            </h2>
          </div>
          <div className="max-h-[24vh] overflow-y-auto pb-5 pr-1 text-justify md:max-h-[42vh]">
            <div className="font-helvetica text-xs leading-[1.85] tracking-[-0.01em] md:text-sm md:leading-[1.9]">
              {Parser().parse(selectedItem.description)}
            </div>
          </div>
          {(!!selectedItem.collection || !!selectedItem.year) && (
            <div className="grid grid-cols-2 gap-2 text-[10px] uppercase tracking-[0.18em] pt-4 mt-auto border-t border-[#0200F7]/20">
              {!!selectedItem.collection && (
                <div className="border-r border-current">
                  <span className="mb-1 block opacity-50">Coleção</span>
                  <Link
                    href={selectedItem.collection.link}
                    className="block normal-case tracking-normal underline-offset-4 hover:underline"
                  >
                    {selectedItem.collection.title}
                  </Link>
                </div>
              )}
              {!!selectedItem.year && (
                <div>
                  <span className="mb-1 block opacity-50">Ano</span>
                  <p className="normal-case tracking-normal">
                    {selectedItem.year}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {isImageModalOpen && (
        <div className={styles.zoomModalOverlay} onClick={closeImageModal}>
          <div
            className={styles.zoomModal}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeImageModal}
              className={styles.zoomModalClose}
            >
              fechar
            </button>
            <div
              className={styles.zoomModalImageWrapper(isZooming)}
              onMouseMove={handleZoomMouseMove}
              onClick={() => {
                setIsZooming((currentValue) => !currentValue);
                playTick();
              }}
            >
              <img
                src={selectedImage.src}
                alt=""
                className={styles.zoomModalImage}
                style={{
                  transformOrigin: zoomOrigin,
                  transform: isZooming ? "scale(3)" : "scale(1)",
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
