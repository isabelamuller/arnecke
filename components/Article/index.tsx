export const CroquisView = () => {
  return (
    <article className="px-5 pt-20 pb-16 text-color-arnecke-white font-helvetica max-w-[1295px] mx-auto">
      <div className="mb-10 border-b border-white/15 pb-6 z-10">
        <p className="text-[10px] uppercase tracking-[0.35em] text-white/45 mb-3">
          Tag 1 / Tag 2 / Tag 3
        </p>
        <h1 className="uppercase text-[18vw] md:text-[90px] font-bold leading-[0.82] tracking-[-0.08em]">
          Croquis
        </h1>
        <p className="max-w-[360px] text-[15px] md:text-[16px] italic leading-relaxed text-white/70 md:text-right ml-auto">
          Textinho de descricao
        </p>
      </div>
      <section className="grid grid-cols-12">
        <div className="col-span-12">
          <p className="text-[20px] md:text-[32px] leading-[1.05] tracking-[-0.04em] uppercase font-bold">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
        <div className="col-span-12 my-6 text-[16px] md:text-[18px] leading-relaxed text-white/80 text-justify">
          <figure className="float-right w-[220px] md:w-[310px] ml-5 mb-3">
            <img
              src="/images/sketch-home.jpg"
              className="w-full object-cover grayscale-[15%]"
              alt=""
            />
            <figcaption className="mt-2 text-left text-[10px] uppercase tracking-[0.25em] text-white/40">
              Croqui legenda / 001
            </figcaption>
          </figure>
          <p>
            Pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
          <p>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
          <p>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua.
          </p>
          <p>
            Pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
          <p>
            Pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
          <p>
            Pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
          <p>
            Pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <figure className="col-span-12 md:col-span-6">
          <iframe
            data-testid="embed-iframe"
            src="https://open.spotify.com/embed/album/1lXY618HWkwYKJWBRYR4MK?utm_source=generator&theme=0"
            width="100%"
            height="352"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
          <figcaption className="mt-2 text-[10px] uppercase tracking-[0.25em] text-white/40">
            Spotify legenda / 002
          </figcaption>
        </figure>
        <div className="col-span-12 md:col-span-6 text-[16px] md:text-[18px] leading-relaxed text-white/80 text-justify ml-4">
          <p>
            Dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non.
          </p>
        </div>
        <div className="col-span-12 my-8 text-[16px] md:text-[18px] leading-relaxed text-white/80 text-justify">
          <figure className="float-left w-[240px] md:w-[360px] mr-5 mb-3">
            <img
              src="/images/sketch-home.jpg"
              className="w-full max-h-[620px] object-cover grayscale-[15%]"
              alt=""
            />
            <figcaption className="mt-2 text-[10px] uppercase tracking-[0.25em] text-white/40">
              Process image / 003
            </figcaption>
          </figure>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim pariatur.
          </p>
          <p>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua.
          </p>
          <p>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
          <div className="clear-both" />
        </div>
      </section>
    </article>
  );
};
