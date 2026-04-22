export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="relative flex items-center justify-center h-screen overflow-hidden">
        <video
          className="w-[400px] h-[400px]"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src="/images/arnecke-logo-moving.mov" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
