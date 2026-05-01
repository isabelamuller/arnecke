"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { COMMUNITY_IMAGES, IComunnityImages } from "./data";
import { useTickSound } from "@/utils/useSound";
import { Layout } from "@/components/Layout";

export const CommunityView = () => {
  const [images, setImages] = useState<IComunnityImages[]>([]);
  const playTick = useTickSound();

  useEffect(() => {
    const shuffled = [...COMMUNITY_IMAGES].sort(() => Math.random() - 0.5);
    setImages(shuffled);
  }, []);

  return (
    <Layout widthSize="narrow">
      <div className="z-10 grid grid-cols-6 gap-2 lg:grid-cols-5">
        <div className="lg:col-span-5 col-span-6 flex flex-col items-center gap-1 mb-20">
          <h1 className="leading-none uppercase text-[34px] md:text-4xl font-bold tracking-[-0.04em] font-denton">
            Community
          </h1>
          <p className="max-w-[360px] text-sm italic leading-relaxed opacity-50 md:text-right">
            Escrever algo aqui.
          </p>
        </div>
        {images.map((item, index) => (
          <div className="lg:col-span-1 col-span-2 h-full" key={index}>
            <Link
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playTick}
              className="block group"
            >
              <div className="relative overflow-hidden bg-black transition duration-300">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="h-full w-full object-cover grayscale-[18%] transition duration-500 ease-out active:scale-[0.97] md:group-hover:scale-[1.04] md:group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-black/5 transition duration-300 md:group-hover:bg-black/25" />
                <div className="absolute top-2 left-2">
                  <span className="text-[9px] uppercase tracking-[0.25em] text-white/60">
                    {String(index + 1).padStart(3, "0")}
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 hidden items-center justify-between p-3 opacity-0 transition duration-300 group-hover:opacity-100 md:flex">
                  <span className="text-[8px] font-medium uppercase tracking-[0.22em] text-white">
                    View on Instagram
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  );
};
