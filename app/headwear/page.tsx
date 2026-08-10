"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { headwear } from "./data/headwear";
import ProductGallery from "@/components/headwear/ProductGallery";

type Language = "uk" | "es" | "en";

const translations = {
  uk: {
    home: "На головну",
    title: "Головні убори",
    description:
      "Преміальні головні убори SELAH для щоденного життя.",
    footer: "Носи свою віру щодня.",
  },

  es: {
    home: "Inicio",
    title: "Headwear",
    description:
      "Gorras y accesorios cristianos premium para cada día.",
    footer: "Lleva tu fe cada día.",
  },

  en: {
    home: "Home",
    title: "Headwear",
    description:
      "Premium Christian headwear crafted for everyday life.",
    footer: "Wear your faith every day.",
  },
};

function getLanguage(): Language {
  if (typeof window === "undefined") {
    return "uk";
  }

  const saved =
    localStorage.getItem("selah-language");

  if (
    saved === "uk" ||
    saved === "es" ||
    saved === "en"
  ) {
    return saved;
  }

  return "uk";
}

export default function HeadwearPage() {

  const [language, setLanguage] =
    useState<Language>("uk");

  const [scrollDirection, setScrollDirection] =
    useState<"up" | "down">("up");


  /* =====================================================
     LANGUAGE
  ===================================================== */

  useEffect(() => {

    setLanguage(getLanguage());

    const handleLanguageChange = () => {
      setLanguage(getLanguage());
    };

    window.addEventListener(
      "selah-language-changed",
      handleLanguageChange
    );

    window.addEventListener(
      "language-changed",
      handleLanguageChange
    );

    window.addEventListener(
      "storage",
      handleLanguageChange
    );

    return () => {

      window.removeEventListener(
        "selah-language-changed",
        handleLanguageChange
      );

      window.removeEventListener(
        "language-changed",
        handleLanguageChange
      );

      window.removeEventListener(
        "storage",
        handleLanguageChange
      );

    };

  }, []);


  /* =====================================================
     SCROLL
  ===================================================== */

  useEffect(() => {

    let lastScrollY =
      window.scrollY;

    const handleScroll = () => {

      const currentScrollY =
        window.scrollY;

      if (
        currentScrollY >
        lastScrollY + 5
      ) {

        setScrollDirection("down");

      } else if (
        currentScrollY <
        lastScrollY - 5
      ) {

        setScrollDirection("up");

      }

      lastScrollY =
        currentScrollY;

    };

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    );

    return () => {

      window.removeEventListener(
        "scroll",
        handleScroll
      );

    };

  }, []);


  const t =
    translations[language];


  return (

    <main className="bg-black text-white">


      {/* =====================================================
          ПЛАВАЮЧА КНОПКА
      ===================================================== */}

      <motion.div
        className="
          fixed
          left-5
          top-5
          z-[9999]
        "
        animate={{
          y:
            scrollDirection === "down"
              ? 55
              : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 22,
        }}
      >

        <Link href="/">

          <motion.div
            whileHover={{
              scale: 1.05,
              boxShadow:
                "0 0 30px rgba(255,255,255,0.22)",
            }}
            whileTap={{
              scale: 0.95,
            }}
            className="
              group
              flex
              items-center
              gap-3
              rounded-full
              border
              border-white/15
              bg-black/65
              px-5
              py-3
              text-sm
              text-white
              backdrop-blur-xl
              shadow-xl
              transition
            "
          >

            <motion.span
              animate={{
                x:
                  scrollDirection === "up"
                    ? -2
                    : 2,
              }}
              transition={{
                duration: 0.3,
              }}
              className="text-lg"
            >
              ←
            </motion.span>


            <span className="hidden sm:inline">
              {t.home}
            </span>


            <span className="sm:hidden">
              SELAH
            </span>

          </motion.div>

        </Link>

      </motion.div>


      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        className="
          relative
          h-screen
          overflow-hidden
        "
      >

        <Image
          src="/images/headwear/headwear-collection.jpg"
          alt="SELAH Headwear"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />


        {/* DARK OVERLAY */}

        <div
          className="
            absolute
            inset-0
            bg-black/45
          "
        />


        {/* GRADIENT */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black
            via-transparent
            to-black/20
          "
        />


        {/* HERO CONTENT */}

        <div
          className="
            absolute
            inset-0
            flex
            items-center
            justify-center
          "
        >

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            className="
              px-6
              text-center
            "
          >

            <p
              className="
                text-sm
                uppercase
                tracking-[8px]
                text-zinc-300
              "
            >
              SELAH
            </p>


            <h1
              className="
                mt-4
                text-6xl
                font-bold
                tracking-tight
                md:text-8xl
              "
            >
              {t.title}
            </h1>


            <p
              className="
                mx-auto
                mt-8
                max-w-xl
                text-lg
                leading-8
                text-zinc-300
                md:text-xl
              "
            >
              {t.description}
            </p>


            {/* SCROLL INDICATOR */}

            <motion.div
              animate={{
                y: [0, 8, 0],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                mt-12
                text-sm
                text-white/60
              "
            >
              ↓
            </motion.div>

          </motion.div>

        </div>

      </section>


      {/* =====================================================
          PRODUCTS
      ===================================================== */}

      <section
        id="headwear-products"
        className="
          mx-auto
          max-w-7xl
          px-6
          py-24
          md:py-32
        "
      >

        {headwear.map(
          (product) => (

            <ProductGallery
              key={product.id}
              product={product}
            />

          )
        )}

      </section>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer
        className="
          border-t
          border-white/10
          py-16
          text-center
        "
      >

        <p
          className="
            text-xs
            uppercase
            tracking-[6px]
            text-zinc-600
          "
        >
          SELAH
        </p>


        <p
          className="
            mt-4
            text-sm
            text-zinc-600
          "
        >
          {t.footer}
        </p>

      </footer>

    </main>

  );
}