"use client";
import { useState, useRef, useEffect } from "react";

export const HomepageView = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoStarted, setVideoStarted] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current
        .play()
        .then(() => setVideoStarted(true))
        .catch(() => setVideoStarted(false));
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0200F7]">
      <div className="relative flex items-center justify-center h-screen overflow-hidden">
        {!videoStarted && (
          <img
            src="/images/logo-branco-redondo.png"
            alt="Arnecke Logo"
            className="absolute w-[400px] h-[400px] object-contain"
          />
        )}
        <video
          ref={videoRef}
          onPlay={() => setVideoStarted(true)}
          className={`w-[400px] h-[400px] pointer-events-none mix-blend-screen transition-opacity duration-500 ${
            videoStarted ? "opacity-100" : "opacity-0"
          }`}
          style={{
            filter: "brightness(0.95) contrast(1.1)",
            backgroundColor: "transparent",
          }}
          loop
          muted
          playsInline
          disablePictureInPicture
          preload="auto"
        >
          <source src="/images/arnecke-logo-moving.webm" type="video/webm" />
          <source
            src="/images/arnecke-logo-moving-1.mov"
            type='video/quicktime; codecs="hvc1"'
          />
        </video>
      </div>
    </div>
  );
};
