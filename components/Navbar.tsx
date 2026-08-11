"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Language = "uk" | "es";

export default function Navbar() {
  const [language, setLanguage] = useState<Language>("uk");
  const [contactsOpen, setContactsOpen] = useState(false);

  useEffect(() => {
    const updateLanguage = () => {
      const saved = localStorage.getItem("selah-language");

      if (saved === "uk" || saved === "es") {
        setLanguage(saved);
      }
    };

    updateLanguage();

    window.addEventListener(
      "selah-language-changed",
      updateLanguage
    );

    window.addEventListener(
      "language-changed",
      updateLanguage
    );

    window.addEventListener(
      "storage",
      updateLanguage
    );

    return () => {
      window.removeEventListener(
        "selah-language-changed",
        updateLanguage
      );

      window.removeEventListener(
        "language-changed",
        updateLanguage
      );

      window.removeEventListener(
        "storage",
        updateLanguage
      );
    };
  }, []);

  const changeLanguage = (value: Language) => {
    setLanguage(value);

    localStorage.setItem(
      "selah-language",
      value
    );

    window.dispatchEvent(
      new Event("selah-language-changed")
    );
  };

  return (
    <header
      className="
        fixed
        left-0
        right-0
        top-0
        z-[1000]
        border-b
        border-white/10
        bg-black/80
        backdrop-blur-xl
      "
    >
      <div
        className="
          mx-auto
          flex
          h-20
          max-w-7xl
          items-center
          justify-between
          gap-3
          px-3
          sm:px-6
        "
      >
        {/* LOGO */}

        <Link
          href="/"
          className="
            shrink-0
            text-sm
            font-medium
            uppercase
            tracking-[0.35em]
            transition
            hover:text-white/60
          "
        >
          SELAH
        </Link>

        {/* DESKTOP MENU */}

        <nav
          className="
            hidden
            items-center
            gap-6
            lg:flex
            xl:gap-8
          "
        >
          <Link
            href="/"
            className="text-sm text-white/60 hover:text-white"
          >
            {language === "uk"
              ? "Головна"
              : "Inicio"}
          </Link>

          <Link
            href="/tshirts"
            className="text-sm text-white/60 hover:text-white"
          >
            {language === "uk"
              ? "Футболки"
              : "Camisetas"}
          </Link>

          <Link
            href="/patches"
            className="text-sm text-white/60 hover:text-white"
          >
            {language === "uk"
              ? "Патчі"
              : "Parches"}
          </Link>

          <Link
            href="/headwear"
            className="text-sm text-white/60 hover:text-white"
          >
            {language === "uk"
              ? "Головні убори"
              : "Gorras"}
          </Link>
        </nav>

        {/* RIGHT */}

        <div
          className="
            flex
            shrink-0
            items-center
            gap-1.5
            sm:gap-3
          "
        >
          {/* CONTACTS */}

          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() =>
                setContactsOpen(!contactsOpen)
              }
              aria-label={
                language === "uk"
                  ? "Контакти"
                  : "Contacto"
              }
              className="
                flex
                h-10
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-white/10
                bg-white/[0.03]
                px-3
                text-xs
                text-white/60
                hover:border-white/40
                hover:bg-white/10
                hover:text-white
                sm:px-4
              "
            >
              <span className="hidden sm:inline">
                {language === "uk"
                  ? "Контакти"
                  : "Contacto"}
              </span>

              <span className="inline text-base sm:hidden">
                ☎
              </span>
            </button>

            {contactsOpen && (
              <div
                className="
                  absolute
                  right-0
                  top-12
                  w-[calc(100vw-24px)]
                  max-w-72
                  rounded-2xl
                  border
                  border-white/10
                  bg-black
                  p-5
                  shadow-2xl
                "
              >
                <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                  SELAH
                </p>

                <h3 className="mt-3 text-lg text-white">
                  {language === "uk"
                    ? "Контакти"
                    : "Contacto"}
                </h3>

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

          <div
            className="
              flex
              shrink-0
              rounded-full
              border
              border-white/10
              bg-white/[0.03]
              p-1
            "
          >
            <button
              type="button"
              onClick={() =>
                changeLanguage("uk")
              }
              className={`
                rounded-full
                px-2.5
                py-1.5
                text-[10px]
                sm:px-3
                ${
                  language === "uk"
                    ? "bg-white text-black"
                    : "text-white/40 hover:text-white"
                }
              `}
            >
              UA
            </button>

            <button
              type="button"
              onClick={() =>
                changeLanguage("es")
              }
              className={`
                rounded-full
                px-2.5
                py-1.5
                text-[10px]
                sm:px-3
                ${
                  language === "es"
                    ? "bg-white text-black"
                    : "text-white/40 hover:text-white"
                }
              `}
            >
              ES
            </button>
          </div>

          {/* CART */}

          <Link
            href="/cart"
            aria-label={
              language === "uk"
                ? "Кошик"
                : "Carrito"
            }
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