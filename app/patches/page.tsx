"use client";

import { useEffect, useMemo, useState } from "react";

type Language = "uk" | "es";

type Patch = {
  id: string;
  image: string;
  number: number;
  language: Language;
  price: number;
};

type CartItem = {
  id: string;
  type: "tshirt" | "patch";
  title: string;
  image: string;
  price: number;
  language?: Language;
  quantity: number;
};

const PATCH_PRICE = 5.5;

const patches: Patch[] = [
  ...Array.from({ length: 10 }, (_, index) => ({
    id: `uk-${String(index + 1).padStart(2, "0")}`,
    image: `/images/patches/uk-${String(index + 1).padStart(2, "0")}.jpg`,
    number: index + 1,
    language: "uk" as Language,
    price: PATCH_PRICE,
  })),

  ...Array.from({ length: 10 }, (_, index) => ({
    id: `es-${String(index + 1).padStart(2, "0")}`,
    image: `/images/patches/es-${String(index + 1).padStart(2, "0")}.jpg`,
    number: index + 1,
    language: "es" as Language,
    price: PATCH_PRICE,
  })),
];

const translations = {
  uk: {
    label: "SELAH",
    title: "Обери своє послання",
    description:
      "Змінні Velcro-патчі SELAH. Обери ті, які хочеш носити сьогодні.",
    choose: "Обрати",
    selected: "Обрано",
    added: "Додано ✓",
    language: "Мова",
    back: "Повернутися до футболок",
  },

  es: {
    label: "SELAH",
    title: "Elige tu mensaje",
    description:
      "Parches Velcro intercambiables SELAH. Elige los que quieras llevar hoy.",
    choose: "Elegir",
    selected: "Seleccionado",
    added: "Añadido ✓",
    language: "Idioma",
    back: "Volver a polos",
  },
};

export default function PatchesPage() {
  const [language, setLanguage] =
    useState<Language>("es");

  const [selectedPatches, setSelectedPatches] =
    useState<Patch[]>([]);

  const [ready, setReady] =
    useState(false);

  const t = translations[language];

  /*
   * =====================================================
   * LOAD
   * =====================================================
   */

  useEffect(() => {
    const savedLanguage =
      localStorage.getItem(
        "selah-language"
      ) as Language | null;

    if (
      savedLanguage === "uk" ||
      savedLanguage === "es"
    ) {
      setLanguage(savedLanguage);
    }

    const savedPatches =
      localStorage.getItem(
        "selah-selected-patches"
      );

    if (savedPatches) {
      try {
        const parsed =
          JSON.parse(savedPatches);

        if (Array.isArray(parsed)) {
          setSelectedPatches(parsed);
        }
      } catch {
        localStorage.removeItem(
          "selah-selected-patches"
        );
      }
    }

    setReady(true);
  }, []);

  /*
   * =====================================================
   * SAVE SELECTED PATCHES
   * =====================================================
   */

  useEffect(() => {
    if (!ready) return;

    localStorage.setItem(
      "selah-selected-patches",
      JSON.stringify(selectedPatches)
    );
  }, [
    selectedPatches,
    ready,
  ]);

  /*
   * =====================================================
   * LANGUAGE
   * =====================================================
   */

  const changeLanguage = (
    value: Language
  ) => {
    setLanguage(value);

    localStorage.setItem(
      "selah-language",
      value
    );
  };

  /*
   * =====================================================
   * ONLY CURRENT LANGUAGE
   * =====================================================
   */

  const visiblePatches =
    useMemo(() => {
      return patches.filter(
        (patch) =>
          patch.language === language
      );
    }, [language]);

  /*
   * =====================================================
   * CHECK SELECTED
   * =====================================================
   */

  const isSelected = (
    id: string
  ) => {
    return selectedPatches.some(
      (patch) =>
        patch.id === id
    );
  };

  /*
   * =====================================================
   * GET CART
   * =====================================================
   */

  const getCart = (): CartItem[] => {
    try {
      const saved =
        localStorage.getItem(
          "selah-cart"
        );

      if (!saved) {
        return [];
      }

      const parsed =
        JSON.parse(saved);

      if (Array.isArray(parsed)) {
        return parsed;
      }

      return [];
    } catch {
      return [];
    }
  };

  /*
   * =====================================================
   * SAVE CART
   * =====================================================
   */

  const saveCart = (
    cart: CartItem[]
  ) => {
    localStorage.setItem(
      "selah-cart",
      JSON.stringify(cart)
    );

    window.dispatchEvent(
      new Event(
        "selah-cart-updated"
      )
    );
  };

  /*
   * =====================================================
   * ADD PATCH TO CART
   * =====================================================
   */

  const addPatchToCart = (
    patch: Patch
  ) => {
    const cart =
      getCart();

    const patchId =
      `patch-${patch.id}`;

    const exists =
      cart.some(
        (item) =>
          item.id === patchId
      );

    if (exists) {
      return cart;
    }

    const newItem: CartItem = {
      id: patchId,
      type: "patch",
      title: "SELAH Patch",
      image: patch.image,
      price: patch.price,
      language: patch.language,
      quantity: 1,
    };

    return [
      ...cart,
      newItem,
    ];
  };

  /*
   * =====================================================
   * REMOVE PATCH FROM CART
   * =====================================================
   */

  const removePatchFromCart = (
    patchId: string
  ) => {
    const cart =
      getCart();

    const newCart =
      cart.filter(
        (item) =>
          item.id !==
          `patch-${patchId}`
      );

    saveCart(newCart);
  };

  /*
   * =====================================================
   * SELECT / REMOVE PATCH
   * =====================================================
   */

  const togglePatch = (
    patch: Patch
  ) => {
    const exists =
      selectedPatches.some(
        (item) =>
          item.id === patch.id
      );

    if (exists) {
      const newSelected =
        selectedPatches.filter(
          (item) =>
            item.id !==
            patch.id
        );

      setSelectedPatches(
        newSelected
      );

      removePatchFromCart(
        patch.id
      );

      /*
       * Keep compatibility
       * with the T-shirt page.
       */

      if (
        newSelected.length === 0
      ) {
        localStorage.removeItem(
          "selah-selected-patch"
        );
      } else {
        localStorage.setItem(
          "selah-selected-patch",
          JSON.stringify(
            newSelected[0]
          )
        );
      }

      return;
    }

    const newSelected = [
      ...selectedPatches,
      patch,
    ];

    setSelectedPatches(
      newSelected
    );

    /*
     * Immediately add
     * patch to cart.
     */

    const newCart =
      addPatchToCart(
        patch
      );

    saveCart(newCart);

    /*
     * Keep the first selected
     * patch compatible with
     * the current T-shirt page.
     */

    localStorage.setItem(
      "selah-selected-patch",
      JSON.stringify(
        newSelected[0]
      )
    );
  };

  /*
   * =====================================================
   * RETURN TO TSHIRTS
   * =====================================================
   */

  const returnToTshirts =
    () => {
      localStorage.setItem(
        "selah-selected-patches",
        JSON.stringify(
          selectedPatches
        )
      );

      if (
        selectedPatches.length > 0
      ) {
        localStorage.setItem(
          "selah-selected-patch",
          JSON.stringify(
            selectedPatches[0]
          )
        );
      }

      window.location.href =
        "/tshirts";
    };

  return (
    <main className="min-h-screen bg-black text-white">

      {/* =================================================
          HEADER
      ================================================= */}

      <section className="mx-auto max-w-7xl px-6 pt-14">

        <div
          className="
            flex
            flex-col
            gap-10
            md:flex-row
            md:items-end
            md:justify-between
          "
        >

          <div>

            <p
              className="
                text-xs
                uppercase
                tracking-[0.45em]
                text-white/40
              "
            >
              {t.label}
            </p>

            <h1
              className="
                mt-5
                text-4xl
                font-light
                tracking-tight
                md:text-6xl
              "
            >
              {t.title}
            </h1>

            <p
              className="
                mt-6
                max-w-2xl
                text-sm
                leading-7
                text-white/50
                md:text-base
              "
            >
              {t.description}
            </p>

          </div>


          {/* LANGUAGE SWITCH */}

          <div className="shrink-0">

            <p
              className="
                mb-3
                text-right
                text-[10px]
                uppercase
                tracking-[0.3em]
                text-white/30
              "
            >
              {t.language}
            </p>

            <div
              className="
                flex
                rounded-full
                border
                border-white/10
                bg-white/[0.04]
                p-1
              "
            >

              <button
                type="button"
                onClick={() =>
                  changeLanguage(
                    "uk"
                  )
                }
                className={`
                  min-w-[70px]
                  rounded-full
                  px-5
                  py-3
                  text-xs
                  font-medium
                  transition-all
                  duration-300
                  ${
                    language === "uk"
                      ? "bg-white text-black shadow-lg"
                      : "text-white/50 hover:text-white"
                  }
                `}
              >
                UA
              </button>

              <button
                type="button"
                onClick={() =>
                  changeLanguage(
                    "es"
                  )
                }
                className={`
                  min-w-[70px]
                  rounded-full
                  px-5
                  py-3
                  text-xs
                  font-medium
                  transition-all
                  duration-300
                  ${
                    language === "es"
                      ? "bg-white text-black shadow-lg"
                      : "text-white/50 hover:text-white"
                  }
                `}
              >
                ES
              </button>

            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          PATCH GRID
      ================================================= */}

      <section
        className="
          mx-auto
          max-w-7xl
          px-6
          py-16
        "
      >

        <div
          className="
            grid
            gap-6
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
          "
        >

          {visiblePatches.map(
            (patch) => {

              const selected =
                isSelected(
                  patch.id
                );

              return (
                <article
                  key={patch.id}
                  className="
                    group
                    relative
                    transition-all
                    duration-500
                    hover:-translate-y-2
                    hover:scale-[1.015]
                  "
                >

                  {/* COLORED OUTLINE */}

                  <div
                    className={`
                      pointer-events-none
                      absolute
                      -inset-[2px]
                      rounded-[2rem]
                      blur-[3px]
                      transition-all
                      duration-500
                      ${
                        selected
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                      }
                    `}
                    style={{
                      background:
                        "conic-gradient(from 0deg, #ffffff, #7dd3fc, #c084fc, #f9a8d4, #ffffff)",
                    }}
                  />

                  {/* CARD */}

                  <div
                    className={`
                      relative
                      overflow-hidden
                      rounded-[2rem]
                      border
                      bg-[#080808]
                      transition-all
                      duration-500
                      ${
                        selected
                          ? "border-white/80 shadow-[0_0_35px_rgba(255,255,255,0.15)]"
                          : "border-white/10 group-hover:border-white/50"
                      }
                    `}
                  >

                    {/* IMAGE */}

                    <div
                      className="
                        relative
                        aspect-square
                        overflow-hidden
                      "
                    >

                      <img
                        src={
                          patch.image
                        }
                        alt="SELAH patch"
                        className="
                          h-full
                          w-full
                          object-cover
                          transition-transform
                          duration-700
                          ease-out
                          group-hover:scale-[1.07]
                        "
                      />

                      {/* IMAGE OVERLAY */}

                      <div
                        className="
                          pointer-events-none
                          absolute
                          inset-0
                          bg-gradient-to-t
                          from-black/35
                          via-transparent
                          to-transparent
                          opacity-0
                          transition-opacity
                          duration-500
                          group-hover:opacity-100
                        "
                      />

                      {/* SELECTED */}

                      {selected && (
                        <div
                          className="
                            absolute
                            left-4
                            top-4
                            rounded-full
                            border
                            border-white/20
                            bg-black/75
                            px-4
                            py-2
                            text-[10px]
                            uppercase
                            tracking-[0.2em]
                            backdrop-blur-xl
                          "
                        >
                          {t.selected}
                        </div>
                      )}

                    </div>


                    {/* INFO */}

                    <div className="p-5">

                      <div
                        className="
                          flex
                          items-center
                          justify-between
                          gap-4
                        "
                      >

                        <p
                          className="
                            text-[10px]
                            uppercase
                            tracking-[0.3em]
                            text-white/30
                          "
                        >
                          SELAH
                        </p>

                        <p
                          className="
                            text-lg
                            font-light
                          "
                        >
                          {patch.price
                            .toFixed(2)
                            .replace(
                              ".",
                              ","
                            )}{" "}
                          €
                        </p>

                      </div>


                      {/* BUTTON */}

                      <button
                        type="button"
                        onClick={() =>
                          togglePatch(
                            patch
                          )
                        }
                        className={`
                          mt-6
                          w-full
                          rounded-full
                          border
                          px-5
                          py-3.5
                          text-xs
                          uppercase
                          tracking-[0.15em]
                          transition-all
                          duration-300
                          ${
                            selected
                              ? "border-white bg-white text-black shadow-[0_0_25px_rgba(255,255,255,0.18)]"
                              : "border-white/20 text-white hover:border-white hover:bg-white hover:text-black"
                          }
                        `}
                      >
                        {selected
                          ? t.added
                          : t.choose}
                      </button>

                    </div>

                  </div>

                </article>
              );
            }
          )}

        </div>

      </section>


      {/* =================================================
          RETURN
      ================================================= */}

      <section
        className="
          mx-auto
          max-w-7xl
          px-6
          pb-24
        "
      >

        <button
          type="button"
          onClick={
            returnToTshirts
          }
          className="
            w-full
            rounded-full
            border
            border-white/15
            px-8
            py-5
            text-sm
            uppercase
            tracking-[0.2em]
            text-white
            transition-all
            duration-300
            hover:border-white
            hover:bg-white
            hover:text-black
          "
        >
          {t.back}
        </button>

      </section>


      {/* =================================================
          FOOTER
      ================================================= */}

      <footer
        className="
          border-t
          border-white/10
          px-6
          py-20
          text-center
        "
      >

        <p
          className="
            text-xs
            uppercase
            tracking-[0.45em]
            text-white/30
          "
        >
          SELAH
        </p>

      </footer>

    </main>
  );
}