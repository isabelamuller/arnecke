"use client";

import Image from "next/image";
import { IoLogoInstagram, IoLogoWhatsapp } from "react-icons/io";
import { useState } from "react";

export const ContactView = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      setStatus("Preencha todos os campos obrigatórios.");
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("Mensagem enviada com sucesso!");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("Erro ao enviar. Tente novamente.");
      }
    } catch (err) {
      setStatus("Erro de conexão.");
    }

    setLoading(false);
  };

  return (
    <div className="font-helvetica px-5 mt-20 w-full max-w-[1295px] mx-auto flex gap-7 lg:pb-10">
      <Image
        src="/images/sketch-home.jpg"
        alt="Contact"
        width={600}
        height={400}
        priority
      />
      <div className="w-full flex flex-col justify-between">
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-4 pb-10"
        >
          <div className="flex flex-col">
            <h1 className="uppercase text-[24px] font-bold">contato</h1>
            <p className="text-[16px] italic">entre em contato conosco</p>
          </div>
          <input
            name="name"
            placeholder="Nome*"
            value={form.name}
            onChange={handleChange}
            className="border-b p-3 text-[14px]"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email*"
            value={form.email}
            onChange={handleChange}
            className="border-b p-3 text-[14px]"
            required
          />
          <textarea
            name="message"
            placeholder="Mensagem*"
            value={form.message}
            onChange={handleChange}
            className="border p-3 h-[120px] text-[14px]"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-color-arnecke-black text-color-arnecke-white p-3 cursor-pointer"
          >
            {loading ? "Enviando..." : "Enviar"}
          </button>
          {status && <p className="text-sm">{status}</p>}
        </form>
        <div className="flex flex-col gap-3 items-center mt-5">
          <span>Based in Novo Hamburgo, Rio Grande do Sul</span>
          <span>email@email.com</span>
          <div className="flex gap-3">
            <a
              href="https://www.instagram.com/_arnecke/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <IoLogoInstagram size={24} color="white" />
            </a>
            <a
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <IoLogoWhatsapp size={24} color="white" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
