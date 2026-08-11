import { NextResponse } from "next/server";

type OrderItem = {
  id?: string;
  name?: string;
  title?: string;
  quantity?: number;
  price?: number;
  size?: string;
  color?: string;
  reference?: string;
};

type Customer = {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  comment?: string;
};

type OrderRequest = {
  customer?: Customer;
  items?: OrderItem[];
  language?: "uk" | "es";
};

export async function POST(request: Request) {
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      return NextResponse.json(
        {
          success: false,
          error: "Telegram is not configured",
        },
        { status: 500 }
      );
    }

    const body = (await request.json()) as OrderRequest;

    const customer = body.customer || {};
    const items = Array.isArray(body.items)
      ? body.items
      : [];

    const language = body.language === "es"
      ? "es"
      : "uk";

    if (items.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Cart is empty",
        },
        { status: 400 }
      );
    }

    if (
      !customer.name?.trim() ||
      !customer.phone?.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Customer name and phone are required",
        },
        { status: 400 }
      );
    }

    /*
      =====================================================
      ORDER NUMBER
      =====================================================
    */

    const orderNumber =
      `SELAH-${Date.now().toString().slice(-8)}`;

    /*
      =====================================================
      CALCULATE TOTAL ON SERVER
      =====================================================
    */

    const total = items.reduce(
      (sum, item) => {
        const price =
          Number(item.price) || 0;

        const quantity =
          Math.max(
            1,
            Number(item.quantity) || 1
          );

        return sum + price * quantity;
      },
      0
    );

    /*
      =====================================================
      TRANSLATIONS
      =====================================================
    */

    const isEs = language === "es";

    const title = isEs
      ? "🛍️ NUEVO PEDIDO — SELAH"
      : "🛍️ НОВЕ ЗАМОВЛЕННЯ — SELAH";

    const orderLabel = isEs
      ? "Número de pedido"
      : "Номер замовлення";

    const customerTitle = isEs
      ? "👤 DATOS DEL CLIENTE"
      : "👤 ДАНІ КЛІЄНТА";

    const productsTitle = isEs
      ? "📦 PRODUCTOS"
      : "📦 ТОВАРИ";

    const nameLabel = isEs
      ? "Nombre"
      : "Ім'я";

    const phoneLabel = isEs
      ? "Teléfono"
      : "Телефон";

    const emailLabel = "Email";

    const addressLabel = isEs
      ? "Dirección"
      : "Адреса";

    const cityLabel = isEs
      ? "Ciudad"
      : "Місто";

    const postalLabel = isEs
      ? "Código postal"
      : "Поштовий індекс";

    const commentLabel = isEs
      ? "Comentario"
      : "Коментар";

    const quantityLabel = isEs
      ? "Cantidad"
      : "Кількість";

    const sizeLabel = isEs
      ? "Talla"
      : "Розмір";

    const colorLabel = isEs
      ? "Color"
      : "Колір";

    const totalLabel = isEs
      ? "TOTAL"
      : "РАЗОМ";

    const paymentTitle = isEs
      ? "💳 PAGO"
      : "💳 ОПЛАТА";

    const paymentText = isEs
      ? "El pago se acuerda directamente con el cliente."
      : "Оплату домовляємося з клієнтом напряму.";

    /*
      =====================================================
      PRODUCTS
      =====================================================
    */

    const productLines = items.map(
      (item, index) => {
        const name =
          item.name ||
          item.title ||
          item.id ||
          "SELAH";

        const quantity =
          Math.max(
            1,
            Number(item.quantity) || 1
          );

        const price =
          Number(item.price) || 0;

        const itemTotal =
          price * quantity;

        const details: string[] = [];

        if (item.size) {
          details.push(
            `${sizeLabel}: ${item.size}`
          );
        }

        if (item.color) {
          details.push(
            `${colorLabel}: ${item.color}`
          );
        }

        if (item.reference) {
          details.push(
            `Ref: ${item.reference}`
          );
        }

        return [
          `${index + 1}. ${name}`,
          `   ${quantityLabel}: ${quantity}`,
          `   ${itemTotal
            .toFixed(2)
            .replace(".", ",")} €`,
          ...details.map(
            (detail) => `   ${detail}`
          ),
        ].join("\n");
      }
    );

    /*
      =====================================================
      CUSTOMER
      =====================================================
    */

    const customerLines = [
      `${nameLabel}: ${customer.name.trim()}`,
      `${phoneLabel}: ${customer.phone.trim()}`,

      customer.email?.trim()
        ? `${emailLabel}: ${customer.email.trim()}`
        : "",

      customer.address?.trim()
        ? `${addressLabel}: ${customer.address.trim()}`
        : "",

      customer.city?.trim()
        ? `${cityLabel}: ${customer.city.trim()}`
        : "",

      customer.postalCode?.trim()
        ? `${postalLabel}: ${customer.postalCode.trim()}`
        : "",

      customer.comment?.trim()
        ? `${commentLabel}: ${customer.comment.trim()}`
        : "",
    ].filter(Boolean);

    /*
      =====================================================
      TELEGRAM MESSAGE
      =====================================================
    */

    const message = [
      title,
      "",
      `🔖 ${orderLabel}: ${orderNumber}`,
      "",
      customerTitle,
      ...customerLines,
      "",
      productsTitle,
      "",
      productLines.join("\n\n"),
      "",
      "━━━━━━━━━━━━━━━━━━",
      `💰 ${totalLabel}: ${total
        .toFixed(2)
        .replace(".", ",")} €`,
      "",
      paymentTitle,
      paymentText,
    ].join("\n");

    /*
      =====================================================
      TELEGRAM
      =====================================================
    */

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
        }),
      }
    );

    if (!telegramResponse.ok) {
      const telegramError =
        await telegramResponse.text();

      console.error(
        "Telegram API error:",
        telegramError
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "Failed to send Telegram message",
        },
        { status: 500 }
      );
    }

    /*
      =====================================================
      SUCCESS
      =====================================================
    */

    return NextResponse.json({
      success: true,
      orderNumber,
    });

  } catch (error) {
    console.error(
      "Order API error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to process order",
      },
      { status: 500 }
    );
  }
}