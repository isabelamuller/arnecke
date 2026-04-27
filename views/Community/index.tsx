"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { COMMUNITY_IMAGES, IComunnityImages } from "./data";

export const CommunityView = () => {
  const [images, setImages] = useState<IComunnityImages[]>([]);

  useEffect(() => {
    const shuffled = [...COMMUNITY_IMAGES].sort(() => Math.random() - 0.5);
    setImages(shuffled);
  }, []);

  return (
    <div className="font-helvetica px-5 mt-20 max-w-[1295px] mx-auto grid grid-cols-10 gap-5 lg:justify-items-start justify-items-center">
      <div className="col-span-10">
        <h1 className="uppercase text-[24px] font-bold leading-[1.3] tracking-wide">
          Community
        </h1>
        <p className="text-[16px] italic">textinho embaixo do titulo</p>
      </div>
      {images.map((image, index) => (
        <div className="lg:col-span-2 col-span-5" key={index}>
          <Link
            href={image.link}
            target="_blank"
            className="block hover:scale-105 hover:opacity-90 transition-transform transition-opacity duration-300"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={300}
              height={729}
              className="object-cover"
            />
          </Link>
        </div>
      ))}
    </div>
  );
};
