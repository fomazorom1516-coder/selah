"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Language = "uk" | "es";

type CartItem = {
  id: string;
  type?: "tshirt" | "patch" | "headwear";
  category?: "tshirt" | "patch" | "headwear";
  title?: string;
  name?: string;
  image: string;
  price: number;
  color?: string;
  size?: string;
  reference?: string;
  quantity: number;
};

type CustomerForm = {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  comment: string;
};

const translations = {
  uk: {
    cart: "Кошик",
    itemsInCart: "у кошику",
    item: "товар",
    items: "товари",

    emptyTitle: "Ваш кошик поки порожній.",
    emptyDescription:
      "Оберіть футболку, патч або головний убір, щоб створити свій власний образ SELAH.",
    goToTshirts: "Перейти до футболок →",

    tshirt: "Футболка",
    patch: "Патч",
    headwear: "Головний убір",
    color: "Колір",
    size: "Розмір",
    remove: "Видалити",

    summary: "Підсумок",
    products: "Товари",
    total: "Разом",

    checkout: "Оформити замовлення",
    continue: "← Продовжити покупки",

    customerData: "Дані клієнта",
    name: "Ім'я та прізвище",
    phone: "Телефон",
    email: "Email",
    address: "Адреса доставки",
    city: "Місто",
    postalCode: "Поштовий індекс",
    comment: "Коментар до замовлення",

    namePlaceholder: "Ваше ім'я та прізвище",
    phonePlaceholder: "+34 600 000 000",
    emailPlaceholder: "example@email.com",
    addressPlaceholder: "Вулиця, будинок, квартира",
    cityPlaceholder: "Малага",
    postalCodePlaceholder: "29001",
    commentPlaceholder: "Додаткова інформація...",

    paymentInfo: "Оплата",
    paymentDescription:
      "Оплату та спосіб отримання замовлення ми узгодимо з вами напряму після підтвердження.",

    confirm: "Підтвердити замовлення",
    back: "← Повернутися до кошика",

    sending: "Надсилання...",
    successTitle: "Замовлення прийнято!",
    successDescription:
      "Дякуємо! Ми отримали ваше замовлення. Зв'яжемося з вами для підтвердження та узгодження оплати.",

    backToShop: "Повернутися до магазину →",

    required: "Заповніть ім'я та номер телефону.",
    error:
      "Не вдалося відправити замовлення. Спробуйте ще раз.",
  },

  es: {
    cart: "Carrito",
    itemsInCart: "en el carrito",
    item: "producto",
    items: "productos",

    emptyTitle: "Tu carrito está vacío.",
    emptyDescription:
      "Elige una camiseta, un parche o un accesorio para crear tu propio estilo SELAH.",
    goToTshirts: "Ir a camisetas →",

    tshirt: "Camiseta",
    patch: "Parche",
    headwear: "Gorra / sombrero",
    color: "Color",
    size: "Talla",
    remove: "Eliminar",

    summary: "Resumen",
    products: "Productos",
    total: "Total",

    checkout: "Realizar pedido",
    continue: "← Continuar comprando",

    customerData: "Datos del cliente",
    name: "Nombre y apellidos",
    phone: "Teléfono",
    email: "Email",
    address: "Dirección de entrega",
    city: "Ciudad",
    postalCode: "Código postal",
    comment: "Comentario",

    namePlaceholder: "Nombre y apellidos",
    phonePlaceholder: "+34 600 000 000",
    emailPlaceholder: "example@email.com",
    addressPlaceholder: "Calle, número, apartamento",
    cityPlaceholder: "Málaga",
    postalCodePlaceholder: "29001",
    commentPlaceholder: "Información adicional...",

    paymentInfo: "Pago",
    paymentDescription:
      "El pago y la forma de entrega se acordarán directamente contigo después de confirmar el pedido.",

    confirm: "Confirmar pedido",
    back: "← Volver al carrito",

    sending: "Enviando...",
    successTitle: "¡Pedido recibido!",
    successDescription:
      "¡Gracias! Hemos recibido tu pedido. Nos pondremos en contacto contigo para confirmar el pedido y acordar el pago.",

    backToShop: "Volver a la tienda →",

    required: "Introduce tu nombre y número de teléfono.",
    error:
      "No se ha podido enviar el pedido. Inténtalo de nuevo.",
  },
};

/* =========================================================
   LANGUAGE
========================================================= */

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

/* =========================================================
   HEADWEAR TRANSLATIONS
========================================================= */

const headwearTranslations: Record<
  string,
  {
    uk: string;
    es: string;
  }
> = {
  classic: {
    uk: "Класична бейсболка",
    es: "Gorra clásica",
  },

  performance: {
    uk: "Спортивна бейсболка",
    es: "Gorra deportiva",
  },

  trucker: {
    uk: "Бейсболка Trucker",
    es: "Gorra Trucker",
  },

  bucket: {
    uk: "Панама",
    es: "Sombrero Bucket",
  },
};

/* =========================================================
   PRODUCT NAME
========================================================= */

function getLocalizedProductName(
  item: CartItem,
  language: Language
) {
  const rawId = item.id;

  if (rawId.startsWith("headwear-")) {
    const productId = rawId
      .replace("headwear-", "")
      .split("-")[0];

    const translation =
      headwearTranslations[productId];

    if (translation) {
      return translation[language];
    }
  }

  if (item.name) {
    return item.name;
  }

  if (item.title) {
    return item.title;
  }

  return "";
}

/* =========================================================
   PRODUCT TYPE
========================================================= */

function getProductType(
  item: CartItem,
  language: Language
) {
  const type = item.type || item.category;
  const t = translations[language];

  if (type === "tshirt") {
    return t.tshirt;
  }

  if (type === "patch") {
    return t.patch;
  }

  return t.headwear;
}

/* =========================================================
   COMPONENT
========================================================= */

export default function CartPage() {
  const [items, setItems] =
    useState<CartItem[]>([]);

  const [language, setLanguage] =
    useState<Language>("uk");

  const [checkoutOpen, setCheckoutOpen] =
    useState(false);

  const [sending, setSending] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

  const [error, setError] =
    useState("");

  const [customer, setCustomer] =
    useState<CustomerForm>({
      name: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      postalCode: "",
      comment: "",
    });

  /* =======================================================
     LANGUAGE
  ======================================================= */

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

  const t = translations[language];

  /* =======================================================
     LOAD CART
  ======================================================= */

  useEffect(() => {
    const loadCart = () => {
      try {
        const saved =
          localStorage.getItem("selah-cart");

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

    window.addEventListener(
      "selah-cart-updated",
      loadCart
    );

    return () => {
      window.removeEventListener(
        "selah-cart-updated",
        loadCart
      );
    };
  }, []);

  /* =======================================================
     SAVE CART
  ======================================================= */

  const saveCart = (
    newItems: CartItem[]
  ) => {
    setItems(newItems);

    localStorage.setItem(
      "selah-cart",
      JSON.stringify(newItems)
    );

    window.dispatchEvent(
      new Event("selah-cart-updated")
    );
  };

  /* =======================================================
     INCREASE
  ======================================================= */

  const increase = (id: string) => {
    const newItems = items.map(
      (item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                item.quantity + 1,
            }
          : item
    );

    saveCart(newItems);
  };

  /* =======================================================
     DECREASE
  ======================================================= */

  const decrease = (id: string) => {
    const newItems = items
      .map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                item.quantity - 1,
            }
          : item
      )
      .filter(
        (item) => item.quantity > 0
      );

    saveCart(newItems);
  };

  /* =======================================================
     REMOVE
  ======================================================= */

  const remove = (id: string) => {
    const newItems = items.filter(
      (item) => item.id !== id
    );

    saveCart(newItems);
  };

  /* =======================================================
     CUSTOMER
  ======================================================= */

  const updateCustomer = (
    field: keyof CustomerForm,
    value: string
  ) => {
    setCustomer((previous) => ({
      ...previous,
      [field]: value,
    }));

    setError("");
  };

  /* =======================================================
     TOTAL
  ======================================================= */

  const total = items.reduce(
    (sum, item) =>
      sum +
      item.price *
        item.quantity,
    0
  );

  const quantity = items.reduce(
    (sum, item) =>
      sum +
      item.quantity,
    0
  );

  const quantityLabel =
    quantity === 1
      ? t.item
      : t.items;

  /* =======================================================
     CHECKOUT
  ======================================================= */

  const openCheckout = () => {
    setError("");
    setCheckoutOpen(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const closeCheckout = () => {
    if (!sending) {
      setCheckoutOpen(false);
      setError("");
    }
  };

  /* =======================================================
     SEND ORDER
  ======================================================= */

  const submitOrder = async () => {
    setError("");

    if (
      !customer.name.trim() ||
      !customer.phone.trim()
    ) {
      setError(t.required);
      return;
    }

    if (items.length === 0) {
      return;
    }

    setSending(true);

    try {
      const response = await fetch(
        "/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            customer: {
              name: customer.name.trim(),
              phone: customer.phone.trim(),
              email:
                customer.email.trim(),
              address:
                customer.address.trim(),
              city:
                customer.city.trim(),
              postalCode:
                customer.postalCode.trim(),
              comment:
                customer.comment.trim(),
            },

            items,

            total,

            language,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || "Order failed"
        );
      }

      setSuccess(true);

      localStorage.removeItem(
        "selah-cart"
      );

      setItems([]);

      window.dispatchEvent(
        new Event("selah-cart-updated")
      );
    } catch (err) {
      console.error(err);
      setError(t.error);
    } finally {
      setSending(false);
    }
  };

  /* =======================================================
     SUCCESS
  ======================================================= */

  if (success) {
    return (
      <main className="min-h-screen bg-black px-6 py-16 text-white">

        <div className="mx-auto flex min-h-[70vh] max-w-2xl items-center justify-center">

          <div className="w-full rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-3xl">
              ✓
            </div>

            <p className="mt-8 text-xs uppercase tracking-[0.4em] text-white/40">
              SELAH
            </p>

            <h1 className="mt-4 text-4xl font-light">
              {t.successTitle}
            </h1>

            <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-white/50">
              {t.successDescription}
            </p>

            <Link
              href="/"
              className="
                mt-8
                inline-flex
                rounded-full
                bg-white
                px-8
                py-4
                text-sm
                uppercase
                tracking-[0.2em]
                text-black
                transition
                hover:scale-[1.02]
              "
            >
              {t.backToShop}
            </Link>

          </div>

        </div>

      </main>
    );
  }

  /* =======================================================
     RETURN
  ======================================================= */

  return (
    <main className="min-h-screen bg-black px-4 py-16 text-white sm:px-6">

      <div className="mx-auto max-w-5xl">

        {/* HEADER */}

        <div className="mb-12">

          <p className="text-xs uppercase tracking-[0.4em] text-white/40">
            SELAH
          </p>

          <h1 className="mt-4 text-5xl font-light">
            {checkoutOpen
              ? t.customerData
              : t.cart}
          </h1>

          {!checkoutOpen &&
            items.length > 0 && (
              <p className="mt-4 text-sm text-white/40">
                {quantity}{" "}
                {quantityLabel}{" "}
                {t.itemsInCart}
              </p>
            )}

        </div>

        {/* ===================================================
            CHECKOUT
        =================================================== */}

        {checkoutOpen ? (

          <div className="grid gap-10 lg:grid-cols-[1fr_350px]">

            {/* CUSTOMER FORM */}

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">

              <div>

                <p className="text-xs uppercase tracking-[0.3em] text-white/30">
                  SELAH
                </p>

                <h2 className="mt-3 text-2xl font-light">
                  {t.customerData}
                </h2>

              </div>

              <div className="mt-8 space-y-5">

                {/* NAME */}

                <div>

                  <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-white/40">
                    {t.name} *
                  </label>

                  <input
                    type="text"
                    value={customer.name}
                    onChange={(event) =>
                      updateCustomer(
                        "name",
                        event.target.value
                      )
                    }
                    placeholder={
                      t.namePlaceholder
                    }
                    className="
                      w-full
                      rounded-2xl
                      border
                      border-white/10
                      bg-white/[0.03]
                      px-4
                      py-4
                      text-sm
                      text-white
                      outline-none
                      placeholder:text-white/20
                      focus:border-white/40
                    "
                  />

                </div>

                {/* PHONE */}

                <div>

                  <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-white/40">
                    {t.phone} *
                  </label>

                  <input
                    type="tel"
                    value={customer.phone}
                    onChange={(event) =>
                      updateCustomer(
                        "phone",
                        event.target.value
                      )
                    }
                    placeholder={
                      t.phonePlaceholder
                    }
                    className="
                      w-full
                      rounded-2xl
                      border
                      border-white/10
                      bg-white/[0.03]
                      px-4
                      py-4
                      text-sm
                      text-white
                      outline-none
                      placeholder:text-white/20
                      focus:border-white/40
                    "
                  />

                </div>

                {/* EMAIL */}

                <div>

                  <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-white/40">
                    {t.email}
                  </label>

                  <input
                    type="email"
                    value={customer.email}
                    onChange={(event) =>
                      updateCustomer(
                        "email",
                        event.target.value
                      )
                    }
                    placeholder={
                      t.emailPlaceholder
                    }
                    className="
                      w-full
                      rounded-2xl
                      border
                      border-white/10
                      bg-white/[0.03]
                      px-4
                      py-4
                      text-sm
                      text-white
                      outline-none
                      placeholder:text-white/20
                      focus:border-white/40
                    "
                  />

                </div>

                {/* ADDRESS */}

                <div>

                  <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-white/40">
                    {t.address}
                  </label>

                  <input
                    type="text"
                    value={customer.address}
                    onChange={(event) =>
                      updateCustomer(
                        "address",
                        event.target.value
                      )
                    }
                    placeholder={
                      t.addressPlaceholder
                    }
                    className="
                      w-full
                      rounded-2xl
                      border
                      border-white/10
                      bg-white/[0.03]
                      px-4
                      py-4
                      text-sm
                      text-white
                      outline-none
                      placeholder:text-white/20
                      focus:border-white/40
                    "
                  />

                </div>

                {/* CITY + POSTAL */}

                <div className="grid gap-5 sm:grid-cols-2">

                  <div>

                    <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-white/40">
                      {t.city}
                    </label>

                    <input
                      type="text"
                      value={customer.city}
                      onChange={(event) =>
                        updateCustomer(
                          "city",
                          event.target.value
                        )
                      }
                      placeholder={
                        t.cityPlaceholder
                      }
                      className="
                        w-full
                        rounded-2xl
                        border
                        border-white/10
                        bg-white/[0.03]
                        px-4
                        py-4
                        text-sm
                        text-white
                        outline-none
                        placeholder:text-white/20
                        focus:border-white/40
                      "
                    />

                  </div>

                  <div>

                    <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-white/40">
                      {t.postalCode}
                    </label>

                    <input
                      type="text"
                      value={
                        customer.postalCode
                      }
                      onChange={(event) =>
                        updateCustomer(
                          "postalCode",
                          event.target.value
                        )
                      }
                      placeholder={
                        t.postalCodePlaceholder
                      }
                      className="
                        w-full
                        rounded-2xl
                        border
                        border-white/10
                        bg-white/[0.03]
                        px-4
                        py-4
                        text-sm
                        text-white
                        outline-none
                        placeholder:text-white/20
                        focus:border-white/40
                      "
                    />

                  </div>

                </div>

                {/* COMMENT */}

                <div>

                  <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-white/40">
                    {t.comment}
                  </label>

                  <textarea
                    value={
                      customer.comment
                    }
                    onChange={(event) =>
                      updateCustomer(
                        "comment",
                        event.target.value
                      )
                    }
                    placeholder={
                      t.commentPlaceholder
                    }
                    rows={4}
                    className="
                      w-full
                      resize-none
                      rounded-2xl
                      border
                      border-white/10
                      bg-white/[0.03]
                      px-4
                      py-4
                      text-sm
                      text-white
                      outline-none
                      placeholder:text-white/20
                      focus:border-white/40
                    "
                  />

                </div>

              </div>

              {/* PAYMENT INFO */}

              <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5">

                <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                  {t.paymentInfo}
                </p>

                <p className="mt-3 text-sm leading-6 text-white/50">
                  {t.paymentDescription}
                </p>

              </div>

              {/* ERROR */}

              {error && (
                <div className="mt-5 rounded-2xl border border-red-500/20 bg-red-500/[0.05] p-4 text-sm text-red-300">
                  {error}
                </div>
              )}

              {/* BUTTONS */}

              <div className="mt-8 flex flex-col gap-3">

                <button
                  type="button"
                  onClick={submitOrder}
                  disabled={sending}
                  className="
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
                    hover:scale-[1.01]
                    hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  {sending
                    ? t.sending
                    : t.confirm}
                </button>

                <button
                  type="button"
                  onClick={closeCheckout}
                  disabled={sending}
                  className="
                    py-3
                    text-center
                    text-sm
                    text-white/40
                    transition
                    hover:text-white
                    disabled:opacity-30
                  "
                >
                  {t.back}
                </button>

              </div>

            </div>

            {/* ORDER SUMMARY */}

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
                {t.summary}
              </h2>

              <div className="mt-7 space-y-4">

                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between gap-4 text-sm"
                  >
                    <span className="text-white/50">
                      {getLocalizedProductName(
                        item,
                        language
                      )}{" "}
                      × {item.quantity}
                    </span>

                    <span className="shrink-0">
                      {(item.price *
                        item.quantity)
                        .toFixed(2)
                        .replace(
                          ".",
                          ","
                        )}{" "}
                      €
                    </span>
                  </div>
                ))}

              </div>

              <div className="mt-7 border-t border-white/10 pt-5">

                <div className="flex items-end justify-between">

                  <span className="text-white/50">
                    {t.total}
                  </span>

                  <span className="text-3xl font-light">
                    {total
                      .toFixed(2)
                      .replace(
                        ".",
                        ","
                      )}{" "}
                    €
                  </span>

                </div>

              </div>

            </div>

          </div>

        ) : items.length === 0 ? (

          /* =================================================
             EMPTY CART
          ================================================= */

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-12 text-center">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-3xl">
              🛒
            </div>

            <p className="mt-7 text-xl text-white/70">
              {t.emptyTitle}
            </p>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/40">
              {t.emptyDescription}
            </p>

            <Link
              href="/tshirts"
              className="
                mt-8
                inline-flex
                rounded-full
                bg-white
                px-8
                py-4
                text-sm
                uppercase
                tracking-[0.2em]
                text-black
                transition
                hover:scale-[1.02]
              "
            >
              {t.goToTshirts}
            </Link>

          </div>

        ) : (

          /* =================================================
             CART
          ================================================= */

          <div className="grid gap-10 lg:grid-cols-[1fr_350px]">

            {/* ITEMS */}

            <div className="space-y-4">

              {items.map((item) => {

                const productName =
                  getLocalizedProductName(
                    item,
                    language
                  );

                return (

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
                        alt={productName}
                        className="h-full w-full object-cover"
                      />

                    </div>

                    {/* INFO */}

                    <div className="flex min-w-0 flex-1 flex-col">

                      <div className="flex justify-between gap-4">

                        <div>

                          <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-white/30">
                            {getProductType(
                              item,
                              language
                            )}
                          </p>

                          <h2 className="text-lg">
                            {productName}
                          </h2>

                          {item.reference && (
                            <p className="mt-1 text-xs text-white/30">
                              {item.reference}
                            </p>
                          )}

                          {item.color && (
                            <p className="mt-2 text-sm text-white/40">
                              {t.color}:{" "}
                              {item.color}
                            </p>
                          )}

                          {item.size && (
                            <p className="text-sm text-white/40">
                              {t.size}:{" "}
                              {item.size}
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
                          {t.remove}
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
                          {(item.price *
                            item.quantity)
                            .toFixed(2)
                            .replace(
                              ".",
                              ","
                            )}{" "}
                          €
                        </p>

                      </div>

                    </div>

                  </div>

                );
              })}

            </div>

            {/* SUMMARY */}

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
                {t.summary}
              </h2>

              <div className="mt-7 flex justify-between border-b border-white/10 pb-5 text-sm">

                <span className="text-white/40">
                  {t.products} ({quantity})
                </span>

                <span>
                  {total
                    .toFixed(2)
                    .replace(
                      ".",
                      ","
                    )}{" "}
                  €
                </span>

              </div>

              <div className="mt-5 flex items-end justify-between">

                <span className="text-white/50">
                  {t.total}
                </span>

                <span className="text-3xl font-light">
                  {total
                    .toFixed(2)
                    .replace(
                      ".",
                      ","
                    )}{" "}
                  €
                </span>

              </div>

              <button
                type="button"
                onClick={openCheckout}
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
                {t.checkout}
              </button>

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
                {t.continue}
              </Link>

            </div>

          </div>

        )}

      </div>

    </main>
  );
}