"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Language = "uk" | "es";

export default function Navbar() {
  const [language, setLanguage] = useState<Language>("uk");
  const [contactsOpen, setContactsOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("selah-language");

    if (saved === "uk" || saved === "es") {
      setLanguage(saved);
    }
  }, []);

  const changeLanguage = (value: Language) => {
    setLanguage(value);
    localStorage.setItem("selah-language", value);
    window.dispatchEvent(new Event("selah-language-changed"));
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6">

        {/* LOGO */}
        <Link
          href="/"
          className="text-sm font-medium uppercase tracking-[0.35em] transition hover:text-white/60"
        >
          SELAH
        </Link>

        {/* DESKTOP MENU */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/" className="text-sm text-white/60 hover:text-white">
            {language === "uk" ? "Головна" : "Inicio"}
          </Link>

          <Link href="/tshirts" className="text-sm text-white/60 hover:text-white">
            {language === "uk" ? "Футболки" : "Camisetas"}
          </Link>

          <Link href="/patches" className="text-sm text-white/60 hover:text-white">
            {language === "uk" ? "Патчі" : "Parches"}
          </Link>

          <Link href="/headwear" className="text-sm text-white/60 hover:text-white">
            {language === "uk" ? "Головні убори" : "Gorras"}
          </Link>
        </nav>

        {/* RIGHT */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* CONTACTS */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setContactsOpen(!contactsOpen)}
              className="flex h-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-3 sm:px-4 text-xs text-white/60 hover:border-white/40 hover:bg-white/10 hover:text-white"
            >
              <span className="hidden sm:inline">
                {language === "uk" ? "Контакти" : "Contacto"}
              </span>

              <span className="sm:hidden text-base">
                ☎
              </span>
            </button>

            {/* CONTACT PANEL */}
            {contactsOpen && (
              <div className="absolute right-0 top-12 w-[calc(100vw-32px)] max-w-72 rounded-2xl border border-white/10 bg-black p-5 shadow-2xl">

                <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                  SELAH
                </p>

                <h3 className="mt-3 text-lg text-white">
                  {language === "uk" ? "Контакти" : "Contacto"}
                </h3>

                <a
                  href="tel:+34641136326"
                  className="mt-5 block rounded-xl border border-white/10 bg-white/[0.03] p-3 hover:border-white/30 hover:bg-white/[0.07]"
                >
                  <p className="text-xs text-white/40">
                    {language === "uk" ? "Телефон" : "Teléfono"}
                  </p>

                  <p className="mt-1 text-sm text-white">
                    +34 641 136 326
                  </p>
                </a>

                <a
                  href="mailto:fomazorom1516@icloud.com"
                  className="mt-3 block rounded-xl border border-white/10 bg-white/[0.03] p-3 hover:border-white/30 hover:bg-white/[0.07]"
                >
                  <p className="text-xs text-white/40">
                    Email
                  </p>

                  <p className="mt-1 break-all text-sm text-white">
                    fomazorom1516@icloud.com
                  </p>
                </a>

              </div>
            )}
          </div>

          {/* LANGUAGE */}
          <div className="flex rounded-full border border-white/10 bg-white/[0.03] p-1">
            <button
              type="button"
              onClick={() => changeLanguage("uk")}
              className={`rounded-full px-3 py-1.5 text-[10px] ${
                language === "uk"
                  ? "bg-white text-black"
                  : "text-white/40 hover:text-white"
              }`}
            >
              UA
            </button>

            <button
              type="button"
              onClick={() => changeLanguage("es")}
              className={`rounded-full px-3 py-1.5 text-[10px] ${
                language === "es"
                  ? "bg-white text-black"
                  : "text-white/40 hover:text-white"
              }`}
            >
              ES
            </button>
          </div>

          {/* CART */}
          <Link
            href="/cart"
            aria-label="Кошик"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-lg hover:border-white/40 hover:bg-white/10"
          >
            🛒
          </Link>

        </div>
      </div>
    </header>
  );
}