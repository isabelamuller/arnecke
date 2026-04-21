import { IoLogoInstagram } from "react-icons/io";

export const Footer = () => {
  return (
    <footer className="bg-color-arnecke-blue w-full h-16 flex items-center justify-center gap-1 flex-col mb-5">
      <a
        href="https://www.instagram.com/_arnecke/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <IoLogoInstagram size={20} />
      </a>
      <p className="text-sm text-color-arnecke-white">
        &copy; {new Date().getFullYear()} Arnecke. Todos os direitos reservados.
      </p>
      <p className="text-xs text-color-arnecke-white">
        Criado por{" "}
        <a
          href="https://www.linkedin.com/in/isabela-m%C3%BCllerrr/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-color-arnecke-white hover:underline"
        >
          Isa.
        </a>
      </p>
    </footer>
  );
};
