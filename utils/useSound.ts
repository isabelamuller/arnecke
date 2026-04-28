"use client";

import { useRef } from "react";

export const useTickSound = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const play = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/sounds/mouse.mp3");
      audioRef.current.volume = 0.5;
    }

    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});
  };

  return play;
};
