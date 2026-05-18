import { useEffect, useState } from "react";
import { TImage, TMeasuredImage } from "../types";
import { measureImages } from "../utils";

export function useMeasuredImages(sourceImages: TImage[]) {
  const [measuredImages, setMeasuredImages] = useState<TMeasuredImage[]>([]);

  useEffect(() => {
    let isMounted = true;

    async function loadImages() {
      const loadedImages = await measureImages(sourceImages);

      if (!isMounted) return;

      setMeasuredImages(loadedImages);
    }

    loadImages();

    return () => {
      isMounted = false;
    };
  }, [sourceImages]);

  return measuredImages;
}
