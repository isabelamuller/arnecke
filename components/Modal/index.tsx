import { ReactNode, useEffect } from "react";

export interface IModalProps {
  children: ReactNode;
  isClosing: boolean;
  onClose: () => void;
}

export const Modal = ({ children, isClosing, onClose }: IModalProps) => {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  return (
    <aside className="fixed inset-0 z-[9999]">
      <button
        className={`absolute inset-0 bg-black/60 ${
          isClosing
            ? "animate-[fadeOut_0.3s_ease]"
            : "animate-[fadeIn_0.3s_ease]"
        }`}
        onClick={onClose}
      />
      <div className="pointer-events-none relative z-10 flex h-full items-stretch justify-center font-helvetica text-color-arnecke-blue md:items-center md:px-5 md:py-20">
        <div
          className={`pointer-events-auto relative grid h-screen w-screen grid-cols-12 content-start gap-5 overflow-hidden bg-color-arnecke-white p-5 pt-12 md:h-auto md:max-h-[86vh] md:w-full md:max-w-[800px] md:rounded md:p-6 lg:gap-2 ${
            isClosing
              ? "animate-[scaleOut_0.3s_ease]"
              : "animate-[scaleIn_0.3s_ease]"
          }`}
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-20 cursor-pointer text-sm font-bold uppercase text-color-arnecke-blue opacity-60 transition-colors hover:opacity-100"
          >
            ✕
          </button>
          {children}
        </div>
      </div>
    </aside>
  );
};
