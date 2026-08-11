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

      setLanguage(saved === "es" ? "es" : "uk");
    };

    updateLanguage();

    window.addEventListener("selah-language-changed", updateLanguage);
    window.addEventListener("language-changed", updateLanguage);
    window.addEventListener("storage", updateLanguage);

    return () => {
      window.removeEventListener(
        "selah-language-changed",
        updateLanguage
      );
      window.removeEventListener(
        "language-changed",
        updateLanguage
      );
      window.removeEventListener("storage", updateLanguage);
    };
  }, []);

  const changeLanguage = (value: Language) => {
    setLanguage(value);
    localStorage.setItem("selah-language", value);
    window.dispatchEvent(new Event("selah-language-changed"));
  };

  const isUk = language === "uk";

  return (
    <header className="fixed left-0 right-0 top-0 z-[1000] border-b border-white/10 bg-black/80 backdrop-blur-xl">

      <div className="selah-navbar-inner mx-auto flex h-20 max-w-7xl items-center px-3 sm:px-6">

        {/* LOGO */}

        <Link
          href="/"
          className="selah-logo shrink-0 text-sm font-medium uppercase tracking-[0.35em] transition hover:text-white/60"
        >
          SELAH
        </Link>

        {/* MENU */}

        <nav className="selah-menu flex items-center">

          <Link href="/" className="selah-menu-link">
            {isUk ? "Головна" : "Inicio"}
          </Link>

          <Link href="/tshirts" className="selah-menu-link">
            {isUk ? "Футболки" : "Camisetas"}
          </Link>

          <Link href="/patches" className="selah-menu-link">
            {isUk ? "Патчі" : "Parches"}
          </Link>

          <Link href="/headwear" className="selah-menu-link">
            {isUk ? "Головні убори" : "Gorras"}
          </Link>

        </nav>

        {/* RIGHT */}

        <div className="selah-right flex shrink-0 items-center">

          {/* CONTACTS */}

          <div className="relative">

            <button
              type="button"
              onClick={() => setContactsOpen((v) => !v)}
              aria-label={isUk ? "Контакти" : "Contacto"}
              className="selah-contact flex items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/60 transition hover:border-white/40 hover:bg-white/10 hover:text-white"
            >
              {isUk ? "Контакти" : "Contacto"}
            </button>

            {contactsOpen && (
              <div className="absolute right-0 top-12 w-[calc(100vw-32px)] max-w-72 rounded-2xl border border-white/10 bg-black p-5 shadow-2xl">

                <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                  SELAH
                </p>

                <h3 className="mt-3 text-lg text-white">
                  {isUk ? "Контакти" : "Contacto"}
                </h3>

                <a
                  href="tel:+34641136326"
                  className="mt-5 block rounded-xl border border-white/10 bg-white/[0.03] p-3"
                >
                  <p className="text-xs text-white/40">
                    {isUk ? "Телефон" : "Teléfono"}
                  </p>

                  <p className="mt-1 text-sm text-white">
                    +34 641 136 326
                  </p>
                </a>

                <a
                  href="mailto:fomazorom1516@icloud.com"
                  className="mt-3 block rounded-xl border border-white/10 bg-white/[0.03] p-3"
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

          <div className="selah-language flex shrink-0 rounded-full border border-white/10 bg-white/[0.03] p-1">

            <button
              type="button"
              onClick={() => changeLanguage("uk")}
              className={`rounded-full transition ${
                isUk
                  ? "bg-white text-black"
                  : "text-white/40 hover:text-white"
              }`}
            >
              UA
            </button>

            <button
              type="button"
              onClick={() => changeLanguage("es")}
              className={`rounded-full transition ${
                !isUk
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
            aria-label={isUk ? "Кошик" : "Carrito"}
            className="selah-cart flex shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] transition hover:border-white/40 hover:bg-white/10"
          >
            🛒
          </Link>

        </div>

      </div>

      <style>{`

        /* =========================
           DEFAULT
        ========================= */

        .selah-menu {
          margin-left: auto;
          margin-right: 24px;
          gap: 32px;
        }

        .selah-menu-link {
          white-space: nowrap;
          font-size: 14px;
          color: rgba(255,255,255,0.6);
          transition: color 0.2s;
        }

        .selah-menu-link:hover {
          color: white;
        }

        .selah-right {
          gap: 12px;
        }

        .selah-contact {
          height: 40px;
          padding-left: 16px;
          padding-right: 16px;
          font-size: 12px;
        }

        .selah-language {
          gap: 2px;
        }

        .selah-language button {
          padding: 6px 12px;
          font-size: 10px;
        }

        .selah-cart {
          width: 40px;
          height: 40px;
          font-size: 18px;
        }


        /* =========================
           TABLET / HORIZONTAL PHONE
           ВСЕ СЛОВА ЗАЛИШАЄМО
        ========================= */

        @media (orientation: landscape) and (max-width: 1023px) {

          .selah-navbar-inner {
            height: 58px !important;
            padding-left: 8px !important;
            padding-right: 8px !important;
          }

          .selah-logo {
            font-size: 11px !important;
            letter-spacing: 0.25em !important;
          }

          .selah-menu {
            margin-left: auto !important;
            margin-right: 8px !important;
            gap: 9px !important;
          }

          .selah-menu-link {
            font-size: 9px !important;
            letter-spacing: -0.1px;
          }

          .selah-right {
            gap: 5px !important;
          }

          .selah-contact {
            height: 30px !important;
            padding-left: 7px !important;
            padding-right: 7px !important;
            font-size: 8px !important;
          }

          .selah-language {
            padding: 2px !important;
          }

          .selah-language button {
            padding: 4px 6px !important;
            font-size: 8px !important;
          }

          .selah-cart {
            width: 30px !important;
            height: 30px !important;
            font-size: 14px !important;
          }
        }


        /* =========================
           VERY SMALL LANDSCAPE
           ========================= */

        @media (orientation: landscape) and (max-width: 700px) {

          .selah-navbar-inner {
            padding-left: 5px !important;
            padding-right: 5px !important;
          }

          .selah-menu {
            gap: 6px !important;
            margin-right: 5px !important;
          }

          .selah-menu-link {
            font-size: 8px !important;
          }

          .selah-contact {
            padding-left: 5px !important;
            padding-right: 5px !important;
            font-size: 7px !important;
          }

          .selah-language button {
            padding-left: 5px !important;
            padding-right: 5px !important;
          }

          .selah-cart {
            width: 27px !important;
            height: 27px !important;
            font-size: 12px !important;
          }
        }


        /* =========================
           VERTICAL PHONE
        ========================= */

        @media (max-width: 639px) and (orientation: portrait) {

          .selah-menu {
            display: none !important;
          }

          .selah-contact {
            width: 38px;
            height: 38px;
            padding: 0;
            font-size: 0;
          }

          .selah-contact::after {
            content: "☎";
            font-size: 16px;
          }

          .selah-right {
            margin-left: auto;
          }

          .selah-cart {
            width: 38px;
            height: 38px;
          }
        }

      `}</style>

    </header>
  );
}