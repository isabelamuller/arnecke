export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="relative flex items-center justify-center h-screen overflow-hidden">
        <div>
          <video width="400" height="400" preload="none" loop autoPlay muted>
            <source src="/images/arnecke-logo-moving.mov" type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
}
