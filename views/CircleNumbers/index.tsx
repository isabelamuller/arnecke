"use client";
import { useRef, useState } from "react";
import {
  IoPauseOutline,
  IoPlayOutline,
  IoVolumeHighOutline,
  IoVolumeMuteOutline,
} from "react-icons/io5";
import { loadCircleNumbersStyles } from "./styles";

type VideoBlockProps = {
  src: string;
  type: string;
};

const VideoBlock = ({ src, type }: VideoBlockProps) => {
  const styles = loadCircleNumbersStyles();
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
    <section className={styles.wrapperVideo}>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className={styles.video}
      >
        <source src={src} type={type} />
      </video>
      <div className={styles.buttonWrapper}>
        <button
          type="button"
          onClick={handleToggleSound}
          className={styles.button}
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
          className={styles.button}
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
  const styles = loadCircleNumbersStyles();
  return (
    <div className={styles.pageWrapper}>
      <VideoBlock
        src="/images/circle-numbers-video-compressed.mp4"
        type="video/mp4"
      />
      <img src="/images/circle-numbers-picture.png" alt="" />
      <VideoBlock src="/images/circlenumbers-video-2.mp4" type="video/mp4" />
    </div>
  );
};
