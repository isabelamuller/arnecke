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
        type="button"
        aria-label="Close modal"
        className={`absolute inset-0 bg-black/60 ${
          isClosing
            ? "animate-[fadeOut_0.3s_ease]"
            : "animate-[fadeIn_0.3s_ease]"
        }`}
        onClick={onClose}
      />
      <div className="pointer-events-none relative z-10 flex h-full items-center justify-center px-5 py-20 font-helvetica text-color-arnecke-blue">
        <div
          className={`justify-items-center pointer-events-auto relative grid w-full max-w-[800px] grid-cols-12 lg:gap-2 bg-color-arnecke-white p-6 ${
            isClosing
              ? "animate-[scaleOut_0.3s_ease]"
              : "animate-[scaleIn_0.3s_ease]"
          }`}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 cursor-pointer text-sm font-bold uppercase text-color-arnecke-blue opacity-60 transition-colors hover:opacity-100"
          >
            ✕
          </button>

          {children}
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.96);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes scaleOut {
          from {
            opacity: 1;
            transform: scale(1);
          }
          to {
            opacity: 0;
            transform: scale(0.96);
          }
        }
      `}</style>
    </aside>
  );
};
