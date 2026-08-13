"use client";

import { FormEvent, useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

type Language = "uk" | "es";

type Review = {
  id: number;
  name: string;
  rating: number;
  message: string;
  language: Language;
  created_at: string;
};

const text = {
  uk: {
    label: "SELAH",
    title: "Відгуки",
    subtitle: "Досвід тих, хто вже обрав SELAH.",
    leave: "Залишити відгук",
    name: "Ваше ім'я",
    message: "Ваш відгук",
    rating: "Оцінка",
    send: "Надіслати відгук",
    sending: "Надсилання...",
    success: "Дякуємо! Ваш відгук надіслано.",
    empty: "Поки що відгуків немає.",
    error: "Не вдалося надіслати відгук. Спробуйте ще раз.",
  },
  es: {
    label: "SELAH",
    title: "Opiniones",
    subtitle: "La experiencia de quienes ya han elegido SELAH.",
    leave: "Dejar una opinión",
    name: "Tu nombre",
    message: "Tu opinión",
    rating: "Valoración",
    send: "Enviar opinión",
    sending: "Enviando...",
    success: "¡Gracias! Tu opinión ha sido enviada.",
    empty: "Todavía no hay opiniones.",
    error: "No se pudo enviar la opinión. Inténtalo de nuevo.",
  },
};

export default function ReviewsPage() {
  const [language, setLanguage] = useState<Language>("uk");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");

  const t = text[language];

  useEffect(() => {
    loadReviews();
  }, []);

  async function loadReviews() {
    const { data } = await supabase
      .from("reviews")
      .select("id, name, rating, message, language, created_at")
      .eq("approved", true)
      .order("created_at", { ascending: false });

    if (data) {
      setReviews(data as Review[]);
    }
  }

  async function submitReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim() || !message.trim()) return;

    setSending(true);
    setStatus("");

    const { error } = await supabase.from("reviews").insert({
      name: name.trim(),
      rating,
      message: message.trim(),
      language,
      approved: false,
    });

    setSending(false);

    if (error) {
      console.log("SELAH REVIEW ERROR:", error);
      setStatus(`${t.error} [${error.code || "unknown"}] ${error.message || "Невідома помилка"}`);
      return;
    }

    setName("");
    setMessage("");
    setRating(5);
    setStatus(t.success);
  }

  return (
    <main className="min-h-screen bg-black px-5 pb-20 pt-32 text-white">
      <div className="mx-auto max-w-5xl">

        <header className="text-center">
          <p className="text-xs uppercase tracking-[0.5em] text-white/30">
            {t.label}
          </p>

          <h1 className="mt-5 text-5xl font-light tracking-tight sm:text-6xl">
            {t.title}
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/40 sm:text-base">
            {t.subtitle}
          </p>

          <div className="mt-8 inline-flex rounded-full border border-white/10 bg-white/[0.03] p-1">
            <button
              type="button"
              onClick={() => setLanguage("uk")}
              className={`rounded-full px-5 py-2 text-xs transition ${
                language === "uk"
                  ? "bg-white text-black"
                  : "text-white/40"
              }`}
            >
              UA
            </button>

            <button
              type="button"
              onClick={() => setLanguage("es")}
              className={`rounded-full px-5 py-2 text-xs transition ${
                language === "es"
                  ? "bg-white text-black"
                  : "text-white/40"
              }`}
            >
              ES
            </button>
          </div>
        </header>

        <section className="mx-auto mt-16 max-w-2xl rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-8">
          <h2 className="text-xl font-light">{t.leave}</h2>

          <form onSubmit={submitReview} className="mt-7 space-y-5">

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.name}
              maxLength={80}
              required
              className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-white/30"
            />

            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.25em] text-white/30">
                {t.rating}
              </p>

              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`text-2xl transition ${
                      star <= rating
                        ? "text-white"
                        : "text-white/15"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t.message}
              maxLength={1000}
              required
              rows={5}
              className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm leading-7 text-white outline-none placeholder:text-white/25 focus:border-white/30"
            />

            <button
              type="submit"
              disabled={sending}
              className="w-full rounded-full bg-white px-6 py-4 text-sm text-black transition hover:scale-[1.01] disabled:opacity-50"
            >
              {sending ? t.sending : t.send}
            </button>

            {status && (
              <p className="text-center text-sm text-white/50">
                {status}
              </p>
            )}

          </form>
        </section>

        <section className="mt-16">
          {reviews.length === 0 ? (
            <p className="text-center text-sm text-white/30">
              {t.empty}
            </p>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">

              {reviews.map((review) => (
                <article
                  key={review.id}
                  className="rounded-3xl border border-white/10 bg-white/[0.025] p-6"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/80">
                      {review.name}
                    </span>

                    <span className="text-sm tracking-widest text-white/70">
                      {"★".repeat(review.rating)}
                    </span>
                  </div>

                  <p className="mt-5 text-sm leading-7 text-white/50">
                    {review.message}
                  </p>
                </article>
              ))}

            </div>
          )}
        </section>

      </div>
    </main>
  );
}
