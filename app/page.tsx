export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="relative flex items-center justify-center h-screen overflow-hidden">
        <video
          className="w-[400px] h-[400px] pointer-events-none"
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          preload="auto"
        >
          <source src="/images/arnecke-logo-moving-1.mov" type="video/mp4" />
          {/* <source
            src="/images/arnecke-logo-moving-1.mov"
            type="video/quicktime"
          /> */}
        </video>
      </div>
    </div>
  );
}
