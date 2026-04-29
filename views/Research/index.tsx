"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { useTickSound } from "@/utils/useSound";

const RESEARCH_ITEMS = [
  {
    title: "Research 001",
    image: "/images/research/research-1.png",
    text: "Texto do research 001. Descricao.",
  },
  {
    title: "Research 002",
    image: "/images/research/research-2.jpg",
    text: "Texto do research 002. Descricao.",
  },
  {
    title: "Research 003",
    image: "/images/research/research-3.jpg",
    text: "Texto do research 003. Descricao.",
  },
  {
    title: "Research 004",
    image: "/images/research/research-4.jpg",
    text: "Texto do research 004. Descricao.",
  },
  {
    title: "Research 005",
    image: "/images/research/research-5.jpg",
    text: "Texto do research 005. Descricao.",
  },
];

export const ResearchView = () => {
  const [selectedItem, setSelectedItem] = useState<
    (typeof RESEARCH_ITEMS)[number] | null
  >(null);
  const playTick = useTickSound();
  const [isClosing, setIsClosing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function closeModal() {
    setIsClosing(true);

    setTimeout(() => {
      setSelectedItem(null);
      setIsClosing(false);
    }, 200);
  }

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedItem) closeModal();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedItem]);

  return (
    <>
      <section className="relative overflow-hidden text-color-arnecke-white font-helvetica px-5 pt-20 pb-20 max-w-[1295px] mx-auto">
        <div className="pointer-events-none absolute top-13 left-2 z-0 hidden md:block">
          <span className="text-[110px] uppercase font-bold text-white/[0.1] leading-none">
            research
          </span>
        </div>
        <div className="relative z-10 mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-5 border-b border-white/10 pb-5">
          <h1 className="uppercase text-[34px] md:text-[56px] font-bold tracking-[-0.04em] leading-none">
            Research
          </h1>
          <p className="max-w-[360px] text-[15px] md:text-[16px] italic leading-relaxed text-white/70 md:text-right">
            Textinho de descricao.
          </p>
        </div>
        <div className="relative z-10 grid grid-cols-10 gap-2 md:gap-3">
          {RESEARCH_ITEMS.map((item, index) => (
            <button
              key={item.title}
              type="button"
              onMouseEnter={playTick}
              onClick={() => setSelectedItem(item)}
              className="col-span-5 lg:col-span-2 text-left group cursor-pointer"
            >
              <div className="relative overflow-hidden bg-black aspect-[4/5]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 20vw"
                  className="object-cover grayscale-[18%] transition duration-500 ease-out md:group-hover:grayscale-0 md:group-hover:scale-[1.04] active:scale-[0.97]"
                />
                <div className="absolute inset-0 bg-black/10 md:group-hover:bg-black/30 transition duration-300" />
                <div className="absolute top-2 left-2">
                  <span className="text-[9px] uppercase tracking-[0.25em] text-white/60">
                    {String(index + 1).padStart(3, "0")}
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 flex justify-between items-center p-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition duration-300">
                  <span className="text-white text-[10px] uppercase tracking-[0.22em] font-medium">
                    Open research
                  </span>
                  <span className="text-white text-[12px] leading-none">+</span>
                </div>
              </div>
              <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-white/40">
                {item.title}
              </p>
            </button>
          ))}
        </div>
      </section>
      {mounted &&
        selectedItem &&
        createPortal(
          <aside className="fixed inset-0 z-[9999]">
            <div
              className={`absolute inset-0 bg-black/60 cursor-pointer ${
                isClosing
                  ? "animate-[fadeOut_0.3s_ease]"
                  : "animate-[fadeIn_0.3s_ease]"
              }`}
              onClick={closeModal}
            />
            <div className="relative z-10 h-full flex items-center justify-center px-5 py-20 text-color-arnecke-white font-helvetica pointer-events-none">
              <div
                onClick={(e) => e.stopPropagation()}
                className={`pointer-events-auto relative w-full max-w-[800px] bg-color-arnecke-blue p-6 md:p-10 grid grid-cols-12 gap-6 ${
                  isClosing
                    ? "animate-[scaleOut_0.3s_ease]"
                    : "animate-[scaleIn_0.3s_ease]"
                }`}
              >
                <button
                  type="button"
                  onClick={closeModal}
                  className="absolute top-4 right-4 cursor-pointer text-[10px] uppercase text-white/60 hover:text-white transition-colors"
                >
                  Close ✕
                </button>
                <div className="col-span-12 md:col-span-6">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    className="w-full max-w-[340px] h-auto object-contain grayscale-[10%]"
                  />
                </div>
                <div className="col-span-12 md:col-span-6">
                  <p className="text-[10px] uppercase tracking-[0.35em] text-white/45 mb-2">
                    Research
                  </p>
                  <h2 className="uppercase text-[24px] font-bold tracking-[-0.06em] leading-none mb-3">
                    {selectedItem.title}
                  </h2>
                  <p className="text-[16px] leading-relaxed text-white/75">
                    {selectedItem.text}
                  </p>
                </div>
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
          </aside>,
          document.body,
        )}
    </>
  );
};
