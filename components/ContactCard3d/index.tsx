"use client";

import { useTranslation } from "@/i18n/useTranslation";
import { animate, motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { loadContactCardStyles } from "./styles";

export const ContactCard3D = () => {
  const styles = loadContactCardStyles();
  const [isDragging, setIsDragging] = useState(false);
  const { t } = useTranslation();

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
    <div className={styles.wrapper}>
      <div
        className={styles.content}
        style={{
          perspective: "1200px",
        }}
      >
        <motion.div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className={styles.motion}
          style={{
            rotateX: smoothRotationX,
            rotateY: smoothRotationY,
            transformStyle: "preserve-3d",
          }}
        >
          <div
            className={styles.cardContent}
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            <div className={styles.frontWrapper}>
              <h1 className={styles.title}>CONGRATULATIONS!!!</h1>
              <div className={styles.descriptionWrapper}>
                <span className={styles.firstTextCopy}>
                  you have just met another
                </span>
                <span className={styles.secondTextCopy}>circle</span>
              </div>
              <Image
                src="/images/logo-preto.png"
                alt="Arnecke logo"
                width={75}
                height={40}
                className={styles.logoFront}
              />
            </div>
          </div>
          <div
            className={styles.cardContent}
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className={styles.backWrapper}>
              <Image
                src="/images/assinatura-contato.PNG"
                alt="Arnecke assinatura"
                fill
                sizes="(max-width: 640px) 100vw, 580px"
                className={styles.bgImage}
              />
              <div className={styles.linksWrapper}>
                <div className={styles.links}>
                  <a
                    href="https://www.instagram.com/arnecke.circle"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    @arnecke.circle
                  </a>
                  <a
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    www.arneckecircle.com.br
                  </a>
                  <a href="mailto:team@arneckework.com" className={styles.link}>
                    team@arneckework.com
                  </a>
                </div>
                <div className={styles.backLogoWrapper}>
                  <hr className={styles.border} />
                  <Image
                    src="/images/logo-preto.png"
                    alt="Arnecke logo"
                    width={75}
                    height={40}
                    className={styles.backLogo}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <div className={styles.dragToRotate}>
        <span>{t("Contact.dragToRotate")}</span>
      </div>
    </div>
  );
};
