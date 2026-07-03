"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";

export const PasswordView = () => {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsLoading(true);
    setErrorMessage("");

    const response = await fetch("/api/unlock", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    setIsLoading(false);

    if (!response.ok) {
      setErrorMessage("Senha incorreta.");
      return;
    }

    const nextPath =
      new URLSearchParams(window.location.search).get("next") || "/";

    window.location.href = nextPath;
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-color-arnecke-blue px-6 text-color-arnecke-black">
      <Image
        src="/images/logo-coming-soon.png"
        alt="Arnecke logo"
        width={200}
        height={200}
      />
      <section className="flex w-full max-w-sm flex-col items-center gap-8 text-center bg-color-arnecke-black p-2">
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3">
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Senha"
            className="
                  w-full
                  bg-color-arnecke-blue
                  px-4
                  py-3
                  font-helvetica
                  font-bold
                  text-[10px]
                  font
                  uppercase
                  outline-none
                  placeholder:text-color-arnecke-black
                  text-color-arnecke-black
                "
          />
          <button
            type="submit"
            disabled={isLoading}
            className="
                  w-full
                  bg-color-arnecke-black
                  cursor-pointer
                  px-4
                  py-3
                  font-helvetica
                  font-bold
                  text-[13px]
                  uppercase
                  text-color-arnecke-blue
                  transition-opacity
                  hover:opacity-80
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </button>
          {!!errorMessage && (
            <p className="font-helvetica text-xs uppercase tracking-[0.12em] text-red-600">
              {errorMessage}
            </p>
          )}
        </form>
      </section>
    </main>
  );
};
