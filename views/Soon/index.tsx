"use client";

import { FormEvent, useState } from "react";

export const ComingSoon = () => {
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
    <main className="flex min-h-screen w-full items-center justify-center bg-color-arnecke-white px-6 text-color-arnecke-blue">
      <section className="flex w-full max-w-sm flex-col items-center gap-8 text-center">
        <div>
          <h1 className="font-denton text-5xl uppercase leading-[0.85] tracking-[-0.04em] md:text-7xl">
            SOON
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3">
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Senha"
            className="
                  w-full
                  border
                  border-current
                  bg-transparent
                  px-4
                  py-3
                  font-systemia
                  text-[10px]
                  uppercase
                  tracking-[0.2em]
                  outline-none
                  placeholder:text-current
                  placeholder:opacity-40
                "
          />

          <button
            type="submit"
            disabled={isLoading}
            className="
                  w-full
                  border
                  border-current
                  bg-color-arnecke-blue
                  px-4
                  py-3
                  font-systemia
                  text-[10px]
                  uppercase
                  tracking-[0.2em]
                  text-color-arnecke-white
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
