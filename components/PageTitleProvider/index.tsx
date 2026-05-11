"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface IPageTitleContext {
  pageTitle: string;
  setPageTitle: (title: string) => void;
}

const PageTitleContext = createContext<IPageTitleContext | undefined>(
  undefined,
);

export const PageTitleProvider = ({ children }: { children: ReactNode }) => {
  const [pageTitle, setPageTitle] = useState("Arnecke");

  return (
    <PageTitleContext.Provider value={{ pageTitle, setPageTitle }}>
      {children}
    </PageTitleContext.Provider>
  );
};

export const usePageTitle = () => {
  const context = useContext(PageTitleContext);

  if (!context) {
    throw new Error("usePageTitle must be used inside PageTitleProvider");
  }

  return context;
};

export const PageTitleSetter = ({ title }: { title: string }) => {
  const { setPageTitle } = usePageTitle();

  useEffect(() => {
    setPageTitle(title);

    return () => {
      setPageTitle("");
    };
  }, [title, setPageTitle]);

  return null;
};
