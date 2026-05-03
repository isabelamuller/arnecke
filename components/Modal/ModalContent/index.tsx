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
              <img
                key={selectedImage.src}
                src={selectedImage.src}
                alt=""
                className={styles.image}
              />
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
          <h2 className="mb-2 font-denton text-md font-bold uppercase leading-[0.9]">
            {selectedItem.title}
          </h2>
          <div className="max-h-[24vh] overflow-y-auto pr-1 text-justify md:max-h-[42vh]">
            <p className="text-xs leading-[1.7] md:text-sm md:leading-[1.8]">
              {Parser().parse(selectedItem.description)}
            </p>
          </div>
          {(!!selectedItem.collection || !!selectedItem.year) && (
            <div className={styles.bottomLeftContent}>
              {!!selectedItem.collection && (
                <div className={styles.bottomLeftItem}>
                  <span>Coleção</span>
                  <Link href={selectedItem.collection.link}>
                    {selectedItem.collection.title}
                  </Link>
                </div>
              )}
              {!!selectedItem.year && (
                <div className={styles.bottomLeftItem}>
                  <span>Ano</span>
                  <p>{selectedItem.year}</p>
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
