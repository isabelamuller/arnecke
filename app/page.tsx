import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="relative flex items-center justify-center h-screen overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center animate-spin-slow">
          <Image
            src="/images/logo-separado-1.png"
            alt=""
            width={400}
            height={400}
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center animate-spin-reverse">
          <Image
            src="/images/logo-separado-2.png"
            alt=""
            width={400}
            height={400}
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center animate-spin-fast">
          <Image
            src="/images/logo-separado-3.png"
            alt=""
            width={400}
            height={400}
          />
        </div>
      </div>
    </div>
  );
}
