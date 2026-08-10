"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);

  // =========================================================
  // LOAD CART
  // =========================================================

  useEffect(() => {
    const loadCart = () => {
      try {
        const saved = localStorage.getItem("selah-cart");

        if (!saved) {
          setItems([]);
          return;
        }

        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          setItems(parsed);
        } else {
          setItems([]);
        }
      } catch {
        localStorage.removeItem("selah-cart");
        setItems([]);
      }
    };

    loadCart();

    window.addEventListener("selah-cart-updated", loadCart);

    return () => {
      window.removeEventListener("selah-cart-updated", loadCart);
    };
  }, []);

  // =========================================================
  // SAVE CART
  // =========================================================

  const saveCart = (newItems: CartItem[]) => {
    setItems(newItems);

    localStorage.setItem(
      "selah-cart",
      JSON.stringify(newItems)
    );

    // повідомляємо FloatingCart
    window.dispatchEvent(
      new Event("selah-cart-updated")
    );
  };

  // =========================================================
  // INCREASE
  // =========================================================

  const increase = (id: string) => {
    const newItems = items.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item
    );

    saveCart(newItems);
  };

  // =========================================================
  // DECREASE
  // =========================================================

  const decrease = (id: string) => {
    const newItems = items
      .map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      )
      .filter((item) => item.quantity > 0);

    saveCart(newItems);
  };

  // =========================================================
  // REMOVE
  // =========================================================

  const remove = (id: string) => {
    const newItems = items.filter(
      (item) => item.id !== id
    );

    saveCart(newItems);
  };

  // =========================================================
  // TOTAL
  // =========================================================

  const total = items.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  const quantity = items.reduce(
    (sum, item) =>
      sum + item.quantity,
    0
  );

  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">

      <div className="mx-auto max-w-5xl">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-12">

          <p className="text-xs uppercase tracking-[0.4em] text-white/40">
            SELAH
          </p>

          <h1 className="mt-4 text-5xl font-light">
            Кошик
          </h1>

          {items.length > 0 && (
            <p className="mt-4 text-sm text-white/40">
              {quantity}{" "}
              {quantity === 1
                ? "товар"
                : "товари"}{" "}
              у кошику
            </p>
          )}

        </div>


        {/* =================================================
            EMPTY CART
        ================================================= */}

        {items.length === 0 ? (

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-12 text-center">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-3xl">
              🛒
            </div>

            <p className="mt-7 text-xl text-white/70">
              Ваш кошик поки порожній.
            </p>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/40">
              Оберіть футболку, патч або головний убір,
              щоб створити свій власний образ SELAH.
            </p>

            <Link
              href="/tshirts"
              className="mt-8 inline-flex rounded-full bg-white px-8 py-4 text-sm uppercase tracking-[0.2em] text-black transition hover:scale-[1.02]"
            >
              Перейти до футболок →
            </Link>

          </div>

        ) : (

          /* =================================================
             CART
          ================================================= */

          <div className="grid gap-10 lg:grid-cols-[1fr_350px]">

            {/* =================================================
                ITEMS
            ================================================= */}

            <div className="space-y-4">

              {items.map((item) => (

                <div
                  key={item.id}
                  className="
                    flex
                    gap-5
                    rounded-3xl
                    border
                    border-white/10
                    bg-white/[0.03]
                    p-5
                  "
                >

                  {/* IMAGE */}

                  <div className="h-28 w-24 shrink-0 overflow-hidden rounded-2xl bg-zinc-900">

                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />

                  </div>


                  {/* INFO */}

                  <div className="flex min-w-0 flex-1 flex-col">

                    <div className="flex justify-between gap-4">

                      <div>

                        <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-white/30">
                          {item.type === "tshirt"
                            ? "Футболка"
                            : item.type === "patch"
                            ? "Патч"
                            : "Головний убір"}
                        </p>

                        <h2 className="text-lg">
                          {item.title}
                        </h2>

                        {item.reference && (
                          <p className="mt-1 text-xs text-white/30">
                            {item.reference}
                          </p>
                        )}

                        {item.color && (
                          <p className="mt-2 text-sm text-white/40">
                            Колір: {item.color}
                          </p>
                        )}

                        {item.size && (
                          <p className="text-sm text-white/40">
                            Розмір: {item.size}
                          </p>
                        )}

                      </div>


                      {/* REMOVE */}

                      <button
                        type="button"
                        onClick={() =>
                          remove(item.id)
                        }
                        className="
                          shrink-0
                          text-xs
                          text-white/30
                          transition
                          hover:text-white
                        "
                      >
                        Видалити
                      </button>

                    </div>


                    {/* BOTTOM */}

                    <div className="mt-auto flex items-end justify-between pt-5">

                      {/* QUANTITY */}

                      <div className="flex items-center rounded-full border border-white/15">

                        <button
                          type="button"
                          onClick={() =>
                            decrease(item.id)
                          }
                          className="
                            px-4
                            py-2
                            text-white/60
                            transition
                            hover:text-white
                          "
                        >
                          −
                        </button>

                        <span className="min-w-8 text-center text-sm">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            increase(item.id)
                          }
                          className="
                            px-4
                            py-2
                            text-white/60
                            transition
                            hover:text-white
                          "
                        >
                          +
                        </button>

                      </div>


                      {/* PRICE */}

                      <p className="text-lg">

                        {(item.price * item.quantity)
                          .toFixed(2)
                          .replace(".", ",")}{" "}
                        €

                      </p>

                    </div>

                  </div>

                </div>

              ))}

            </div>


            {/* =================================================
                SUMMARY
            ================================================= */}

            <div
              className="
                h-fit
                rounded-3xl
                border
                border-white/10
                bg-white/[0.03]
                p-7
                lg:sticky
                lg:top-8
              "
            >

              <h2 className="text-xl">
                Підсумок
              </h2>


              {/* ITEMS */}

              <div className="mt-7 flex justify-between border-b border-white/10 pb-5 text-sm">

                <span className="text-white/40">
                  Товари ({quantity})
                </span>

                <span>
                  {total
                    .toFixed(2)
                    .replace(".", ",")}{" "}
                  €
                </span>

              </div>


              {/* TOTAL */}

              <div className="mt-5 flex items-end justify-between">

                <span className="text-white/50">
                  Разом
                </span>

                <span className="text-3xl font-light">
                  {total
                    .toFixed(2)
                    .replace(".", ",")}{" "}
                  €
                </span>

              </div>


              {/* CHECKOUT */}

              <button
                type="button"
                className="
                  mt-8
                  w-full
                  rounded-full
                  bg-white
                  px-6
                  py-4
                  text-sm
                  uppercase
                  tracking-[0.2em]
                  text-black
                  transition
                  hover:scale-[1.02]
                  hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]
                "
              >
                Оформити замовлення
              </button>


              {/* CONTINUE */}

              <Link
                href="/tshirts"
                className="
                  mt-4
                  block
                  text-center
                  text-sm
                  text-white/40
                  transition
                  hover:text-white
                "
              >
                ← Продовжити покупки
              </Link>

            </div>

          </div>

        )}

      </div>

    </main>
  );
}