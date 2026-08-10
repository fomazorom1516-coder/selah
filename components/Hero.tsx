"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Language = "uk" | "es";

export default function Hero() {
  const [language, setLanguage] = useState<Language>("uk");

  useEffect(() => {
    const loadLanguage = () => {
      const saved = localStorage.getItem("selah-language");

      if (saved === "uk" || saved === "es") {
        setLanguage(saved);
      }
    };

    loadLanguage();

    window.addEventListener(
      "selah-language-changed",
      loadLanguage
    );

    return () => {
      window.removeEventListener(
        "selah-language-changed",
        loadLanguage
      );
    };
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden">

      {/* Відео */}

      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source
          src="/videos/hero.mp4"
          type="video/mp4"
        />
      </video>

      {/* Темний шар */}

      <div className="absolute inset-0 bg-black/50" />

      {/* Контент */}

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 text-center">

        <div>

          <h1 className="text-6xl font-bold tracking-[0.35em] md:text-8xl">
            SELAH
          </h1>

          <p className="mt-8 text-xl text-gray-200">

            {language === "uk" ? (
              <>
                Носи свою віру.
                <br />
                Живи нею.
              </>
            ) : (
              <>
                Lleva tu fe.
                <br />
                Vívela.
              </>
            )}

          </p>

          <Link
            href="/tshirts"
            className="mt-12 inline-flex rounded-full border border-white px-8 py-4 transition hover:bg-white hover:text-black"
          >
            {language === "uk"
              ? "Переглянути колекцію"
              : "Ver colección"}
          </Link>

        </div>

      </div>

    </section>
  );
}