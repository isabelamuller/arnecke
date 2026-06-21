"use client";

import { animate, motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { PiCursorClickLight } from "react-icons/pi";

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

    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return (
    <div className="flex min-h-[70vh] w-full flex-col items-center justify-center overflow-hidden">
      <div
        className="relative h-[380px] w-[580px]"
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
            <div className="flex flex-col items-center h-full justify-between py-2">
              <h1 className="font-helvetica italic font-semibold text-[43px] text-center uppercase leading-none">
                CONGRATULATIONS!!!
              </h1>
              <div className="flex flex-col items-center mt-4">
                <span className="font-helvetica uppercase text-color-arnecke-black leading-none text-[30px]">
                  you have just met another
                </span>
                <span className="font-denton uppercase text-color-arnecke-black leading-none text-[140px]">
                  circle
                </span>
              </div>
              <Image
                src="/images/logo-preto.png"
                alt="Arnecke logo"
                width={75}
                height={40}
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
            <div className="relative h-[380px] w-full overflow-hidden p-5">
              <Image
                src="/images/assinatura-contato.PNG"
                alt="Arnecke assinatura"
                fill
                sizes="100vw"
                className="absolute top-0 z-0 object-none"
              />

              <div className="relative z-10 flex h-full flex-col justify-between font-light font-helvetica">
                <div className="flex justify-between text-sm italic">
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
                  <hr className="flex-1 border-t-2 border-black" />

                  <Image
                    src="/images/logo-preto.png"
                    alt="Arnecke logo"
                    width={75}
                    height={40}
                    className="shrink-0"
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
