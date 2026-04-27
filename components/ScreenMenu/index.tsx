import { IoCloseOutline } from "react-icons/io5";

export interface IScreenMenuProps {
  onClose: () => void;
}

export const ScreenMenu = ({ onClose }: IScreenMenuProps) => {
  return (
    <div className="font-systemia uppercase fixed inset-0 z-[999] bg-color-arnecke-white pointer-events-auto">
      <button
        className="absolute top-0 right-0 cursor-pointer hover:opacity-50 transition-opacity"
        onClick={onClose}
      >
        <IoCloseOutline size={30} color="black" />
      </button>
      <ul className="mt-1 p-0 list-none">
        <li className="p-0 md:text-[7.8vw] text-[50px] md:leading-[0.75] leading-[0.8] w-fit">
          <a
            className="md:leading-[0.75] leading-[0.8] transition-colors md:leading-[0.75] leading-[0.8] duration-200 ease-in-out text-color-arnecke-black hover:!text-[#0200F7] cursor-pointer"
            href="/community"
          >
            Community
          </a>
        </li>
        <li className="md:text-[7.8vw] text-[50px] md:leading-[0.75] leading-[0.8] md:leading-[0.75] leading-[0.8] w-fit cursor-pointer">
          <a
            className="md:leading-[0.75] leading-[0.8] transition-colors duration-200 ease-in-out text-color-arnecke-black hover:!text-[#0200F7] h-fit cursor-pointer"
            href="/archive"
          >
            Explore
          </a>
        </li>
        <li className="md:text-[7.8vw] text-[50px] md:leading-[0.75] leading-[0.8] w-fit cursor-pointer">
          <a
            className="md:leading-[0.75] leading-[0.8] transition-colors duration-200 ease-in-out text-color-arnecke-black hover:!text-[#0200F7] h-fit cursor-pointer"
            href="/archive"
          >
            Research
          </a>
        </li>
        <li className="md:text-[7.8vw] text-[50px] md:leading-[0.75] leading-[0.8] w-fit cursor-pointer">
          <a
            className="md:leading-[0.75] leading-[0.8] transition-colors duration-200 ease-in-out text-color-arnecke-black hover:!text-[#0200F7] h-fit cursor-pointer"
            href="/archive"
          >
            Design
          </a>
        </li>
        <li className="md:text-[7.8vw] text-[50px] md:leading-[0.75] leading-[0.8] w-fit cursor-pointer">
          <a
            className="transition-colors duration-200 ease-in-out text-color-arnecke-black hover:!text-[#0200F7] h-fit cursor-pointer"
            href="/archive"
          >
            Football Photography
          </a>
        </li>
        <li className="md:text-[7.8vw] text-[50px] md:leading-[0.75] leading-[0.8] w-fit cursor-pointer">
          <a
            className="md:leading-[0.75] leading-[0.8] transition-colors duration-200 ease-in-out text-color-arnecke-black hover:!text-[#0200F7] h-fit cursor-pointer"
            href="/archive"
          >
            Football
          </a>
        </li>
        <li className="md:text-[7.8vw] text-[50px] md:leading-[0.75] leading-[0.8] w-fit cursor-pointer">
          <a
            className="md:leading-[0.75] leading-[0.8] transition-colors duration-200 ease-in-out text-color-arnecke-black hover:!text-[#0200F7] h-fit cursor-pointer"
            href="/archive"
          >
            Circle G
          </a>
        </li>
        <li className="md:text-[7.8vw] text-[50px] md:leading-[0.75] leading-[0.8] w-fit cursor-pointer">
          <a
            className="md:leading-[0.75] leading-[0.8] transition-colors duration-200 ease-in-out text-color-arnecke-black hover:!text-[#0200F7] h-fit cursor-pointer"
            href="/croquis"
          >
            Croquis
          </a>
        </li>
      </ul>
    </div>
  );
};
