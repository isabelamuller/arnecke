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
    <div className="font-helvetica px-5 mt-15 max-w-[1295px] mx-auto grid grid-cols-10 pb-10 gap-5">
      <div className="col-span-10">
        <h1 className="uppercase text-[24px] font-bold tracking-wide">
          Community
        </h1>
        <p className="text-[16px] italic">textinho embaixo do titulo</p>
      </div>
      {images.map((image) => (
        <div className="lg:col-span-2 col-span-5" key={image.alt}>
          <Link href={image.link} target="_blank" onMouseEnter={playTick}>
            <div className="relative group overflow-hidden">
              <Image
                src={image.src}
                alt={image.alt}
                width={300}
                height={729}
                className="object-cover w-full transition duration-300 group-hover:scale-105 group-hover:blur-[2px]"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition duration-300">
                <span className="text-color-arnecke-white opacity-0 group-hover:opacity-100 text-sm font-bold tracking-wide transition duration-300">
                  View post on Instagram
                </span>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};
