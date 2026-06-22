import { useEffect, useMemo, useState } from "react";
import { IPageDraggableProps } from "../types";
import { PageTitleSetter } from "@/components/PageTitleProvider";
import { getImages } from "../utils";

const MOBILE_MEDIA_QUERY = "(max-width: 767px)";

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);

    function updateIsMobile() {
      setIsMobile(mediaQuery.matches);
    }

    updateIsMobile();

    mediaQuery.addEventListener("change", updateIsMobile);

    return () => {
      mediaQuery.removeEventListener("change", updateIsMobile);
    };
  }, []);

  return isMobile;
}

export const PageMobileMasonry = ({ title, items }: IPageDraggableProps) => {
  const sourceImages = useMemo(() => getImages(items), [items]);

  return (
    <>
      <PageTitleSetter title={title} />

      <main className="min-h-screen w-full overflow-y-auto bg-color-arnecke-white px-3 py-3">
        <div className="columns-2 gap-3">
          {sourceImages.map((image, index) => (
            <figure
              key={`${image.src}-${image.slug || index}`}
              className="mb-3 break-inside-avoid"
            >
              <img
                src={image.src}
                alt={image.title || ""}
                draggable={false}
                loading={index < 6 ? "eager" : "lazy"}
                decoding="async"
                className="block h-auto w-full select-none object-contain"
              />
            </figure>
          ))}
        </div>
      </main>
    </>
  );
};

export const PageLoading = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-color-arnecke-white text-color-arnecke-black">
      <span className="font-systemia text-[10px] uppercase tracking-[0.3em]">
        Loading
      </span>
    </div>
  );
};
