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

  // Закриття меню клавішею Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setContactsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const changeLanguage = (value: Language) => {
    setLanguage(value);
    localStorage.setItem("selah-language", value);

    window.dispatchEvent(
      new Event("selah-language-changed")
    );
  };

  return (
    <header className="sticky top-0 z-[1000] border-b border-white/10 bg-black/80 backdrop-blur-xl">

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

          <Link
            href="/"
            className="text-sm text-white/60 transition hover:text-white"
          >
            {language === "uk" ? "Головна" : "Inicio"}
          </Link>

          <Link
            href="/tshirts"
            className="text-sm text-white/60 transition hover:text-white"
          >
            {language === "uk" ? "Футболки" : "Polos"}
          </Link>

          <Link
            href="/patches"
            className="text-sm text-white/60 transition hover:text-white"
          >
            {language === "uk" ? "Патчі" : "Parches"}
          </Link>

          <Link
            href="/headwear"
            className="text-sm text-white/60 transition hover:text-white"
          >
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
              aria-expanded={contactsOpen}
              aria-label={
                language === "uk"
                  ? "Відкрити контакти"
                  : "Abrir contactos"
              }
              className="
                flex
                h-10
                items-center
                justify-center
                rounded-full
                border
                border-white/10
                bg-white/[0.03]
                px-3
                sm:px-4
                text-xs
                text-white/60
                transition
                hover:border-white/40
                hover:bg-white/10
                hover:text-white
              "
            >

              <span className="hidden sm:inline">
                {language === "uk"
                  ? "Контакти"
                  : "Contacto"}
              </span>

              <span className="sm:hidden text-base">
                ☎
              </span>

            </button>


            {/* CONTACT BACKDROP */}

            {contactsOpen && (
              <div
                className="
                  fixed
                  inset-0
                  z-[1000]
                  bg-black/50
                  backdrop-blur-[2px]
                "
                onClick={() => setContactsOpen(false)}
              />
            )}


            {/* CONTACT PANEL */}

            {contactsOpen && (
              <div
                className="
                  fixed
                  left-4
                  right-4
                  top-24
                  z-[1001]
                  max-h-[calc(100dvh-7rem)]
                  overflow-y-auto
                  rounded-2xl
                  border
                  border-white/10
                  bg-black
                  p-5
                  shadow-2xl

                  sm:left-auto
                  sm:right-6
                  sm:w-80

                  md:absolute
                  md:left-auto
                  md:right-0
                  md:top-12
                  md:w-72
                "
                onClick={(event) => event.stopPropagation()}
              >

                {/* PANEL HEADER */}

                <div className="flex items-start justify-between">

                  <div>

                    <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                      SELAH
                    </p>

                    <h3 className="mt-3 text-lg text-white">
                      {language === "uk"
                        ? "Контакти"
                        : "Contacto"}
                    </h3>

                  </div>


                  {/* CLOSE */}

                  <button
                    type="button"
                    onClick={() => setContactsOpen(false)}
                    aria-label={
                      language === "uk"
                        ? "Закрити"
                        : "Cerrar"
                    }
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/10
                      text-white/50
                      transition
                      hover:border-white/30
                      hover:bg-white/10
                      hover:text-white
                    "
                  >
                    ×
                  </button>

                </div>


                {/* PHONE */}

                <a
                  href="tel:+34641136326"
                  className="
                    mt-5
                    block
                    rounded-xl
                    border
                    border-white/10
                    bg-white/[0.03]
                    p-3
                    transition
                    hover:border-white/30
                    hover:bg-white/[0.07]
                  "
                >

                  <p className="text-xs text-white/40">
                    {language === "uk"
                      ? "Телефон"
                      : "Teléfono"}
                  </p>

                  <p className="mt-1 text-sm text-white">
                    +34 641 136 326
                  </p>

                </a>


                {/* EMAIL */}

                <a
                  href="mailto:fomazorom1516@icloud.com"
                  className="
                    mt-3
                    block
                    rounded-xl
                    border
                    border-white/10
                    bg-white/[0.03]
                    p-3
                    transition
                    hover:border-white/30
                    hover:bg-white/[0.07]
                  "
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
              className={`rounded-full px-2.5 py-1.5 text-[10px] transition sm:px-3 ${
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
              className={`rounded-full px-2.5 py-1.5 text-[10px] transition sm:px-3 ${
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
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              bg-white/[0.03]
              text-lg
              transition
              hover:border-white/40
              hover:bg-white/10
            "
          >
            🛒
          </Link>

        </div>

      </div>

    </header>
  );
}