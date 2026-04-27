"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { COMMUNITY_IMAGES } from "./dats";

export const CommunityView = () => {
  const randomized = useMemo(() => {
    const shuffled = [...COMMUNITY_IMAGES].sort(() => Math.random() - 0.5);

    return shuffled;
  }, []);

  return (
    <div className="font-helvetica px-5 mt-20 max-w-[1295px] mx-auto grid grid-cols-10 gap-5 lg:justify-items-start justify-items-center">
      <div className="col-span-10">
        <h1 className="uppercase text-[24px] font-bold leading-[1.3] tracking-wide">
          Community
        </h1>
        <p className="text-[16px] italic">textinho embaixo do titulo</p>
      </div>
      {randomized.map((image, index) => (
        <div className="lg:col-span-2 col-span-5">
          <Link
            key={index}
            href={image.link}
            target="_blank"
            className={`block hover:scale-105 transition-transform duration-300`}
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
      {/* <div className="col-span-12 grid grid-cols-12 gap-6">
        {randomized.map((image, index) => (
          <Link
            key={index}
            href={image.link}
            target="_blank"
            className={`block hover:scale-105 transition-transform duration-300 ${image.pattern}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={500}
              height={image.height}
              className="object-cover"
            />
          </Link>
        ))}
      </div> */}
    </div>
  );
};
