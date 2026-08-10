"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

type Product = {
  id: string;
  name: string;
  description: string;
  material?: string;
  category?: "cap" | "bucket";
  gallery: string[];
  colors: {
    name: string;
    value: string;
  }[];
};

type Props = {
  product: Product;
};

type CartItem = {
  id: string;
  name?: string;
  price?: number;
  quantity?: number;
  image?: string;
  category?: string;
};

export default function ProductGallery({ product }: Props) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const glowColor = product.colors[0]?.value || "#ffffff";

  const isBucket = product.category === "bucket";

  const productType = isBucket ? "панаму" : "бейсболку";

  const nextImage = () => {
    setCurrentImage((prev) =>
      prev === product.gallery.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? product.gallery.length - 1 : prev - 1
    );
  };

  // =====================================================
  // ДОДАВАННЯ БЕЙСБОЛКИ / ПАНАМИ В КОШИК
  // =====================================================

  const addToCart = () => {
    try {
      const saved = localStorage.getItem("selah-cart");

      const cart: CartItem[] = saved ? JSON.parse(saved) : [];

      const newItem: CartItem = {
        id: `headwear-${product.id}`,
        name: product.name,
        price: 14.99,
        quantity: 1,
        image: product.gallery[0],
        category: "headwear",
      };

      // ВАЖЛИВО:
      // Кожне натискання додає ОКРЕМИЙ товар.
      // Не мінусуємо і не видаляємо його.
      cart.push(newItem);

      localStorage.setItem("selah-cart", JSON.stringify(cart));

      // Оновлюємо всі компоненти кошика
      window.dispatchEvent(
        new Event("selah-cart-updated")
      );
    } catch (error) {
      console.error(
        "Не вдалося додати товар у кошик:",
        error
      );
    }
  };

  return (
    <section className="relative grid lg:grid-cols-2 gap-16 lg:gap-24 items-center py-20 lg:py-32">

      {/* =====================================================
          ЛІВА ЧАСТИНА — ФОТО
      ===================================================== */}

      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >

        {/* Світіння навколо товару */}

        <motion.div
          className="absolute inset-10 rounded-full pointer-events-none"
          animate={{
            opacity: isHovered ? 0.35 : 0.15,
            scale: isHovered ? 1.08 : 1,
          }}
          transition={{ duration: 0.6 }}
          style={{
            background: glowColor,
            filter: "blur(80px)",
          }}
        />

        {/* Основне фото */}

        <motion.div
          className="relative aspect-square rounded-[28px] overflow-hidden bg-zinc-900 border border-white/10"
          animate={{
            y: isHovered ? -8 : 0,
            borderColor: isHovered
              ? glowColor
              : "rgba(255,255,255,0.10)",
            boxShadow: isHovered
              ? `0 25px 70px rgba(0,0,0,0.55), 0 0 45px ${glowColor}45`
              : "0 15px 40px rgba(0,0,0,0.25)",
          }}
          transition={{
            duration: 0.45,
            ease: "easeOut",
          }}
        >

          <AnimatePresence mode="wait">

            <motion.div
              key={`${product.id}-${currentImage}`}
              initial={{
                opacity: 0,
                scale: 1.04,
              }}
              animate={{
                opacity: 1,
                scale: isHovered ? 1.06 : 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.98,
              }}
              transition={{
                duration: 0.45,
                ease: "easeOut",
              }}
              className="absolute inset-0"
            >

              <Image
                src={product.gallery[currentImage]}
                alt={product.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

            </motion.div>

          </AnimatePresence>

          {/* Світіння поверх фото */}

          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              opacity: isHovered ? 0.18 : 0,
            }}
            transition={{ duration: 0.4 }}
            style={{
              background: `radial-gradient(
                circle at center,
                ${glowColor}35,
                transparent 65%
              )`,
            }}
          />

          {/* SELAH */}

          <div className="absolute left-5 top-5 rounded-full bg-black/60 backdrop-blur-md px-4 py-2 text-[10px] tracking-[4px] text-white/80">
            SELAH
          </div>

        </motion.div>

        {/* =====================================================
            МІНІАТЮРИ
        ===================================================== */}

        <div className="flex justify-center gap-3 sm:gap-4 mt-6">

          {product.gallery.map((image, index) => {

            const active = currentImage === index;

            return (
              <motion.button
                key={index}
                onClick={() => setCurrentImage(index)}
                whileHover={{
                  scale: 1.08,
                  y: -3,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-zinc-900"
                style={{
                  border: active
                    ? `2px solid ${glowColor}`
                    : "2px solid rgba(255,255,255,0.12)",
                  boxShadow: active
                    ? `0 0 20px ${glowColor}45`
                    : "none",
                }}
              >

                <Image
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />

              </motion.button>
            );
          })}

        </div>

        {/* =====================================================
            СТРІЛКИ
        ===================================================== */}

        <div className="flex justify-center gap-4 mt-7">

          <motion.button
            onClick={prevImage}
            whileHover={{
              scale: 1.08,
              backgroundColor: glowColor,
            }}
            whileTap={{
              scale: 0.92,
            }}
            className="w-12 h-12 rounded-full bg-zinc-800 border border-white/10 text-white transition"
          >
            ←
          </motion.button>

          <motion.button
            onClick={nextImage}
            whileHover={{
              scale: 1.08,
              backgroundColor: glowColor,
            }}
            whileTap={{
              scale: 0.92,
            }}
            className="w-12 h-12 rounded-full bg-zinc-800 border border-white/10 text-white transition"
          >
            →
          </motion.button>

        </div>

      </div>

      {/* =====================================================
          ПРАВА ЧАСТИНА — ІНФОРМАЦІЯ
      ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          x: 30,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 0.6,
        }}
      >

        {/* Бренд */}

        <p className="uppercase tracking-[6px] text-zinc-500 text-sm">
          SELAH
        </p>

        {/* Назва */}

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-4 leading-tight">
          {product.name}
        </h2>

        {/* Опис */}

        <p className="mt-7 text-zinc-400 leading-8 text-base sm:text-lg max-w-xl">
          {product.description}
        </p>

        {/* =====================================================
            МАТЕРІАЛ
        ===================================================== */}

        {product.material && (
          <div className="mt-7 max-w-xl">

            <p className="text-xs uppercase tracking-[4px] text-zinc-500 mb-2">
              Матеріал
            </p>

            <p className="text-sm sm:text-base text-zinc-400 leading-7">
              {product.material}
            </p>

          </div>
        )}

        {/* =====================================================
            ЦІНА
        ===================================================== */}

        <div className="mt-9">

          <p className="text-xs uppercase tracking-[4px] text-zinc-500 mb-2">
            Ціна
          </p>

          <motion.div
            whileHover={{
              scale: 1.03,
            }}
            className="inline-flex items-center rounded-2xl px-5 py-3 border"
            style={{
              borderColor: `${glowColor}70`,
              boxShadow: `0 0 25px ${glowColor}20`,
            }}
          >

            <span
              className="text-3xl font-semibold"
              style={{
                textShadow: `0 0 20px ${glowColor}55`,
              }}
            >
              14,99 €
            </span>

          </motion.div>

        </div>

        {/* =====================================================
            КОЛІР
        ===================================================== */}

        <div className="mt-9">

          <p className="text-xs uppercase tracking-[4px] text-zinc-500 mb-4">
            Колір
          </p>

          <div className="flex items-center gap-4">

            {product.colors.map((color) => (

              <motion.div
                key={color.name}
                whileHover={{
                  scale: 1.12,
                }}
                className="flex items-center gap-3"
              >

                <span
                  className="relative block w-11 h-11 rounded-full border-2 border-white/20"
                  style={{
                    background: color.value,
                    boxShadow: `0 0 25px ${color.value}70`,
                  }}
                />

                <span className="text-sm text-zinc-300">
                  {color.name}
                </span>

              </motion.div>

            ))}

          </div>

        </div>

        {/* =====================================================
            КНОПКА
        ===================================================== */}

        <motion.button
          type="button"
          onClick={addToCart}
          whileHover={{
            scale: 1.03,
            y: -2,
          }}
          whileTap={{
            scale: 0.97,
          }}
          className="mt-10 w-full sm:w-auto px-9 py-4 rounded-full font-medium text-black"
          style={{
            background: glowColor,
            boxShadow: `0 0 30px ${glowColor}45`,
          }}
        >
          Обрати {productType} →
        </motion.button>

        {/* Маленький текст */}

        <p className="mt-5 text-xs text-zinc-600">
          SELAH — носи свою віру щодня.
        </p>

      </motion.div>

    </section>
  );
}