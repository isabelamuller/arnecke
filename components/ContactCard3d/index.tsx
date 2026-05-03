"use client";

import { animate, motion, useMotionValue, useSpring } from "framer-motion";
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
    <div className="flex min-h-[70vh] w-full flex-col items-center justify-center overflow-hidden px-4">
      <div
        className="relative aspect-[13/8] w-[520px] max-w-[88vw]"
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
            border
            border-color-arnecke-blue
            bg-color-arnecke-white
            p-5
            text-color-arnecke-blue
          "
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            <h1 className="font-denton text-[56px] uppercase leading-none tracking-[-0.06em] md:text-[110px]">
              Front
            </h1>
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
            p-5
            text-color-arnecke-blue
          "
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <h1 className="font-denton text-[56px] uppercase leading-none tracking-[-0.06em] md:text-[110px]">
              Back
            </h1>
          </div>
        </motion.div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 font-systemia text-[8px] uppercase tracking-[0.22em] opacity-60">
        <span>Drag to rotate</span>
      </div>
    </div>
  );
};
