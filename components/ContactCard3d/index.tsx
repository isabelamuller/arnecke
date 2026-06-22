"use client";

import { animate, motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

export const ContactCard3D = () => {
  const [isDragging, setIsDragging] = useState(false);

  const rotationY = useMotionValue(0);
  const rotationX = useMotionValue(0);

  const smoothRotationY = useSpring(rotationY, {
    stiffness: 130,
    damping: 22,
  });

  const smoothRotationX = useSpring(rotationX, {
    stiffness: 130,
    damping: 22,
  });

  const startX = useRef(0);
  const startY = useRef(0);
  const startRotationY = useRef(0);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;

    if (target.closest("a")) {
      return;
    }

    setIsDragging(true);

    startX.current = event.clientX;
    startY.current = event.clientY;
    startRotationY.current = rotationY.get();

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const deltaX = event.clientX - startX.current;
    const deltaY = event.clientY - startY.current;

    const nextRotationY = startRotationY.current + deltaX * 0.75;
    const nextRotationX = Math.max(Math.min(deltaY * -0.25, 30), -30);

    rotationY.set(nextRotationY);
    rotationX.set(nextRotationX);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);

    const currentRotationY = rotationY.get();
    const snappedRotationY = Math.round(currentRotationY / 180) * 180;

    animate(rotationY, snappedRotationY, {
      type: "spring",
      stiffness: 140,
      damping: 20,
    });

    animate(rotationX, 0, {
      type: "spring",
      stiffness: 140,
      damping: 20,
    });

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div className="flex min-h-[70svh] w-full flex-col items-center justify-center overflow-hidden px-4">
      <div
        className="relative aspect-[580/380] w-full max-w-[580px]"
        style={{
          perspective: "1200px",
        }}
      >
        <motion.div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="
            relative
            h-full
            w-full
            cursor-grab
            select-none
            touch-none
            active:cursor-grabbing
          "
          style={{
            rotateX: smoothRotationX,
            rotateY: smoothRotationY,
            transformStyle: "preserve-3d",
          }}
        >
          <div
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
              overflow-hidden
              bg-color-arnecke-white
              text-color-arnecke-black
            "
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            <div className="flex h-full flex-col items-center justify-between py-2 sm:py-3">
              <h1 className="font-helvetica text-center text-[clamp(24px,7vw,43px)] font-semibold uppercase italic leading-none">
                CONGRATULATIONS!!!
              </h1>
              <div className="mt-2 flex flex-col items-center sm:mt-4">
                <span className="font-helvetica text-[clamp(15px,4.8vw,30px)] uppercase leading-none text-color-arnecke-black">
                  you have just met another
                </span>
                <span className="font-denton text-[clamp(68px,23vw,140px)] uppercase leading-none text-color-arnecke-black">
                  circle
                </span>
              </div>
              <Image
                src="/images/logo-preto.png"
                alt="Arnecke logo"
                width={75}
                height={40}
                className="h-auto w-[clamp(54px,14vw,75px)]"
              />
            </div>
          </div>
          <div
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
              overflow-hidden
              border
              border-color-arnecke-blue
              bg-color-arnecke-white
              text-color-arnecke-black
            "
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className="relative h-full w-full overflow-hidden p-3 sm:p-5">
              <Image
                src="/images/assinatura-contato.PNG"
                alt="Arnecke assinatura"
                fill
                sizes="(max-width: 640px) 100vw, 580px"
                className="pointer-events-none absolute inset-0 z-0 object-cover sm:object-none"
              />
              <div className="relative z-10 flex h-full flex-col justify-between font-helvetica font-light">
                <div className="flex flex-col gap-1 text-[10px] italic leading-none sm:flex-row sm:justify-between sm:text-sm">
                  <a
                    href="https://www.instagram.com/arnecke.circle"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-20 pointer-events-auto hover:underline"
                  >
                    @arnecke.circle
                  </a>
                  <a
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-20 pointer-events-auto hover:underline"
                  >
                    www.arneckecircle.com.br
                  </a>
                  <a
                    href="mailto:team@arneckework.com"
                    className="relative z-20 pointer-events-auto hover:underline"
                  >
                    team@arneckework.com
                  </a>
                </div>
                <div className="flex w-full items-end">
                  <hr className="flex-1 border-t border-black sm:border-t-2" />
                  <Image
                    src="/images/logo-preto.png"
                    alt="Arnecke logo"
                    width={75}
                    height={40}
                    className="h-auto w-[clamp(54px,14vw,75px)] shrink-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <div className="mt-6 flex items-center justify-center gap-2 font-systemia text-[8px] uppercase tracking-[0.22em] opacity-60">
        <span>Arraste para girar</span>
      </div>
    </div>
  );
};
