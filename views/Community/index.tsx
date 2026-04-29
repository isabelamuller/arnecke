"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { COMMUNITY_IMAGES, IComunnityImages } from "./data";
import { useTickSound } from "@/utils/useSound";

export const CommunityView = () => {
  const [images, setImages] = useState<IComunnityImages[]>([]);
  const playTick = useTickSound();

  useEffect(() => {
    const shuffled = [...COMMUNITY_IMAGES].sort(() => Math.random() - 0.5);
    setImages(shuffled);
  }, []);

  return (
    <section className="relative overflow-hidden text-color-arnecke-white font-helvetica px-5 pt-20 pb-20 max-w-[1295px] mx-auto">
      <div className="pointer-events-none absolute top-13 left-2 z-0 hidden md:block">
        <span className="text-[110px] uppercase font-bold text-white/[0.1] leading-none">
          COMMUNITY
        </span>
      </div>
      <div className="relative z-10 mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-5 border-b border-white/10 pb-5">
        <h1 className="uppercase text-[34px] md:text-[56px] font-bold tracking-[-0.04em] leading-none">
          Community
        </h1>
        <p className="max-w-[360px] text-[15px] md:text-[16px] italic leading-relaxed text-white/70 md:text-right">
          We just collect the evidence.
        </p>
      </div>
      <div className="relative z-10 grid grid-cols-10 gap-2 md:gap-3">
        {images.map((image, index) => (
          <div className="col-span-5 lg:col-span-2" key={image.alt}>
            <Link
              href={image.link}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playTick}
              className="block group"
            >
              <div className="relative overflow-hidden bg-black aspect-[4/5] transition duration-300">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 20vw"
                  className="object-cover grayscale-[18%] md:group-hover:grayscale-0 transition duration-500 ease-out md:group-hover:scale-[1.04] active:scale-[0.97]"
                />
                <div className="absolute inset-0 bg-black/5 md:group-hover:bg-black/25 transition duration-300" />
                <div className="absolute top-2 left-2">
                  <span className="text-[9px] uppercase tracking-[0.25em] text-white/60">
                    {String(index + 1).padStart(3, "0")}
                  </span>
                </div>
                <div className="hidden md:flex absolute inset-x-0 bottom-0 justify-between items-center p-3 opacity-0 group-hover:opacity-100 transition duration-300">
                  <span className="text-white text-[10px] uppercase tracking-[0.22em] font-medium">
                    View post on Instagram
                  </span>
                  <span className="text-white text-[12px] leading-none">↗</span>
                </div>
                <div className="absolute right-2 bottom-2 md:hidden opacity-75">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black/40 text-white text-[12px] backdrop-blur-sm">
                    ↗
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};
