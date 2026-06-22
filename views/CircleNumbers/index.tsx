"use client";

import { useRef, useState } from "react";

export const CircleNumbersView = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const handleTogglePlay = async () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      await videoRef.current.play();
      setIsPlaying(true);
      return;
    }

    videoRef.current.pause();
    setIsPlaying(false);
  };

  const handleToggleSound = () => {
    if (!videoRef.current) return;

    const nextMutedState = !videoRef.current.muted;

    videoRef.current.muted = nextMutedState;
    setIsMuted(nextMutedState);
  };

  return (
    <div className="pt-10 relative h-screen w-full overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className="h-full w-full md:object-cover object-contain"
      >
        <source
          src="/images/circle-numbers-video-compressed.mp4"
          type="video/mp4"
        />
      </video>
      <div className="absolute bottom-6 right-6 z-10 flex gap-3">
        <button
          type="button"
          onClick={handleToggleSound}
          className="rounded-full bg-black/50 px-5 py-3 text-sm uppercase tracking-[0.2em] text-white backdrop-blur"
        >
          {isMuted ? "ativar som" : "Mudo"}
        </button>
        <button
          type="button"
          onClick={handleTogglePlay}
          className="rounded-full bg-black/50 px-5 py-3 text-sm uppercase tracking-[0.2em] text-white backdrop-blur"
        >
          {isPlaying ? "pausar" : "iniciar"}
        </button>
      </div>
    </div>
  );
};
