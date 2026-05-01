"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { Layout } from "@/components/Layout";
import { useTickSound } from "@/utils/useSound";

import { Modal } from "@/components/Modal";
import { loadExploreStyles } from "./styles";
import { IResearchItem } from "../Research/types";
import { EXPLORE_ITEMS } from "./data";

export const ExploreView = () => {
  const styles = loadExploreStyles();
  const [selectedItem, setSelectedItem] = useState<IResearchItem>();
  const [isClosing, setIsClosing] = useState(false);
  const [mounted, setMounted] = useState(false);

  const playTick = useTickSound();

  useEffect(() => {
    setMounted(true);
  }, []);

  function openModal(item: IResearchItem) {
    setSelectedItem(item);
    playTick();
  }

  function closeModal() {
    setIsClosing(true);

    setTimeout(() => {
      setSelectedItem(undefined);
      setIsClosing(false);
    }, 300);
  }

  return (
    <>
      <Layout widthSize="narrow">
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <h1 className={styles.title}>Explore</h1>
            <p className={styles.description}>Escrever algo aqui.</p>
          </div>
          {EXPLORE_ITEMS.map((item, index) => (
            <div className={styles.item} key={index}>
              <button onMouseEnter={playTick} onClick={() => openModal(item)}>
                <div className={styles.imageWrapper}>
                  <img
                    src={item.image}
                    alt={item.title || ""}
                    className="h-full w-full object-cover"
                  />
                </div>
              </button>
            </div>
          ))}
        </div>
      </Layout>
      {mounted &&
        selectedItem &&
        createPortal(
          <Modal isClosing={isClosing} onClose={closeModal}>
            <div className="col-span-12 md:col-span-6">
              <img
                src={selectedItem.image}
                alt={selectedItem.title || ""}
                className="h-auto w-full max-w-[340px] object-contain grayscale-[10%]"
              />
            </div>
            <div className="col-span-12 md:col-span-6">
              <p className="mb-2 text-[10px] uppercase tracking-[0.35em] text-white/45">
                Research
              </p>
              <h2 className="mb-3 text-[24px] font-bold uppercase leading-none tracking-[-0.06em]">
                {selectedItem.title}
              </h2>
              <p className="text-[16px] leading-relaxed">
                {selectedItem.description}
              </p>
            </div>
          </Modal>,
          document.body,
        )}
    </>
  );
};
