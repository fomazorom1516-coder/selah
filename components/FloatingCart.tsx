"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Language = "uk" | "es";

type CartItem = {
  id: string;
  type?: "tshirt" | "patch" | "headwear";
  category?: "tshirt" | "patch" | "headwear";
  price?: number;
  quantity?: number;
};

const translations = {
  uk: {
    cart: "КОШИК",
    open: "Відкрити кошик",
  },

  es: {
    cart: "CARRITO",
    open: "Abrir carrito",
  },
};

function getLanguage(): Language {
  if (typeof window === "undefined") {
    return "uk";
  }

  const saved = localStorage.getItem("selah-language");

  if (saved === "uk" || saved === "es") {
    return saved;
  }

  return "uk";
}

export default function FloatingCart() {
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);
  const [language, setLanguage] =
    useState<Language>("uk");

  /*
  =========================================================
  LANGUAGE
  =========================================================
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
  =========================================================
  CART
  =========================================================
  */

  useEffect(() => {
    const updateCart = () => {
      try {
        const saved =
          localStorage.getItem("selah-cart");

        if (!saved) {
          setQuantity(0);
          setTotal(0);
          return;
        }

        const cart: CartItem[] =
          JSON.parse(saved);

        const itemsCount =
          cart.reduce(
            (sum, item) =>
              sum +
              (Number(item.quantity) || 1),
            0
          );

        const cartTotal =
          cart.reduce(
            (sum, item) =>
              sum +
              (Number(item.price) || 0) *
                (Number(item.quantity) || 1),
            0
          );

        setQuantity(itemsCount);
        setTotal(cartTotal);
      } catch {
        setQuantity(0);
        setTotal(0);
      }
    };

    updateCart();

    window.addEventListener(
      "storage",
      updateCart
    );

    window.addEventListener(
      "selah-cart-updated",
      updateCart
    );

    return () => {
      window.removeEventListener(
        "storage",
        updateCart
      );

      window.removeEventListener(
        "selah-cart-updated",
        updateCart
      );
    };
  }, []);

  /*
  =========================================================
  TRANSLATION
  =========================================================
  */

  const t = translations[language];

  /*
  =========================================================
  RETURN
  =========================================================
  */

  return (
    <Link
      href="/cart"
      aria-label={t.open}
      className="
        fixed
        bottom-6
        right-6
        z-[9999]
        group
      "
    >

      {/* COLOR GLOW */}

      <div
        className="
          absolute
          -inset-2
          rounded-full
          opacity-70
          blur-xl
          transition-all
          duration-500
          group-hover:opacity-100
          group-hover:blur-2xl
        "
        style={{
          background:
            "conic-gradient(from 0deg, #ffffff, #7dd3fc, #c084fc, #f9a8d4, #ffffff)",
        }}
      />

      {/* CART */}

      <div
        className="
          relative
          flex
          items-center
          gap-3
          rounded-full
          border
          border-white/20
          bg-black/90
          px-4
          py-3
          text-white
          backdrop-blur-xl
          shadow-[0_10px_40px_rgba(0,0,0,0.55)]
          transition-all
          duration-300
          group-hover:scale-105
          group-hover:border-white/50
        "
      >

        {/* ICON */}

        <div
          className="
            relative
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            bg-white/10
          "
        >

          <span className="text-lg">
            🛒
          </span>

          {quantity > 0 && (
            <span
              className="
                absolute
                -right-2
                -top-2
                flex
                h-5
                min-w-5
                items-center
                justify-center
                rounded-full
                bg-white
                px-1
                text-[10px]
                font-bold
                text-black
              "
            >
              {quantity}
            </span>
          )}

        </div>


        {/* INFORMATION */}

        <div
          className="
            hidden
            min-w-[75px]
            sm:block
          "
        >

          <p
            className="
              text-[9px]
              uppercase
              tracking-[0.25em]
              text-white/40
            "
          >
            {t.cart}
          </p>

          <p
            className="
              mt-0.5
              text-sm
              font-medium
            "
          >
            {total
              .toFixed(2)
              .replace(".", ",")}{" "}
            €
          </p>

        </div>


        {/* ARROW */}

        <span
          className="
            text-white/40
            transition-all
            duration-300
            group-hover:translate-x-1
            group-hover:text-white
          "
        >
          →
        </span>

      </div>

    </Link>
  );
}