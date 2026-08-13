"use client";

import { useEffect, useState } from "react";

type Review = {
  id: number;
  name: string;
  rating: number;
  message: string;
  language: string;
  product: string | null;
  approved: boolean;
  created_at: string;
};

export default function AdminReviewsPage() {
  const [password, setPassword] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadReviews() {
    setLoading(true);
    setError("");

    const response = await fetch("/api/admin/reviews", {
      headers: {
        "x-admin-password": password,
      },
    });

    if (!response.ok) {
      setError("Невірний пароль або помилка доступу.");
      setLoading(false);
      return;
    }

    const data = await response.json();
    setReviews(data);
    setLoggedIn(true);
    setLoading(false);
  }

  async function changeApproval(id: number, approved: boolean) {
    await fetch("/api/admin/reviews", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-admin-password": password,
      },
      body: JSON.stringify({ id, approved }),
    });

    await loadReviews();
  }

  async function deleteReview(id: number) {
    if (!confirm("Видалити цей відгук назавжди?")) return;

    await fetch("/api/admin/reviews", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-admin-password": password,
      },
      body: JSON.stringify({ id }),
    });

    await loadReviews();
  }

  if (!loggedIn) {
    return (
      <main className="min-h-screen bg-black px-5 pt-32 text-white">
        <div className="mx-auto max-w-md">
          <p className="text-xs uppercase tracking-[0.5em] text-white/30">
            SELAH
          </p>

          <h1 className="mt-5 text-4xl font-light">
            Керування відгуками
          </h1>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль"
            className="mt-8 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-white outline-none"
            onKeyDown={(e) => {
              if (e.key === "Enter") loadReviews();
            }}
          />

          <button
            onClick={loadReviews}
            disabled={loading}
            className="mt-4 w-full rounded-full bg-white px-6 py-4 text-sm text-black disabled:opacity-50"
          >
            {loading ? "Завантаження..." : "Увійти"}
          </button>

          {error && (
            <p className="mt-5 text-center text-sm text-red-400">
              {error}
            </p>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-5 pb-20 pt-32 text-white">
      <div className="mx-auto max-w-5xl">

        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.5em] text-white/30">
              SELAH ADMIN
            </p>

            <h1 className="mt-4 text-4xl font-light">
              Відгуки
            </h1>
          </div>

          <button
            onClick={() => {
              setLoggedIn(false);
              setReviews([]);
              setPassword("");
            }}
            className="text-sm text-white/40 hover:text-white"
          >
            Вийти
          </button>
        </div>

        <div className="mt-10 space-y-5">
          {reviews.length === 0 ? (
            <p className="text-white/40">
              Відгуків поки немає.
            </p>
          ) : (
            reviews.map((review) => (
              <article
                key={review.id}
                className="rounded-3xl border border-white/10 bg-white/[0.025] p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="text-lg">
                      {review.name}
                    </h2>

                    <p className="mt-1 text-xs text-white/30">
                      {review.language.toUpperCase()} ·{" "}
                      {new Date(review.created_at).toLocaleString("uk-UA")}
                    </p>
                  </div>

                  <div className="tracking-widest">
                    {"★".repeat(review.rating)}
                  </div>
                </div>

                <p className="mt-5 leading-7 text-white/60">
                  {review.message}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    onClick={() =>
                      changeApproval(review.id, !review.approved)
                    }
                    className="rounded-full border border-white/15 px-5 py-2 text-sm transition hover:bg-white hover:text-black"
                  >
                    {review.approved
                      ? "Приховати"
                      : "Опублікувати"}
                  </button>

                  <button
                    onClick={() => deleteReview(review.id)}
                    className="rounded-full border border-red-500/20 px-5 py-2 text-sm text-red-400 transition hover:bg-red-500 hover:text-white"
                  >
                    Видалити
                  </button>

                  <span className="rounded-full bg-white/[0.05] px-4 py-2 text-xs text-white/40">
                    {review.approved
                      ? "Опубліковано"
                      : "Очікує схвалення"}
                  </span>
                </div>
              </article>
            ))
          )}
        </div>

      </div>
    </main>
  );
}
