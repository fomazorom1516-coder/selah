"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

type Language = "uk" | "es" | "en";

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

const translations = {
  uk: {
    material: "Матеріал",
    price: "Ціна",
    color: "Колір",
    chooseCap: "Обрати бейсболку →",
    chooseBucket: "Обрати панаму →",
    daily: "SELAH — носи свою віру щодня.",
    cap: "бейсболку",
    bucket: "панаму",
    home: "На головну",
  },

  es: {
    material: "Material",
    price: "Precio",
    color: "Color",
    chooseCap: "Elegir gorra →",
    chooseBucket: "Elegir sombrero →",
    daily: "SELAH — lleva tu fe cada día.",
    cap: "gorra",
    bucket: "sombrero",
    home: "Inicio",
  },

  en: {
    material: "Material",
    price: "Price",
    color: "Color",
    chooseCap: "Choose cap →",
    chooseBucket: "Choose bucket hat →",
    daily: "SELAH — wear your faith every day.",
    cap: "cap",
    bucket: "bucket hat",
    home: "Home",
  },
};

/*
=========================================================
PRODUCT TRANSLATIONS
=========================================================
*/

const productTranslations: Record<
  string,
  {
    uk: {
      name: string;
      description: string;
      material?: string;
    };
    es: {
      name: string;
      description: string;
      material?: string;
    };
    en: {
      name: string;
      description: string;
      material?: string;
    };
  }
> = {
  /*
  -------------------------------------------------------
  CLASSIC CAP
  -------------------------------------------------------
  */

  "classic-cap": {
    uk: {
      name: "Класична бейсболка",
      description:
        "Класична шестипанельна бейсболка SELAH із преміальною вишивкою для щоденного використання.",
      material:
        "Модель Clique Daris — конструкція Sandwich, контрастний козирок та регульована застібка.",
    },

    es: {
      name: "Gorra clásica",
      description:
        "Gorra clásica de seis paneles SELAH con bordado premium, creada para el uso diario.",
      material:
        "Modelo Clique Daris — construcción Sandwich, visera de contraste y cierre ajustable.",
    },

    en: {
      name: "Classic Cap",
      description:
        "Classic six-panel SELAH cap with premium embroidery, designed for everyday use.",
      material:
        "Clique Daris model — Sandwich construction, contrasting visor and adjustable closure.",
    },
  },

  /*
  -------------------------------------------------------
  BUCKET HAT
  -------------------------------------------------------
  */

  "classic-bucket": {
    uk: {
      name: "Класична панама",
      description:
        "Класична панама SELAH із преміальною вишивкою, створена для щоденного використання.",
      material:
        "Преміальна тканина та комфортна конструкція для повсякденного носіння.",
    },

    es: {
      name: "Bucket Hat clásico",
      description:
        "Bucket hat clásico SELAH con bordado premium, creado para el uso diario.",
      material:
        "Tejido premium y construcción cómoda para el uso diario.",
    },

    en: {
      name: "Classic Bucket Hat",
      description:
        "Classic SELAH bucket hat with premium embroidery, created for everyday use.",
      material:
        "Premium fabric and comfortable construction for everyday wear.",
    },
  },
};

/*
=========================================================
FALLBACK TRANSLATION
=========================================================
*/

function getProductTranslation(
  product: Product,
  language: Language
) {
  const translation =
    productTranslations[product.id];

  if (translation) {
    return translation[language];
  }

  /*
  Якщо для нового товару ще немає окремого
  перекладу — використовуємо оригінальний текст.
  */

  return {
    name: product.name,
    description: product.description,
    material: product.material,
  };
}

/*
=========================================================
LANGUAGE
=========================================================
*/

function getSavedLanguage(): Language {
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

/*
=========================================================
COMPONENT
=========================================================
*/

export default function ProductGallery({
  product,
}: Props) {

  const [currentImage, setCurrentImage] =
    useState(0);

  const [isHovered, setIsHovered] =
    useState(false);

  const [language, setLanguage] =
    useState<Language>("uk");

  /*
  =======================================================
  LANGUAGE LISTENER
  =======================================================
  */

  useEffect(() => {

    setLanguage(getSavedLanguage());

    const updateLanguage = () => {
      setLanguage(getSavedLanguage());
    };

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

  /*
  =======================================================
  TRANSLATIONS
  =======================================================
  */

  const t = translations[language];

  const localizedProduct =
    getProductTranslation(
      product,
      language
    );

  const glowColor =
    product.colors[0]?.value ||
    "#ffffff";

  const isBucket =
    product.category === "bucket";

  const productType =
    isBucket
      ? t.bucket
      : t.cap;

  const chooseButton =
    isBucket
      ? t.chooseBucket
      : t.chooseCap;

  /*
  =======================================================
  NEXT IMAGE
  =======================================================
  */

  const nextImage = () => {

    setCurrentImage((prev) =>
      prev === product.gallery.length - 1
        ? 0
        : prev + 1
    );

  };

  /*
  =======================================================
  PREVIOUS IMAGE
  =======================================================
  */

  const prevImage = () => {

    setCurrentImage((prev) =>
      prev === 0
        ? product.gallery.length - 1
        : prev - 1
    );

  };

  /*
  =======================================================
  ADD TO CART
  =======================================================
  */

  const addToCart = () => {

    try {

      const saved =
        localStorage.getItem(
          "selah-cart"
        );

      const cart: CartItem[] =
        saved
          ? JSON.parse(saved)
          : [];

      const newItem: CartItem = {

        id:
          `headwear-${product.id}-${Date.now()}`,

        name:
          localizedProduct.name,

        price: 14.99,

        quantity: 1,

        image:
          product.gallery[0],

        category:
          "headwear",

      };

      cart.push(newItem);

      localStorage.setItem(
        "selah-cart",
        JSON.stringify(cart)
      );

      window.dispatchEvent(
        new Event(
          "selah-cart-updated"
        )
      );

    } catch (error) {

      console.error(
        "Не вдалося додати товар у кошик:",
        error
      );

    }

  };

  return (

    <section
      className="
        relative
        grid
        items-center
        gap-16
        py-20
        lg:grid-cols-2
        lg:gap-24
        lg:py-32
      "
    >

      {/* =====================================================
          LEFT — IMAGE
      ===================================================== */}

      <div
        className="relative"
        onMouseEnter={() =>
          setIsHovered(true)
        }
        onMouseLeave={() =>
          setIsHovered(false)
        }
      >

        {/* GLOW */}

        <motion.div
          className="
            pointer-events-none
            absolute
            inset-10
            rounded-full
          "
          animate={{
            opacity:
              isHovered
                ? 0.35
                : 0.15,

            scale:
              isHovered
                ? 1.08
                : 1,
          }}
          transition={{
            duration: 0.6,
          }}
          style={{
            background:
              glowColor,

            filter:
              "blur(80px)",
          }}
        />

        {/* MAIN IMAGE */}

        <motion.div
          className="
            relative
            aspect-square
            overflow-hidden
            rounded-[28px]
            border
            border-white/10
            bg-zinc-900
          "
          animate={{
            y:
              isHovered
                ? -8
                : 0,

            borderColor:
              isHovered
                ? glowColor
                : "rgba(255,255,255,0.10)",

            boxShadow:
              isHovered
                ? `0 25px 70px rgba(0,0,0,0.55), 0 0 45px ${glowColor}45`
                : "0 15px 40px rgba(0,0,0,0.25)",
          }}
          transition={{
            duration: 0.45,
            ease: "easeOut",
          }}
        >

          <AnimatePresence
            mode="wait"
          >

            <motion.div
              key={`${product.id}-${currentImage}`}
              initial={{
                opacity: 0,
                scale: 1.04,
              }}
              animate={{
                opacity: 1,
                scale:
                  isHovered
                    ? 1.06
                    : 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.98,
              }}
              transition={{
                duration: 0.45,
                ease: "easeOut",
              }}
              className="
                absolute
                inset-0
              "
            >

              <Image
                src={
                  product.gallery[
                    currentImage
                  ]
                }
                alt={
                  localizedProduct.name
                }
                fill
                priority
                className="
                  object-cover
                "
                sizes="
                  (max-width: 1024px)
                  100vw,
                  50vw
                "
              />

            </motion.div>

          </AnimatePresence>


          {/* IMAGE GLOW */}

          <motion.div
            className="
              pointer-events-none
              absolute
              inset-0
            "
            animate={{
              opacity:
                isHovered
                  ? 0.18
                  : 0,
            }}
            transition={{
              duration: 0.4,
            }}
            style={{
              background:
                `radial-gradient(
                  circle at center,
                  ${glowColor}35,
                  transparent 65%
                )`,
            }}
          />


          {/* SELAH */}

          <div
            className="
              absolute
              left-5
              top-5
              rounded-full
              bg-black/60
              px-4
              py-2
              text-[10px]
              tracking-[4px]
              text-white/80
              backdrop-blur-md
            "
          >
            SELAH
          </div>

        </motion.div>


        {/* =====================================================
            THUMBNAILS
        ===================================================== */}

        <div
          className="
            mt-6
            flex
            justify-center
            gap-3
            sm:gap-4
          "
        >

          {product.gallery.map(
            (image, index) => {

              const active =
                currentImage === index;

              return (

                <motion.button
                  key={index}
                  type="button"
                  onClick={() =>
                    setCurrentImage(index)
                  }
                  whileHover={{
                    scale: 1.08,
                    y: -3,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  className="
                    relative
                    h-16
                    w-16
                    overflow-hidden
                    rounded-xl
                    bg-zinc-900
                    sm:h-20
                    sm:w-20
                  "
                  style={{
                    border:
                      active
                        ? `2px solid ${glowColor}`
                        : "2px solid rgba(255,255,255,0.12)",

                    boxShadow:
                      active
                        ? `0 0 20px ${glowColor}45`
                        : "none",
                  }}
                >

                  <Image
                    src={image}
                    alt={`${localizedProduct.name} ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />

                </motion.button>

              );

            }
          )}

        </div>


        {/* =====================================================
            ARROWS
        ===================================================== */}

        <div
          className="
            mt-7
            flex
            justify-center
            gap-4
          "
        >

          <motion.button
            type="button"
            onClick={prevImage}
            whileHover={{
              scale: 1.08,
              backgroundColor:
                glowColor,
            }}
            whileTap={{
              scale: 0.92,
            }}
            className="
              h-12
              w-12
              rounded-full
              border
              border-white/10
              bg-zinc-800
              text-white
              transition
            "
          >
            ←
          </motion.button>


          <motion.button
            type="button"
            onClick={nextImage}
            whileHover={{
              scale: 1.08,
              backgroundColor:
                glowColor,
            }}
            whileTap={{
              scale: 0.92,
            }}
            className="
              h-12
              w-12
              rounded-full
              border
              border-white/10
              bg-zinc-800
              text-white
              transition
            "
          >
            →
          </motion.button>

        </div>

      </div>


      {/* =====================================================
          RIGHT — INFORMATION
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

        {/* BRAND */}

        <p
          className="
            text-sm
            uppercase
            tracking-[6px]
            text-zinc-500
          "
        >
          SELAH
        </p>


        {/* PRODUCT NAME */}

        <h2
          className="
            mt-4
            text-4xl
            font-bold
            leading-tight
            sm:text-5xl
            lg:text-6xl
          "
        >
          {localizedProduct.name}
        </h2>


        {/* DESCRIPTION */}

        <p
          className="
            mt-7
            max-w-xl
            text-base
            leading-8
            text-zinc-400
            sm:text-lg
          "
        >
          {localizedProduct.description}
        </p>


        {/* =====================================================
            MATERIAL
        ===================================================== */}

        {localizedProduct.material && (

          <div
            className="
              mt-7
              max-w-xl
            "
          >

            <p
              className="
                mb-2
                text-xs
                uppercase
                tracking-[4px]
                text-zinc-500
              "
            >
              {t.material}
            </p>


            <p
              className="
                text-sm
                leading-7
                text-zinc-400
                sm:text-base
              "
            >
              {localizedProduct.material}
            </p>

          </div>

        )}


        {/* =====================================================
            PRICE
        ===================================================== */}

        <div className="mt-9">

          <p
            className="
              mb-2
              text-xs
              uppercase
              tracking-[4px]
              text-zinc-500
            "
          >
            {t.price}
          </p>


          <motion.div
            whileHover={{
              scale: 1.03,
            }}
            className="
              inline-flex
              items-center
              rounded-2xl
              border
              px-5
              py-3
            "
            style={{
              borderColor:
                `${glowColor}70`,

              boxShadow:
                `0 0 25px ${glowColor}20`,
            }}
          >

            <span
              className="
                text-3xl
                font-semibold
              "
              style={{
                textShadow:
                  `0 0 20px ${glowColor}55`,
              }}
            >
              14,99 €
            </span>

          </motion.div>

        </div>


        {/* =====================================================
            COLOR
        ===================================================== */}

        <div className="mt-9">

          <p
            className="
              mb-4
              text-xs
              uppercase
              tracking-[4px]
              text-zinc-500
            "
          >
            {t.color}
          </p>


          <div
            className="
              flex
              items-center
              gap-4
            "
          >

            {product.colors.map(
              (color) => (

                <motion.div
                  key={color.name}
                  whileHover={{
                    scale: 1.12,
                  }}
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >

                  <span
                    className="
                      relative
                      block
                      h-11
                      w-11
                      rounded-full
                      border-2
                      border-white/20
                    "
                    style={{
                      background:
                        color.value,

                      boxShadow:
                        `0 0 25px ${color.value}70`,
                    }}
                  />


                  <span
                    className="
                      text-sm
                      text-zinc-300
                    "
                  >
                    {color.name}
                  </span>

                </motion.div>

              )
            )}

          </div>

        </div>


        {/* =====================================================
            ADD TO CART
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
          className="
            mt-10
            w-full
            rounded-full
            px-9
            py-4
            font-medium
            text-black
            sm:w-auto
          "
          style={{
            background:
              glowColor,

            boxShadow:
              `0 0 30px ${glowColor}45`,
          }}
        >
          {chooseButton}
        </motion.button>


        {/* SMALL TEXT */}

        <p
          className="
            mt-5
            text-xs
            text-zinc-600
          "
        >
          {t.daily}
        </p>

      </motion.div>

    </section>

  );
}