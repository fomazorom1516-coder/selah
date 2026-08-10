"use client";

import { useEffect, useState } from "react";

const sizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];

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
  name: string;
  description: string;
  images: string[];
  price: number;
  material: string;
  weight: string;
  gender: string;
  cut: string;
  sleeve: string;
  buttons?: string;
  color: {
    name: string;
    value: string;
  };
};

const tshirts: TShirt[] = [
  {
    id: "premium-polo",

    name: "SELAH — Premium Polo",

    description:
      "Преміальне чоловіче поло з коротким рукавом. Вишитий символ SELAH розташований на грудях. На спині передбачене місце для змінного Velcro-патча.",

    images: [
      "/images/products/tshirt-05.PNG",
    ],

    price: 29.99,

    material: "95% algodón / 5% elastano",

    weight: "215 g/m²",

    gender: "Hombre",

    cut: "Premium Polo",

    sleeve: "Короткий",

    buttons: "2 buttons / pearl look",

    color: {
      name: "Black",
      value: "#111111",
    },
  },

  {
    id: "unisex-royal-blue",

    name: "SELAH — Unisex Royal Blue",

    description:
      "Універсальна футболка SELAH у кольорі Royal Blue. Підходить як для чоловіків, так і для жінок. Мінімалістичний дизайн створений для щоденного носіння та поєднання зі змінними SELAH-патчами.",

    images: [
      "/images/products/tshirt-02.PNG",
      "/images/products/tshirt-04.PNG",
    ],

    price: 19.99,

    material:
      "Punto liso, 100% algodón peinado y pre encogido",

    weight: "160 g/m²",

    gender: "Unisex",

    cut: "Regular",

    sleeve: "Короткий",

    color: {
      name: "Royal Blue",
      value: "#2455a4",
    },
  },

  {
    id: "unisex-navy",

    name: "SELAH — Unisex Navy",

    description:
      "Універсальна футболка SELAH у темно-синьому кольорі. Підходить як для чоловіків, так і для жінок. Легка та комфортна модель для щоденного носіння з мінімалістичним вишитим символом SELAH.",

    images: [
      "/images/products/tshirt-06.PNG",
    ],

    price: 19.99,

    material:
      "100% algodón peinado y pre-encogido",

    weight: "140 g/m²",

    gender: "Unisex",

    cut: "Regular",

    sleeve: "Короткий",

    color: {
      name: "Dark Navy",
      value: "#18202b",
    },
  },

  {
    id: "oversize-zen",

    name: "SELAH — Oversize Zen",

    description:
      "Щільна oversize футболка SELAH з преміальним відчуттям тканини. Вільний крій створює сучасний повсякденний образ. Підходить як для чоловіків, так і для жінок.",

    images: [
      "/images/products/tshirt-07.PNG",
      "/images/products/tshirt-08.PNG",
    ],

    price: 19.99,

    material:
      "100% algodón pesado",

    weight: "210 g/m²",

    gender: "Unisex",

    cut: "Oversize",

    sleeve: "Короткий",

    color: {
      name: "Azul Zen 263",
      value: "#7b8490",
    },
  },
];

export default function TshirtsPage() {
  const [selectedSize, setSelectedSize] = useState("M");

  const [selectedPatch, setSelectedPatch] =
    useState<SelectedPatch | null>(null);

  const [quantity, setQuantity] = useState(1);

  const [expandedProduct, setExpandedProduct] =
    useState<string | null>(null);

  const [currentImages, setCurrentImages] =
    useState<Record<string, number>>({});

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
      localStorage.removeItem("selah-selected-patch");
    }
  }, []);

  /*
  ========================================================
  REMOVE PATCH
  ========================================================
  */

  const removePatch = () => {
    localStorage.removeItem("selah-selected-patch");

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
  CHANGE PRODUCT IMAGE
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

    /*
    ======================================================
    ADD T-SHIRT
    ======================================================
    */

    const tshirtItem: CartItem = {
      id:
        "tshirt-" +
        product.id +
        "-" +
        product.color.name +
        "-" +
        selectedSize +
        "-" +
        Date.now(),

      type: "tshirt",

      title: product.name,

      image: product.images[0],

      price: product.price,

      color: product.color.name,

      size: selectedSize,

      quantity,
    };

    cart.push(tshirtItem);

    /*
    ======================================================
    ADD SELECTED PATCH
    ======================================================
    */

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

        reference: selectedPatch.reference,

        quantity: 1,
      };

      cart.push(patchItem);
    }

    /*
    ======================================================
    SAVE
    ======================================================
    */

    localStorage.setItem(
      "selah-cart",
      JSON.stringify(cart)
    );

    /*
    ======================================================
    UPDATE FLOATING CART
    ======================================================
    */

    window.dispatchEvent(
      new Event("selah-cart-updated")
    );

    /*
    ======================================================
    GO TO CART
    ======================================================
    */

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

      {/* ==================================================
          HEADER
      ================================================== */}

      <section className="mx-auto max-w-7xl px-6 pt-16 pb-12">

        <p className="text-xs uppercase tracking-[0.4em] text-white/40">
          SELAH
        </p>

        <h1 className="mt-5 text-4xl font-light tracking-tight md:text-6xl">
          Футболки
        </h1>

        <p className="mt-5 max-w-2xl text-sm leading-7 text-white/50 md:text-base">
          Носи не просто одяг. Носи своє послання.
        </p>

      </section>

      {/* ==================================================
          PRODUCT GRID
      ================================================== */}

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

                {/* ==================================================
                    PHOTO
                ================================================== */}

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
                      src={product.images[currentImage]}
                      alt={product.name}
                      className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-700
                        group-hover:scale-[1.05]
                      "
                    />

                    {/* GLOW */}

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

                    {/* OVERLAY */}

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

                    {/* SELAH */}

                    <div className="
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
                    ">
                      SELAH
                    </div>

                  </div>

                </button>

                {/* ==================================================
                    IMAGE SELECTOR
                ================================================== */}

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

                {/* ==================================================
                    BASIC INFORMATION
                ================================================== */}

                <div className="p-5">

                  <div className="flex items-start justify-between gap-4">

                    <div>

                      <h2 className="text-lg font-medium">
                        {product.name}
                      </h2>

                      <p className="mt-2 line-clamp-2 text-xs leading-5 text-white/40">
                        {product.description}
                      </p>

                    </div>

                    <span className="shrink-0 text-sm">
                      {product.price
                        .toFixed(2)
                        .replace(".", ",")}{" "}
                      €
                    </span>

                  </div>

                  {/* ==================================================
                      EXPANDED
                  ================================================== */}

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
                          {product.description}
                        </p>

                      </div>

                      {/* DETAILS */}

                      <div className="mt-6 space-y-3">

                        <Detail
                          name="Матеріал"
                          value={product.material}
                        />

                        <Detail
                          name="Щільність"
                          value={product.weight}
                        />

                        <Detail
                          name="Стать"
                          value={product.gender}
                        />

                        <Detail
                          name="Крій"
                          value={product.cut}
                        />

                        <Detail
                          name="Рукав"
                          value={product.sleeve}
                        />

                        {product.buttons && (
                          <Detail
                            name="Ґудзики"
                            value={product.buttons}
                          />
                        )}

                        <Detail
                          name="Патч"
                          value="Velcro / removable"
                          last
                        />

                      </div>

                      {/* ==================================================
                          COLOR
                      ================================================== */}

                      <div className="mt-7">

                        <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                          Колір
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
                            {product.color.name}
                          </span>

                        </div>

                      </div>

                      {/* ==================================================
                          SIZE
                      ================================================== */}

                      <div className="mt-7">

                        <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                          Розмір
                        </p>

                        <div className="mt-4 grid grid-cols-4 gap-2">

                          {sizes.map((size) => (

                            <button
                              key={size}
                              type="button"
                              onClick={() =>
                                setSelectedSize(size)
                              }
                              className={`
                                h-10
                                rounded-lg
                                border
                                text-xs
                                transition-all

                                ${
                                  selectedSize === size
                                    ? "border-white bg-white text-black"
                                    : "border-white/15 bg-white/[0.03] hover:border-white/60"
                                }
                              `}
                            >
                              {size}
                            </button>

                          ))}

                        </div>

                      </div>

                      {/* ==================================================
                          QUANTITY
                      ================================================== */}

                      <div className="mt-7">

                        <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                          Кількість
                        </p>

                        <div className="
                          mt-4
                          inline-flex
                          items-center
                          rounded-xl
                          border
                          border-white/15
                          bg-white/[0.03]
                        ">

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

                      {/* ==================================================
                          PATCH
                      ================================================== */}

                      <div className="
                        mt-7
                        rounded-2xl
                        border
                        border-white/10
                        bg-black/30
                        p-4
                      ">

                        <div className="flex items-center gap-3">

                          <div className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-white/15
                          ">
                            ✦
                          </div>

                          <div className="min-w-0">

                            <p className="text-sm">
                              {selectedPatch
                                ? "Обраний патч"
                                : "Додай свій патч"}
                            </p>

                            <p className="mt-1 text-xs text-white/40">

                              {selectedPatch
                                ? `${selectedPatch.title} — ${selectedPatch.reference}`
                                : "Змінний Velcro-патч для твого образу SELAH."}

                            </p>

                          </div>

                        </div>

                        {selectedPatch && (

                          <div className="
                            mt-4
                            flex
                            items-center
                            gap-3
                            rounded-xl
                            border
                            border-white/10
                            bg-black
                            p-2
                          ">

                            <img
                              src={selectedPatch.image}
                              alt={selectedPatch.title}
                              className="
                                h-14
                                w-14
                                rounded-lg
                                object-cover
                              "
                            />

                            <div className="min-w-0 flex-1">

                              <p className="truncate text-xs">
                                {selectedPatch.title}
                              </p>

                              <p className="mt-1 text-[10px] text-white/40">
                                {selectedPatch.reference}
                              </p>

                              <p className="mt-1 text-xs">
                                {selectedPatch.price
                                  .toFixed(2)
                                  .replace(".", ",")}{" "}
                                €
                              </p>

                            </div>

                            <button
                              type="button"
                              onClick={removePatch}
                              className="
                                text-[10px]
                                text-white/35
                                transition
                                hover:text-white
                              "
                            >
                              Видалити
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
                            ? "Змінити патч →"
                            : "Обрати патч →"}
                        </button>

                      </div>

                      {/* ==================================================
                          TOTAL
                      ================================================== */}

                      <div className="
                        mt-6
                        flex
                        items-center
                        justify-between
                        border-t
                        border-white/10
                        pt-5
                      ">

                        <span className="text-xs text-white/40">
                          Разом
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
                            .replace(".", ",")}{" "}
                          €

                        </span>

                      </div>

                      {/* ==================================================
                          ADD TO CART
                      ================================================== */}

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
                        Додати в кошик →
                      </button>

                      {/* CLOSE */}

                      <button
                        type="button"
                        onClick={() =>
                          toggleProduct(product.id)
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
                        Закрити ↑
                      </button>

                    </div>

                  </div>

                </div>

              </article>
            );
          })}

        </div>

      </section>

      {/* ==================================================
          FOOTER
      ================================================== */}

      <section className="
        border-t
        border-white/10
        px-6
        py-24
        text-center
      ">

        <p className="
          text-xs
          uppercase
          tracking-[0.4em]
          text-white/40
        ">
          SELAH
        </p>

        <h2 className="
          mx-auto
          mt-6
          max-w-2xl
          text-3xl
          font-light
          leading-tight
          md:text-5xl
        ">
          Носи не просто одяг.
          <br />
          Носи своє послання.
        </h2>

        <p className="
          mx-auto
          mt-6
          max-w-xl
          text-white/50
        ">
          Один одяг — різні послання.
          Змінюй патч і нагадуй собі про те,
          що справді важливе.
        </p>

      </section>

    </main>
  );
}


/* =========================================================
   DETAIL COMPONENT
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