export default function Home() {
  return (
    <div className="min-h-screen bg-[#0200F7]">
      <div className="relative flex items-center justify-center h-screen overflow-hidden">
        <video
          className="w-[400px] h-[400px] pointer-events-none mix-blend-screen"
          style={{
            filter: "brightness(0.95) contrast(1.1)",
            backgroundColor: "transparent",
          }}
          autoPlay
          loop
          muted
          playsInline
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
}
