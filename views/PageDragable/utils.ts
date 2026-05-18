import { IMAGE_REPEAT_COUNT } from "./constants";
import { TImage, TMeasuredImage } from "./types";
import { IPageItem } from "../Page/types";

export function modulo(value: number, max: number) {
  return ((value % max) + max) % max;
}

export function getImages(items: IPageItem[]): TImage[] {
  const images = items
    .map((item) => {
      const image = item.images?.[0];

      if (!image?.src) return null;

      return {
        src: image.src,
        title: item.title,
        slug: item.slug,
        item,
      };
    })
    .filter(Boolean) as TImage[];

  if (!images.length) return [];

  return Array.from({ length: IMAGE_REPEAT_COUNT }).flatMap(
    (_, repeatIndex) => {
      const offset = (repeatIndex * 3) % images.length;

      const shiftedImages = images.map((_, imageIndex) => {
        const shiftedIndex = (imageIndex + offset) % images.length;

        return images[shiftedIndex];
      });

      return repeatIndex % 2 === 0
        ? shiftedImages
        : [...shiftedImages].reverse();
    },
  );
}

export function measureImage(sourceImage: TImage): Promise<TMeasuredImage> {
  return new Promise((resolve) => {
    const image = new window.Image();

    image.onload = () => {
      resolve({
        ...sourceImage,
        width: image.naturalWidth,
        height: image.naturalHeight,
      });
    };

    image.onerror = () => {
      resolve({
        ...sourceImage,
        width: 1,
        height: 1,
      });
    };

    image.src = sourceImage.src;
  });
}

export async function measureImages(images: TImage[]) {
  return Promise.all(images.map(measureImage));
}
