"use client";
import { useRef, useState } from "react";

type VideoBlockProps = {
  src: string;
  type: string;
};

const VideoBlock = ({ src, type }: VideoBlockProps) => {
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
    <section className="relative h-screen w-full overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className="h-full w-full object-contain md:object-cover"
      >
        <source src={src} type={type} />
      </video>
      <div className="absolute bottom-6 right-6 z-10 flex gap-3">
        <button
          type="button"
          onClick={handleToggleSound}
          className="rounded-full bg-black/50 px-5 py-3 text-sm uppercase tracking-[0.2em] text-white backdrop-blur"
        >
          {isMuted ? "ativar som" : "mudo"}
        </button>
        <button
          type="button"
          onClick={handleTogglePlay}
          className="rounded-full bg-black/50 px-5 py-3 text-sm uppercase tracking-[0.2em] text-white backdrop-blur"
        >
          {isPlaying ? "pausar" : "iniciar"}
        </button>
      </div>
    </section>
  );
};

export const CircleNumbersView = () => {
  return (
    <main className="pt-10">
      <VideoBlock
        src="/images/circle-numbers-video-compressed.mp4"
        type="video/mp4"
      />

      <img src="/images/circle-numbers-picture.png" alt="" className="w-full" />

      <VideoBlock src="/images/circlenumbers-video-2.mp4" type="video/mp4" />
    </main>
  );
};
