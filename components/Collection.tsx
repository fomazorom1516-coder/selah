"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Language = "uk" | "es";

export default function Collection() {
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

  const isUk = language === "uk";

  return (
    <section
      id="collection"
      className="bg-black px-8 py-32 text-white"
    >
      <div className="mx-auto max-w-7xl">

        {/* ЗАГОЛОВОК */}

        <h2 className="mb-20 text-center text-5xl font-light">
          {isUk ? "Колекція" : "Colección"}
        </h2>

        {/* КАРТКИ */}

        <div className="grid gap-10 md:grid-cols-3">

          {/* ФУТБОЛКИ */}

          <Link
            href="/tshirts"
            className="group block"
          >
            <div
              className="
                cursor-pointer
                overflow-hidden
                rounded-3xl
                bg-zinc-900
                transition-all
                duration-500
                hover:-translate-y-2
                hover:bg-zinc-800
              "
            >

              <div className="overflow-hidden">

                <img
                  src="/images/products/tshirt-01.PNG"
                  alt={
                    isUk
                      ? "Футболки SELAH"
                      : "Camisetas SELAH"
                  }
                  className="
                    h-[420px]
                    w-full
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-105
                  "
                />

              </div>

              <div className="p-8">

                <h3 className="mb-2 text-2xl">
                  {isUk
                    ? "Футболки"
                    : "Camisetas"}
                </h3>

                <p className="text-gray-400">
                  {isUk
                    ? "Мінімалізм. Вишивка. Віра."
                    : "Minimalismo. Bordado. Fe."}
                </p>

                <p
                  className="
                    mt-6
                    text-sm
                    uppercase
                    tracking-[0.25em]
                    text-white/70
                    transition-colors
                    duration-300
                    group-hover:text-white
                  "
                >
                  {isUk
                    ? "Переглянути →"
                    : "Ver colección →"}
                </p>

              </div>

            </div>
          </Link>


          {/* БЕЙСБОЛКИ */}

          <Link
            href="/headwear"
            className="group block"
          >

            <div
              className="
                cursor-pointer
                overflow-hidden
                rounded-3xl
                bg-zinc-900
                transition-all
                duration-500
                hover:-translate-y-2
                hover:bg-zinc-800
              "
            >

              <div className="overflow-hidden">

                <img
                  src="/images/headwear/headwear-collection.jpg"
                  alt={
                    isUk
                      ? "Колекція бейсболок SELAH"
                      : "Colección de gorras SELAH"
                  }
                  className="
                    h-[420px]
                    w-full
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-105
                  "
                />

              </div>

              <div className="p-8">

                <h3 className="mb-2 text-2xl">
                  {isUk
                    ? "Бейсболки"
                    : "Gorras"}
                </h3>

                <p className="text-gray-400">
                  {isUk
                    ? "Носи свою віру щодня."
                    : "Lleva tu fe cada día."}
                </p>

                <p
                  className="
                    mt-6
                    text-sm
                    uppercase
                    tracking-[0.25em]
                    text-white/70
                    transition-colors
                    duration-300
                    group-hover:text-white
                  "
                >
                  {isUk
                    ? "Переглянути →"
                    : "Ver colección →"}
                </p>

              </div>

            </div>

          </Link>


          {/* ПАТЧІ */}

          <Link
            href="/patches"
            className="group block"
          >

            <div
              className="
                cursor-pointer
                overflow-hidden
                rounded-3xl
                bg-zinc-900
                transition-all
                duration-500
                hover:-translate-y-2
                hover:bg-zinc-800
              "
            >

              <div className="overflow-hidden">

                <img
                  src="/images/patches/patch-todos.jpg"
                  alt={
                    isUk
                      ? "Патчі SELAH"
                      : "Parches SELAH"
                  }
                  className="
                    h-[420px]
                    w-full
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-105
                  "
                />

              </div>

              <div className="p-8">

                <h3 className="mb-2 text-2xl">
                  {isUk
                    ? "Патчі"
                    : "Parches"}
                </h3>

                <p className="text-gray-400">
                  {isUk
                    ? "Змінюй послання разом із днем."
                    : "Cambia el mensaje con cada día."}
                </p>

                <p
                  className="
                    mt-6
                    text-sm
                    uppercase
                    tracking-[0.25em]
                    text-white/70
                    transition-colors
                    duration-300
                    group-hover:text-white
                  "
                >
                  {isUk
                    ? "Переглянути →"
                    : "Ver colección →"}
                </p>

              </div>

            </div>

          </Link>

        </div>
      </div>
    </section>
  );
}