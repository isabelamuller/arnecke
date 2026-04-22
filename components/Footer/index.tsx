import Image from "next/image";
import { IoLogoInstagram } from "react-icons/io";

export const Footer = () => {
  return (
    <footer
      className={`w-full flex items-center gap-3 justify-center flex-col py-6 bg-color-arnecke-blue text-color-arnecke-white font-helvetica`}
    >
      <a
        href="https://www.instagram.com/_arnecke/"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:opacity-80 transition-opacity"
      >
        <IoLogoInstagram size={24} color="white" />
      </a>

      <div className="text-center flex flex-col items-center gap-2">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Arnecke. Todos os direitos
          reservados.
        </p>
        <p className="text-xs mt-1">
          Criado por{" "}
          <a
            href="https://www.linkedin.com/in/isabela-m%C3%BCllerrr/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold hover:underline"
          >
            Isa.
          </a>
        </p>
        <Image
          src="/images/signature.png"
          alt="Arnecke logo"
          width={100}
          height={40}
          className="invert"
        />
      </div>
    </footer>
  );
};
