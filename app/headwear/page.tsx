"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { headwear } from "./data/headwear";
import ProductGallery from "@/components/headwear/ProductGallery";

export default function HeadwearPage() {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY + 5) {
        setScrollDirection("down");
      } else if (currentScrollY < lastScrollY - 5) {
        setScrollDirection("up");
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main className="bg-black text-white">

      {/* =====================================================
          ПЛАВАЮЧА КНОПКА — НА ГОЛОВНУ
      ===================================================== */}

      <motion.div
        className="fixed left-5 top-5 z-[9999]"
        animate={{
          y: scrollDirection === "down" ? 55 : 0,
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
                x: scrollDirection === "up" ? -2 : 2,
              }}
              transition={{
                duration: 0.3,
              }}
              className="text-lg"
            >
              ←
            </motion.span>

            <span className="hidden sm:inline">
              На головну
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

      <section className="relative h-screen overflow-hidden">

        <Image
          src="/images/headwear/headwear-collection.jpg"
          alt="SELAH Headwear"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />

        {/* затемнення */}

        <div className="absolute inset-0 bg-black/45" />

        {/* додатковий градієнт */}

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

        <div className="absolute inset-0 flex items-center justify-center">

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
            className="text-center px-6"
          >

            <p className="
              uppercase
              tracking-[8px]
              text-zinc-300
              text-sm
            ">
              SELAH
            </p>

            <h1
              className="
                mt-4
                text-6xl
                md:text-8xl
                font-bold
                tracking-tight
              "
            >
              Headwear
            </h1>

            <p
              className="
                mt-8
                text-lg
                md:text-xl
                text-zinc-300
                max-w-xl
                mx-auto
                leading-8
              "
            >
              Premium Christian Headwear crafted for everyday life.
            </p>

            {/* маленький індикатор прокрутки */}

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
                text-white/60
                text-sm
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
          max-w-7xl
          mx-auto
          px-6
          py-24
          md:py-32
        "
      >

        {headwear.map((product) => (

          <ProductGallery
            key={product.id}
            product={product}
          />

        ))}

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
            uppercase
            tracking-[6px]
            text-xs
            text-zinc-600
          "
        >
          SELAH
        </p>

        <p className="mt-4 text-sm text-zinc-600">
          Носи свою віру щодня.
        </p>

      </footer>

    </main>
  );
}