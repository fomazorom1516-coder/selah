"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const sizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];

type Language = "uk" | "es";

type SelectedPatch = {
  id: number;
  image: string;
  title: string;
  reference: string;
  price: number;
};

type CartItem = {
  id: string;
  type: "tshirt" | "patch" | "headwear";
  title: string;
  image: string;
  price: number;
  color?: string;
  size?: string;
  reference?: string;
  quantity: number;
};

type TShirt = {
  id: string;

  name: {
    uk: string;
    es: string;
  };

  description: {
    uk: string;
    es: string;
  };

  images: string[];
  price: number;

  material: {
    uk: string;
    es: string;
  };

  weight: string;

  gender: {
    uk: string;
    es: string;
  };

  cut: {
    uk: string;
    es: string;
  };

  sleeve: {
    uk: string;
    es: string;
  };

  buttons?: {
    uk: string;
    es: string;
  };

  color: {
    name: {
      uk: string;
      es: string;
    };
    value: string;
  };
};

const tshirts: TShirt[] = [
  {
    id: "premium-polo",

    name: {
      uk: "SELAH — Premium Polo",
      es: "SELAH — Premium Polo",
    },

    description: {
      uk: "Преміальне чоловіче поло з коротким рукавом. Вишитий символ SELAH розташований на грудях. На спині передбачене місце для змінного Velcro-патча.",
      es: "Polo masculino premium de manga corta. El símbolo bordado de SELAH está situado en el pecho. La parte trasera está preparada para un parche Velcro intercambiable.",
    },

    images: ["/images/products/tshirt-05.PNG"],

    price: 29.99,

    material: {
      uk: "95% бавовна / 5% еластан",
      es: "95% algodón / 5% elastano",
    },

    weight: "215 g/m²",

    gender: {
      uk: "Чоловічий",
      es: "Hombre",
    },

    cut: {
      uk: "Premium Polo",
      es: "Premium Polo",
    },

    sleeve: {
      uk: "Короткий",
      es: "Corta",
    },

    buttons: {
      uk: "2 ґудзики / перламутровий вигляд",
      es: "2 botones / efecto nacarado",
    },

    color: {
      name: {
        uk: "Чорний",
        es: "Negro",
      },
      value: "#111111",
    },
  },

  {
    id: "unisex-royal-blue",

    name: {
      uk: "SELAH — Unisex Royal Blue",
      es: "SELAH — Unisex Royal Blue",
    },

    description: {
      uk: "Універсальна футболка SELAH у кольорі Royal Blue. Підходить як для чоловіків, так і для жінок. Мінімалістичний дизайн створений для щоденного носіння та поєднання зі змінними SELAH-патчами.",
      es: "Camiseta unisex SELAH en color Royal Blue. Diseñada tanto para hombres como para mujeres. Un diseño minimalista pensado para el uso diario y para combinar con los parches SELAH intercambiables.",
    },

    images: [
      "/images/products/tshirt-02.PNG",
      "/images/products/tshirt-04.PNG",
    ],

    price: 19.99,

    material: {
      uk: "Гладка тканина, 100% чесана попередньо усаджена бавовна",
      es: "Punto liso, 100% algodón peinado y preencogido",
    },

    weight: "160 g/m²",

    gender: {
      uk: "Унісекс",
      es: "Unisex",
    },

    cut: {
      uk: "Regular",
      es: "Regular",
    },

    sleeve: {
      uk: "Короткий",
      es: "Corta",
    },

    color: {
      name: {
        uk: "Royal Blue",
        es: "Royal Blue",
      },
      value: "#2455a4",
    },
  },

  {
    id: "unisex-navy",

    name: {
      uk: "SELAH — Unisex Navy",
      es: "SELAH — Unisex Navy",
    },

    description: {
      uk: "Універсальна футболка SELAH у темно-синьому кольорі. Підходить як для чоловіків, так і для жінок. Легка та комфортна модель для щоденного носіння з мінімалістичним вишитим символом SELAH.",
      es: "Camiseta unisex SELAH en color azul marino oscuro. Adecuada tanto para hombres como para mujeres. Un modelo ligero y cómodo para el uso diario con el símbolo SELAH bordado.",
    },

    images: ["/images/products/tshirt-06.PNG"],

    price: 19.99,

    material: {
      uk: "100% чесана попередньо усаджена бавовна",
      es: "100% algodón peinado y preencogido",
    },

    weight: "140 g/m²",

    gender: {
      uk: "Унісекс",
      es: "Unisex",
    },

    cut: {
      uk: "Regular",
      es: "Regular",
    },

    sleeve: {
      uk: "Короткий",
      es: "Corta",
    },

    color: {
      name: {
        uk: "Темно-синій",
        es: "Azul marino oscuro",
      },
      value: "#18202b",
    },
  },

  {
    id: "oversize-zen",

    name: {
      uk: "SELAH — Oversize Zen",
      es: "SELAH — Oversize Zen",
    },

    description: {
      uk: "Щільна oversize футболка SELAH з преміальним відчуттям тканини. Вільний крій створює сучасний повсякденний образ. Підходить як для чоловіків, так і для жінок.",
      es: "Camiseta oversize SELAH de tejido grueso con sensación premium. Su corte amplio crea un estilo moderno y casual. Adecuada tanto para hombres como para mujeres.",
    },

    images: [
      "/images/products/tshirt-07.PNG",
      "/images/products/tshirt-08.PNG",
    ],

    price: 19.99,

    material: {
      uk: "100% щільна бавовна",
      es: "100% algodón pesado",
    },

    weight: "210 g/m²",

    gender: {
      uk: "Унісекс",
      es: "Unisex",
    },

    cut: {
      uk: "Oversize",
      es: "Oversize",
    },

    sleeve: {
      uk: "Короткий",
      es: "Corta",
    },

    color: {
      name: {
        uk: "Azul Zen 263",
        es: "Azul Zen 263",
      },
      value: "#7b8490",
    },
  },
];

const translations = {
  uk: {
    shirts: "Футболки",
    heroText: "Носи не просто одяг. Носи своє послання.",
    material: "Матеріал",
    weight: "Щільність",
    gender: "Стать",
    cut: "Крій",
    sleeve: "Рукав",
    buttons: "Ґудзики",
    patch: "Патч",
    color: "Колір",
    size: "Розмір",
    quantity: "Кількість",
    selectedPatch: "Обраний патч",
    addPatch: "Додай свій патч",
    removablePatch: "Змінний Velcro-патч для твого образу SELAH.",
    changePatch: "Змінити патч →",
    choosePatch: "Обрати патч →",
    total: "Разом",
    addToCart: "Додати в кошик →",
    close: "Закрити ↑",
    remove: "Видалити",
    footerTitle: "Носи не просто одяг.",
    footerTitle2: "Носи своє послання.",
    footerText:
      "Один одяг — різні послання. Змінюй патч і нагадуй собі про те, що справді важливе.",
    velcro: "Змінний Velcro",
  },

  es: {
    shirts: "Camisetas",
    heroText: "No lleves solo ropa. Lleva tu mensaje.",
    material: "Material",
    weight: "Densidad",
    gender: "Género",
    cut: "Corte",
    sleeve: "Manga",
    buttons: "Botones",
    patch: "Parche",
    color: "Color",
    size: "Talla",
    quantity: "Cantidad",
    selectedPatch: "Parche seleccionado",
    addPatch: "Añade tu parche",
    removablePatch: "Parche Velcro intercambiable para tu estilo SELAH.",
    changePatch: "Cambiar parche →",
    choosePatch: "Elegir parche →",
    total: "Total",
    addToCart: "Añadir al carrito →",
    close: "Cerrar ↑",
    remove: "Eliminar",
    footerTitle: "No lleves solo ropa.",
    footerTitle2: "Lleva tu mensaje.",
    footerText:
      "Una prenda — diferentes mensajes. Cambia el parche y recuerda lo que realmente importa.",
    velcro: "Velcro intercambiable",
  },
};

function getLanguage(): Language {
  if (typeof window === "undefined") {
    return "uk";
  }

  const possibleKeys = [
    "selah-language",
    "language",
    "locale",
    "selah-lang",
  ];

  for (const key of possibleKeys) {
    const value = localStorage.getItem(key);

    if (!value) continue;

    const normalized = value.toLowerCase();

    if (
      normalized === "es" ||
      normalized === "es-es" ||
      normalized === "spanish" ||
      normalized === "español"
    ) {
      return "es";
    }

    if (
      normalized === "uk" ||
      normalized === "ua" ||
      normalized === "uk-ua" ||
      normalized === "ukrainian" ||
      normalized === "українська"
    ) {
      return "uk";
    }
  }

  return "uk";
}

export default function TshirtsPage() {
  const [language, setLanguage] = useState<Language>("uk");

  const [selectedSize, setSelectedSize] =
    useState("M");

  const [selectedPatch, setSelectedPatch] =
    useState<SelectedPatch | null>(null);

  const [quantity, setQuantity] = useState(1);

  const [expandedProduct, setExpandedProduct] =
    useState<string | null>(null);

  const [currentImages, setCurrentImages] =
    useState<Record<string, number>>({});

  /*
  ========================================================
  LANGUAGE
  ========================================================
  */

  useEffect(() => {
    const updateLanguage = () => {
      setLanguage(getLanguage());
    };

    updateLanguage();

    const interval = window.setInterval(
      updateLanguage,
      300
    );

    window.addEventListener(
      "storage",
      updateLanguage
    );

    window.addEventListener(
      "languagechange",
      updateLanguage
    );

    window.addEventListener(
      "selah-language-changed",
      updateLanguage
    );

    return () => {
      window.clearInterval(interval);

      window.removeEventListener(
        "storage",
        updateLanguage
      );

      window.removeEventListener(
        "languagechange",
        updateLanguage
      );

      window.removeEventListener(
        "selah-language-changed",
        updateLanguage
      );
    };
  }, []);

  const t = translations[language];

  /*
  ========================================================
  LOAD SELECTED PATCH
  ========================================================
  */

  useEffect(() => {
    const savedPatch = localStorage.getItem(
      "selah-selected-patch"
    );

    if (!savedPatch) {
      return;
    }

    try {
      const parsedPatch = JSON.parse(savedPatch);

      if (parsedPatch) {
        setSelectedPatch(parsedPatch);
      }
    } catch {
      localStorage.removeItem(
        "selah-selected-patch"
      );
    }
  }, []);

  /*
  ========================================================
  REMOVE PATCH
  ========================================================
  */

  const removePatch = () => {
    localStorage.removeItem(
      "selah-selected-patch"
    );

    setSelectedPatch(null);
  };

  /*
  ========================================================
  OPEN PATCHES
  ========================================================
  */

  const openPatches = () => {
    window.location.href =
      "/patches?returnTo=/tshirts";
  };

  /*
  ========================================================
  CHANGE IMAGE
  ========================================================
  */

  const changeProductImage = (
    productId: string,
    imageIndex: number
  ) => {
    setCurrentImages((previous) => ({
      ...previous,
      [productId]: imageIndex,
    }));
  };

  /*
  ========================================================
  ADD TO CART
  ========================================================
  */

  const addToCart = (product: TShirt) => {
    let cart: CartItem[] = [];

    const savedCart =
      localStorage.getItem("selah-cart");

    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);

        if (Array.isArray(parsed)) {
          cart = parsed;
        }
      } catch {
        cart = [];
      }
    }

    const tshirtItem: CartItem = {
      id:
        "tshirt-" +
        product.id +
        "-" +
        product.color.name.uk +
        "-" +
        selectedSize +
        "-" +
        Date.now(),

      type: "tshirt",

      title: product.name.uk,

      image: product.images[0],

      price: product.price,

      color: product.color.name.uk,

      size: selectedSize,

      quantity,
    };

    cart.push(tshirtItem);

    if (selectedPatch) {
      const patchItem: CartItem = {
        id:
          "patch-" +
          selectedPatch.id +
          "-" +
          Date.now(),

        type: "patch",

        title: selectedPatch.title,

        image: selectedPatch.image,

        price: selectedPatch.price,

        reference:
          selectedPatch.reference,

        quantity: 1,
      };

      cart.push(patchItem);
    }

    localStorage.setItem(
      "selah-cart",
      JSON.stringify(cart)
    );

    window.dispatchEvent(
      new Event("selah-cart-updated")
    );

    window.location.href = "/cart";
  };

  /*
  ========================================================
  TOGGLE PRODUCT
  ========================================================
  */

  const toggleProduct = (id: string) => {
    setExpandedProduct((current) =>
      current === id ? null : id
    );
  };

  return (
    <main className="min-h-screen bg-black text-white">

      {/* HERO */}

      <section className="relative overflow-hidden border-b border-white/10">

        <div
          className="
            relative
            min-h-[430px]
            w-full
            bg-[length:85%_auto]
            bg-center
            bg-no-repeat
            md:min-h-[520px]
          "
          style={{
            backgroundImage:
              "url('/images/tshirts-hero.jpg')",
          }}
        >

          <div className="absolute inset-0 bg-black/25" />

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-r
              from-black/80
              via-black/35
              to-transparent
            "
          />

          <div
            className="
              absolute
              inset-x-0
              bottom-0
              h-40
              bg-gradient-to-t
              from-black
              to-transparent
            "
          />

          <div
            className="
              relative
              z-10
              mx-auto
              flex
              min-h-[430px]
              max-w-7xl
              items-end
              px-6
              pb-16
              md:min-h-[520px]
              md:pb-20
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
              className="max-w-xl"
            >

              <p className="text-xs uppercase tracking-[0.4em] text-white/60">
                SELAH
              </p>

              <h1
                className="
                  mt-4
                  text-5xl
                  font-light
                  tracking-tight
                  text-white
                  drop-shadow-2xl
                  md:text-7xl
                "
              >
                {t.shirts}
              </h1>

              <p
                className="
                  mt-5
                  max-w-lg
                  text-sm
                  leading-7
                  text-white/70
                  drop-shadow-lg
                  md:text-base
                "
              >
                {t.heroText}
              </p>

            </motion.div>

          </div>

        </div>

      </section>

      {/* PRODUCTS */}

      <section className="mx-auto max-w-7xl px-6 pb-24">

        <div
          className="
            grid
            grid-cols-1
            gap-6
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >

          {tshirts.map((product) => {

            const expanded =
              expandedProduct === product.id;

            const currentImage =
              currentImages[product.id] ?? 0;

            return (
              <article
                key={product.id}
                className={`
                  group
                  relative
                  overflow-hidden
                  rounded-[1.75rem]
                  border
                  bg-white/[0.025]
                  transition-all
                  duration-500

                  ${
                    expanded
                      ? "border-white/60 shadow-[0_0_45px_rgba(255,255,255,0.12)] sm:col-span-2 lg:col-span-2"
                      : "border-white/10 hover:-translate-y-2 hover:border-white/40 hover:shadow-[0_20px_60px_rgba(255,255,255,0.08)]"
                  }
                `}
              >

                {/* PHOTO */}

                <button
                  type="button"
                  onClick={() =>
                    toggleProduct(product.id)
                  }
                  className="block w-full text-left"
                >

                  <div
                    className={`
                      relative
                      overflow-hidden
                      bg-zinc-900
                      transition-all
                      duration-700

                      ${
                        expanded
                          ? "aspect-[4/3]"
                          : "aspect-square"
                      }
                    `}
                  >

                    <img
                      src={
                        product.images[
                          currentImage
                        ]
                      }
                      alt={
                        product.name[language]
                      }
                      className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-700
                        group-hover:scale-[1.05]
                      "
                    />

                    <div
                      className="
                        pointer-events-none
                        absolute
                        inset-0
                        opacity-0
                        transition-opacity
                        duration-500
                        group-hover:opacity-100
                      "
                      style={{
                        boxShadow:
                          "inset 0 0 0 1px rgba(255,255,255,0.7), inset 0 0 45px rgba(255,255,255,0.10)",
                      }}
                    />

                    <div
                      className="
                        pointer-events-none
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/70
                        via-transparent
                        to-transparent
                      "
                    />

                    <div
                      className="
                        absolute
                        left-4
                        top-4
                        rounded-full
                        border
                        border-white/15
                        bg-black/60
                        px-3
                        py-2
                        text-[9px]
                        uppercase
                        tracking-[0.25em]
                        text-white/70
                        backdrop-blur-xl
                      "
                    >
                      SELAH
                    </div>

                  </div>

                </button>

                {/* IMAGE SELECTOR */}

                {product.images.length > 1 && (

                  <div className="flex justify-center gap-2 px-5 pt-4">

                    {product.images.map(
                      (image, index) => (

                        <button
                          key={image}
                          type="button"
                          onClick={() =>
                            changeProductImage(
                              product.id,
                              index
                            )
                          }
                          className={`
                            relative
                            h-14
                            w-14
                            overflow-hidden
                            rounded-lg
                            border
                            transition-all
                            duration-300

                            ${
                              currentImage === index
                                ? "scale-105 border-white"
                                : "border-white/15 opacity-60 hover:opacity-100"
                            }
                          `}
                        >

                          <img
                            src={image}
                            alt=""
                            className="h-full w-full object-cover"
                          />

                        </button>

                      )
                    )}

                  </div>

                )}

                {/* BASIC INFORMATION */}

                <div className="p-5">

                  <div className="flex items-start justify-between gap-4">

                    <div>

                      <h2 className="text-lg font-medium">
                        {product.name[language]}
                      </h2>

                      <p className="mt-2 line-clamp-2 text-xs leading-5 text-white/40">
                        {product.description[language]}
                      </p>

                    </div>

                    <span className="shrink-0 text-sm">
                      {product.price
                        .toFixed(2)
                        .replace(".", ",")}{" "}
                      €
                    </span>

                  </div>

                  {/* EXPANDED */}

                  <div
                    className={`
                      grid
                      transition-all
                      duration-500

                      ${
                        expanded
                          ? "mt-7 grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }
                    `}
                  >

                    <div className="overflow-hidden">

                      {/* DESCRIPTION */}

                      <div className="border-t border-white/10 pt-6">

                        <p className="text-sm leading-6 text-white/60">
                          {product.description[language]}
                        </p>

                      </div>

                      {/* DETAILS */}

                      <div className="mt-6 space-y-3">

                        <Detail
                          name={t.material}
                          value={
                            product.material[
                              language
                            ]
                          }
                        />

                        <Detail
                          name={t.weight}
                          value={product.weight}
                        />

                        <Detail
                          name={t.gender}
                          value={
                            product.gender[
                              language
                            ]
                          }
                        />

                        <Detail
                          name={t.cut}
                          value={
                            product.cut[
                              language
                            ]
                          }
                        />

                        <Detail
                          name={t.sleeve}
                          value={
                            product.sleeve[
                              language
                            ]
                          }
                        />

                        {product.buttons && (
                          <Detail
                            name={t.buttons}
                            value={
                              product.buttons[
                                language
                              ]
                            }
                          />
                        )}

                        <Detail
                          name={t.patch}
                          value={t.velcro}
                          last
                        />

                      </div>

                      {/* COLOR */}

                      <div className="mt-7">

                        <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                          {t.color}
                        </p>

                        <div className="mt-4 flex items-center gap-3">

                          <span
                            className="
                              h-9
                              w-9
                              rounded-full
                              border-2
                              border-white
                              shadow-[0_0_20px_rgba(255,255,255,0.2)]
                            "
                            style={{
                              backgroundColor:
                                product.color.value,
                            }}
                          />

                          <span className="text-sm text-white/70">
                            {
                              product.color
                                .name[language]
                            }
                          </span>

                        </div>

                      </div>

                      {/* SIZE */}

                      <div className="mt-7">

                        <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                          {t.size}
                        </p>

                        <div className="mt-4 grid grid-cols-4 gap-2">

                          {sizes.map(
                            (size) => (

                              <button
                                key={size}
                                type="button"
                                onClick={() =>
                                  setSelectedSize(
                                    size
                                  )
                                }
                                className={`
                                  h-10
                                  rounded-lg
                                  border
                                  text-xs
                                  transition-all

                                  ${
                                    selectedSize ===
                                    size
                                      ? "border-white bg-white text-black"
                                      : "border-white/15 bg-white/[0.03] hover:border-white/60"
                                  }
                                `}
                              >
                                {size}
                              </button>

                            )
                          )}

                        </div>

                      </div>

                      {/* QUANTITY */}

                      <div className="mt-7">

                        <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                          {t.quantity}
                        </p>

                        <div
                          className="
                            mt-4
                            inline-flex
                            items-center
                            rounded-xl
                            border
                            border-white/15
                            bg-white/[0.03]
                          "
                        >

                          <button
                            type="button"
                            onClick={() =>
                              setQuantity(
                                Math.max(
                                  1,
                                  quantity - 1
                                )
                              )
                            }
                            className="
                              px-4
                              py-2
                              text-white/50
                              transition
                              hover:text-white
                            "
                          >
                            −
                          </button>

                          <span className="min-w-[40px] text-center text-sm">
                            {quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              setQuantity(
                                quantity + 1
                              )
                            }
                            className="
                              px-4
                              py-2
                              text-white/50
                              transition
                              hover:text-white
                            "
                          >
                            +
                          </button>

                        </div>

                      </div>

                      {/* PATCH */}

                      <div
                        className="
                          mt-7
                          rounded-2xl
                          border
                          border-white/10
                          bg-black/30
                          p-4
                        "
                      >

                        <div className="flex items-center gap-3">

                          <div
                            className="
                              flex
                              h-10
                              w-10
                              shrink-0
                              items-center
                              justify-center
                              rounded-full
                              border
                              border-white/15
                            "
                          >
                            ✦
                          </div>

                          <div className="min-w-0">

                            <p className="text-sm">
                              {selectedPatch
                                ? t.selectedPatch
                                : t.addPatch}
                            </p>

                            <p className="mt-1 text-xs text-white/40">

                              {selectedPatch
                                ? `${selectedPatch.title} — ${selectedPatch.reference}`
                                : t.removablePatch}

                            </p>

                          </div>

                        </div>

                        {selectedPatch && (

                          <div
                            className="
                              mt-4
                              flex
                              items-center
                              gap-3
                              rounded-xl
                              border
                              border-white/10
                              bg-black
                              p-2
                            "
                          >

                            <img
                              src={
                                selectedPatch.image
                              }
                              alt={
                                selectedPatch.title
                              }
                              className="
                                h-14
                                w-14
                                rounded-lg
                                object-cover
                              "
                            />

                            <div className="min-w-0 flex-1">

                              <p className="truncate text-xs">
                                {
                                  selectedPatch.title
                                }
                              </p>

                              <p className="mt-1 text-[10px] text-white/40">
                                {
                                  selectedPatch.reference
                                }
                              </p>

                              <p className="mt-1 text-xs">
                                {selectedPatch.price
                                  .toFixed(2)
                                  .replace(
                                    ".",
                                    ","
                                  )}{" "}
                                €
                              </p>

                            </div>

                            <button
                              type="button"
                              onClick={
                                removePatch
                              }
                              className="
                                text-[10px]
                                text-white/35
                                transition
                                hover:text-white
                              "
                            >
                              {t.remove}
                            </button>

                          </div>

                        )}

                        <button
                          type="button"
                          onClick={openPatches}
                          className="
                            mt-4
                            w-full
                            rounded-xl
                            border
                            border-white/20
                            px-4
                            py-3
                            text-xs
                            transition-all
                            duration-300
                            hover:border-white
                            hover:bg-white
                            hover:text-black
                          "
                        >
                          {selectedPatch
                            ? t.changePatch
                            : t.choosePatch}
                        </button>

                      </div>

                      {/* TOTAL */}

                      <div
                        className="
                          mt-6
                          flex
                          items-center
                          justify-between
                          border-t
                          border-white/10
                          pt-5
                        "
                      >

                        <span className="text-xs text-white/40">
                          {t.total}
                        </span>

                        <span className="text-xl font-light">

                          {(
                            product.price *
                              quantity +
                            (selectedPatch
                              ? selectedPatch.price
                              : 0)
                          )
                            .toFixed(2)
                            .replace(
                              ".",
                              ","
                            )}{" "}
                          €

                        </span>

                      </div>

                      {/* ADD TO CART */}

                      <button
                        type="button"
                        onClick={() =>
                          addToCart(product)
                        }
                        className="
                          mt-5
                          w-full
                          rounded-full
                          bg-white
                          px-6
                          py-4
                          text-xs
                          uppercase
                          tracking-[0.2em]
                          text-black
                          transition-all
                          duration-300
                          hover:scale-[1.01]
                          hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]
                        "
                      >
                        {t.addToCart}
                      </button>

                      {/* CLOSE */}

                      <button
                        type="button"
                        onClick={() =>
                          toggleProduct(
                            product.id
                          )
                        }
                        className="
                          mt-4
                          w-full
                          text-center
                          text-xs
                          text-white/35
                          transition
                          hover:text-white
                        "
                      >
                        {t.close}
                      </button>

                    </div>

                  </div>

                </div>

              </article>
            );
          })}

        </div>

      </section>

      {/* FOOTER */}

      <section
        className="
          border-t
          border-white/10
          px-6
          py-24
          text-center
        "
      >

        <p
          className="
            text-xs
            uppercase
            tracking-[0.4em]
            text-white/40
          "
        >
          SELAH
        </p>

        <h2
          className="
            mx-auto
            mt-6
            max-w-2xl
            text-3xl
            font-light
            leading-tight
            md:text-5xl
          "
        >
          {t.footerTitle}
          <br />
          {t.footerTitle2}
        </h2>

        <p
          className="
            mx-auto
            mt-6
            max-w-xl
            text-white/50
          "
        >
          {t.footerText}
        </p>

      </section>

    </main>
  );
}

/* =========================================================
   DETAIL
========================================================= */

function Detail({
  name,
  value,
  last = false,
}: {
  name: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div
      className={`
        flex
        justify-between
        gap-5
        ${
          !last
            ? "border-b border-white/10 pb-3"
            : ""
        }
      `}
    >

      <span className="text-xs text-white/40">
        {name}
      </span>

      <span className="text-right text-xs">
        {value}
      </span>

    </div>
  );
}