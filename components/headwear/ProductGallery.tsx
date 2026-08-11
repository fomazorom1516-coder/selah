"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

type Language = "uk" | "es";

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
  }
> = {
  classic: {
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
  },

  performance: {
    uk: {
      name: "Спортивна бейсболка",
      description:
        "Легка спортивна бейсболка SELAH із вентиляцією, створена для активного способу життя та спекотної погоди.",
      material:
        "Модель Eagle із задньою перфорованою панеллю для відмінної вентиляції.",
    },

    es: {
      name: "Gorra deportiva",
      description:
        "Gorra deportiva ligera SELAH con ventilación, diseñada para un estilo de vida activo y los días calurosos.",
      material:
        "Modelo Eagle con panel trasero perforado para una excelente ventilación.",
    },
  },

  trucker: {
    uk: {
      name: "Бейсболка Trucker",
      description:
        "Класична бейсболка Trucker із сіткою для кращої вентиляції та преміальною передньою панеллю SELAH.",
      material:
        "Саржа з чесаної бавовни. Задня частина виготовлена з поліестерової сітки для кращої вентиляції.",
    },

    es: {
      name: "Gorra Trucker",
      description:
        "Gorra Trucker clásica con panel trasero de malla para una mejor ventilación y panel frontal premium SELAH.",
      material:
        "Sarga de algodón peinado. La parte trasera está fabricada con malla de poliéster para una mejor ventilación.",
    },
  },

  bucket: {
    uk: {
      name: "Панама",
      description:
        "Стильна панама SELAH із вишитим логотипом та змінним патчем для повсякденного носіння.",
      material:
        "100% бавовна. Модель у стилі BOB з ефектом washed для характерного м’якого та злегка вінтажного вигляду.",
    },

    es: {
      name: "Sombrero Bucket",
      description:
        "Bucket hat elegante SELAH con logotipo bordado y parche intercambiable para el uso diario.",
      material:
        "100% algodón. Modelo estilo BOB con efecto washed para conseguir un tacto suave y un aspecto ligeramente vintage.",
    },
  },
};

/*
=========================================================
COLOR TRANSLATIONS
=========================================================
*/

function getColorTranslation(
  colorName: string,
  language: Language
) {
  if (language === "uk") {
    return colorName;
  }

  const normalized = colorName
    .toLowerCase()
    .trim();

  if (
    normalized.includes("син") ||
    normalized.includes("blue") ||
    normalized.includes("azul")
  ) {
    return "Azul";
  }

  if (
    normalized.includes("чор") ||
    normalized.includes("black") ||
    normalized.includes("negro")
  ) {
    return "Negro";
  }

  if (
    normalized.includes("білий") ||
    normalized.includes("white") ||
    normalized.includes("blanco")
  ) {
    return "Blanco";
  }

  if (
    normalized.includes("олив") ||
    normalized.includes("olive") ||
    normalized.includes("verde")
  ) {
    return "Oliva";
  }

  if (normalized.includes("celeste")) {
    return "Celeste";
  }

  return colorName;
}

/*
=========================================================
CHECK DARK COLOR
=========================================================
*/

function isDarkColor(color: string) {
  const hex = color.replace("#", "");

  if (hex.length !== 6) {
    return false;
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const brightness =
    (r * 299 + g * 587 + b * 114) / 1000;

  return brightness < 80;
}

/*
=========================================================
READ LANGUAGE
=========================================================
*/

function getLanguage(): Language {
  if (typeof window === "undefined") {
    return "uk";
  }

  const saved =
    localStorage.getItem("selah-language");

  if (
    saved === "uk" ||
    saved === "es"
  ) {
    return saved;
  }

  return "uk";
}

/*
=========================================================
GET PRODUCT TRANSLATION
=========================================================
*/

function getLocalizedProduct(
  product: Product,
  language: Language
) {
  const translation =
    productTranslations[product.id];

  if (translation) {
    return translation[language];
  }

  return {
    name: product.name,
    description: product.description,
    material: product.material,
  };
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
    const updateLanguage = () => {
      setLanguage(getLanguage());
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

  /*
  =======================================================
  LOCALIZED DATA
  =======================================================
  */

  const t =
    translations[language];

  const localizedProduct =
    getLocalizedProduct(
      product,
      language
    );

  const glowColor =
    product.colors[0]?.value ||
    "#ffffff";

  const darkProduct =
    isDarkColor(glowColor);

  const isBucket =
    product.category === "bucket";

  const chooseButton =
    isBucket
      ? t.chooseBucket
      : t.chooseCap;

  /*
  =======================================================
  IMAGE NAVIGATION
  =======================================================
  */

  const nextImage = () => {
    setCurrentImage((prev) =>
      prev === product.gallery.length - 1
        ? 0
        : prev + 1
    );
  };

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

        price:
          14.99,

        quantity:
          1,

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

  /*
  =======================================================
  RETURN
  =======================================================
  */

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

      {/* =================================================
          LEFT — IMAGE
      ================================================= */}

      <div
        className="relative"
        onMouseEnter={() =>
          setIsHovered(true)
        }
        onMouseLeave={() =>
          setIsHovered(false)
        }
      >

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

        {/* =================================================
            THUMBNAILS
        ================================================= */}

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
                    alt={
                      `${localizedProduct.name} ${index + 1}`
                    }
                    fill
                    className="object-cover"
                    sizes="80px"
                  />

                </motion.button>
              );
            }
          )}

        </div>

        {/* =================================================
            ARROWS
        ================================================= */}

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

      {/* =================================================
          RIGHT — INFORMATION
      ================================================= */}

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

        {/* =================================================
            MATERIAL
        ================================================= */}

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

        {/* =================================================
            PRICE
        ================================================= */}

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

        {/* =================================================
            COLOR
        ================================================= */}

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
              (color) => {

                const darkColor =
                  isDarkColor(
                    color.value
                  );

                return (
                  <motion.div
                    key={color.name}
                    whileHover={{
                      scale: 1.08,
                    }}
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >

                    {/* COLOR CIRCLE */}

                    <span
                      className="
                        relative
                        block
                        h-11
                        w-11
                        rounded-full
                      "
                      style={{
                        background:
                          color.value,

                        border:
                          darkColor
                            ? "3px solid rgba(255,255,255,0.45)"
                            : "2px solid rgba(255,255,255,0.25)",

                        boxShadow:
                          darkColor
                            ? "0 0 0 4px rgba(255,255,255,0.06), 0 0 22px rgba(255,255,255,0.18)"
                            : `0 0 25px ${color.value}70`,
                      }}
                    />

                    <span
                      className="
                        text-sm
                        text-zinc-300
                      "
                    >
                      {getColorTranslation(
                        color.name,
                        language
                      )}
                    </span>

                  </motion.div>
                );
              }
            )}

          </div>

        </div>

        {/* =================================================
            ADD TO CART
        ================================================= */}

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
            sm:w-auto
          "
          style={{
            background:
              darkProduct
                ? "#ffffff"
                : glowColor,

            color:
              darkProduct
                ? "#000000"
                : "#000000",

            boxShadow:
              darkProduct
                ? "0 0 30px rgba(255,255,255,0.20)"
                : `0 0 30px ${glowColor}45`,
          }}
        >
          {chooseButton}
        </motion.button>

        {/* =================================================
            FOOT TEXT
        ================================================= */}

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