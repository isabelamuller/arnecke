"use client";
import { useRef, useState } from "react";
import {
  IoPauseOutline,
  IoPlayOutline,
  IoVolumeHighOutline,
  IoVolumeMuteOutline,
} from "react-icons/io5";

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
    <section className="relative h-full w-full overflow-hidden">
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
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2 md:bottom-20">
        <button
          type="button"
          onClick={handleToggleSound}
          className="
       flex
      h-5
      w-5
      items-center
      justify-center
      rounded-full
            cursor-pointer
      bg-black/50
      text-white
      backdrop-blur
      transition-opacity
      md:h-auto
      md:w-auto
      md:p-3
      opacity-50
      hover:opacity-100
      transition-opacity
      duration-300
    "
        >
          {isMuted ? (
            <IoVolumeMuteOutline size={13} />
          ) : (
            <IoVolumeHighOutline size={13} />
          )}
        </button>

        <button
          type="button"
          onClick={handleTogglePlay}
          className="
      flex
      h-5
      w-5
      items-center
      justify-center
      rounded-full
            cursor-pointer
      bg-black/50
      text-white
      backdrop-blur
      transition-opacity
      hover:opacity-80
      md:h-auto
      md:w-auto
      md:p-3
  opacity-50
      hover:opacity-100
      transition-opacity
      duration-300
    "
        >
          {isPlaying ? (
            <IoPauseOutline size={13} />
          ) : (
            <IoPlayOutline size={13} />
          )}
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
