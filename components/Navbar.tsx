"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Language = "uk" | "es";

export default function Navbar() {
  const [language, setLanguage] = useState<Language>("uk");
  const [contactsOpen, setContactsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      window.removeEventListener("selah-language-changed", updateLanguage);
      window.removeEventListener("language-changed", updateLanguage);
      window.removeEventListener("storage", updateLanguage);
    };
  }, []);

  const changeLanguage = (value: Language) => {
    setLanguage(value);
    localStorage.setItem("selah-language", value);
    window.dispatchEvent(new Event("selah-language-changed"));
  };

  const isUk = language === "uk";

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setContactsOpen(false);
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-[1000] border-b border-white/10 bg-black/80 backdrop-blur-xl">

      {/* =========================
          TOP BAR
      ========================= */}

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6">

        {/* LOGO */}

        <Link
          href="/"
          onClick={closeMobileMenu}
          className="text-base font-medium uppercase tracking-[0.35em] transition hover:text-white/60 sm:text-lg"
        >
          SELAH
        </Link>

        {/* =========================
            DESKTOP MENU
        ========================= */}

        <nav className="hidden items-center gap-8 lg:flex">

          <Link
            href="/"
            className="text-base text-white/60 transition hover:text-white"
          >
            {isUk ? "Головна" : "Inicio"}
          </Link>

          <Link
            href="/tshirts"
            className="text-base text-white/60 transition hover:text-white"
          >
            {isUk ? "Футболки" : "Camisetas"}
          </Link>

          <Link
            href="/patches"
            className="text-base text-white/60 transition hover:text-white"
          >
            {isUk ? "Патчі" : "Parches"}
          </Link>

          <Link
            href="/headwear"
            className="text-base text-white/60 transition hover:text-white"
          >
            {isUk ? "Головні убори" : "Gorras"}
          </Link>

        </nav>

        {/* =========================
            DESKTOP RIGHT
        ========================= */}

        <div className="hidden items-center gap-3 lg:flex">

          {/* CONTACTS */}

          <div className="relative">

            <button
              type="button"
              onClick={() => setContactsOpen((v) => !v)}
              className="flex h-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-4 text-sm text-white/60 transition hover:border-white/40 hover:bg-white/10 hover:text-white"
            >
              {isUk ? "Контакти" : "Contacto"}
            </button>

            {contactsOpen && (
              <ContactPanel isUk={isUk} />
            )}

          </div>

          {/* LANGUAGE */}

          <LanguageSwitch
            language={language}
            changeLanguage={changeLanguage}
          />

          {/* CART */}

          <Link
            href="/cart"
            aria-label={isUk ? "Кошик" : "Carrito"}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-lg transition hover:border-white/40 hover:bg-white/10"
          >
            🛒
          </Link>

        </div>

        {/* =========================
            MOBILE BUTTON
        ========================= */}

        <button
          type="button"
          onClick={() => setMobileMenuOpen((v) => !v)}
          aria-label={mobileMenuOpen ? "Закрити меню" : "Відкрити меню"}
          aria-expanded={mobileMenuOpen}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-xl transition hover:border-white/40 hover:bg-white/10 lg:hidden"
        >
          <span
            className={`transition-transform duration-300 ${
              mobileMenuOpen ? "rotate-90" : ""
            }`}
          >
            {mobileMenuOpen ? "×" : "☰"}
          </span>
        </button>

      </div>

      {/* =========================
          MOBILE MENU
      ========================= */}

      <div
        className={`overflow-hidden border-t border-white/10 transition-all duration-500 ease-out lg:hidden ${
          mobileMenuOpen
            ? "max-h-[700px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >

        <div
          className={`px-5 pb-6 pt-4 transition-transform duration-500 ${
            mobileMenuOpen
              ? "translate-y-0"
              : "-translate-y-5"
          }`}
        >

          {/* NAVIGATION */}

          <nav className="flex flex-col">

            <MobileLink
              href="/"
              label={isUk ? "Головна" : "Inicio"}
              onClick={closeMobileMenu}
            />

            <MobileLink
              href="/tshirts"
              label={isUk ? "Футболки" : "Camisetas"}
              onClick={closeMobileMenu}
            />

            <MobileLink
              href="/patches"
              label={isUk ? "Патчі" : "Parches"}
              onClick={closeMobileMenu}
            />

            <MobileLink
              href="/headwear"
              label={isUk ? "Головні убори" : "Gorras"}
              onClick={closeMobileMenu}
            />

          </nav>

          {/* CONTACT */}

          <div className="mt-4 border-t border-white/10 pt-4">

            <button
              type="button"
              onClick={() => setContactsOpen((v) => !v)}
              className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-left text-base text-white/70 transition hover:bg-white/[0.07]"
            >
              <span>
                {isUk ? "Контакти" : "Contacto"}
              </span>

              <span
                className={`transition-transform duration-300 ${
                  contactsOpen ? "rotate-180" : ""
                }`}
              >
                ↓
              </span>
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                contactsOpen
                  ? "max-h-80 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="pt-3">
                <ContactPanel isUk={isUk} mobile />
              </div>
            </div>

          </div>

          {/* LANGUAGE + CART */}

          <div className="mt-4 flex items-center gap-3 border-t border-white/10 pt-4">

            <LanguageSwitch
              language={language}
              changeLanguage={changeLanguage}
            />

            <Link
              href="/cart"
              onClick={closeMobileMenu}
              className="flex flex-1 items-center justify-center gap-3 rounded-full border border-white/10 bg-white/[0.03] py-3 text-sm text-white/70 transition hover:bg-white/[0.08]"
            >
              <span>🛒</span>

              <span>
                {isUk ? "Кошик" : "Carrito"}
              </span>
            </Link>

          </div>

        </div>

      </div>

    </header>
  );
}


/* =========================================================
   MOBILE LINK
========================================================= */

function MobileLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="border-b border-white/10 py-4 text-xl font-light text-white/80 transition hover:pl-2 hover:text-white"
    >
      {label}
    </Link>
  );
}


/* =========================================================
   LANGUAGE SWITCH
========================================================= */

function LanguageSwitch({
  language,
  changeLanguage,
}: {
  language: Language;
  changeLanguage: (value: Language) => void;
}) {
  return (
    <div className="flex shrink-0 rounded-full border border-white/10 bg-white/[0.03] p-1">

      <button
        type="button"
        onClick={() => changeLanguage("uk")}
        className={`rounded-full px-3 py-1.5 text-[10px] transition ${
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
        className={`rounded-full px-3 py-1.5 text-[10px] transition ${
          language === "es"
            ? "bg-white text-black"
            : "text-white/40 hover:text-white"
        }`}
      >
        ES
      </button>

    </div>
  );
}


/* =========================================================
   CONTACT PANEL
========================================================= */

function ContactPanel({
  isUk,
  mobile = false,
}: {
  isUk: boolean;
  mobile?: boolean;
}) {
  return (
    <div
      className={
        mobile
          ? "rounded-2xl border border-white/10 bg-white/[0.03] p-4"
          : "absolute right-0 top-12 w-72 rounded-2xl border border-white/10 bg-black p-5 shadow-2xl"
      }
    >

      <p className="text-xs uppercase tracking-[0.3em] text-white/40">
        SELAH
      </p>

      <h3 className="mt-3 text-lg text-white">
        {isUk ? "Контакти" : "Contacto"}
      </h3>

      <a
        href="tel:+34641136326"
        className="mt-5 block rounded-xl border border-white/10 bg-white/[0.03] p-3 transition hover:border-white/30 hover:bg-white/[0.07]"
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
        className="mt-3 block rounded-xl border border-white/10 bg-white/[0.03] p-3 transition hover:border-white/30 hover:bg-white/[0.07]"
      >
        <p className="text-xs text-white/40">
          Email
        </p>

        <p className="mt-1 break-all text-sm text-white">
          fomazorom1516@icloud.com
        </p>
      </a>

    </div>
  );
}