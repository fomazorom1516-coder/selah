"use client";

import { useEffect, useState } from "react";

type Language = "uk" | "es";

export type SizeMeasurement = {
  size: string;
  width: number;
  length: number;
};

type SizeGuideProps = {
  productName: string;
  measurements: SizeMeasurement[];
  language: Language;
};

const copy = {
  uk: {
    button: "Таблиця розмірів",
    title: "Таблиця розмірів",
    subtitle: "Заміри виробу в сантиметрах.",
    size: "Розмір",
    width: "Ширина (A)",
    length: "Довжина (B)",
    description:
      "Ширина вимірюється від пахви до пахви, а довжина — від найвищої точки плеча до низу виробу.",
    tolerance: "Допустиме відхилення: до 1 см.",
    close: "Закрити",
  },
  es: {
    button: "Guía de tallas",
    title: "Guía de tallas",
    subtitle: "Medidas de la prenda en centímetros.",
    size: "Talla",
    width: "Ancho (A)",
    length: "Largo (B)",
    description:
      "El ancho se mide de axila a axila y el largo desde el punto más alto del hombro hasta el bajo de la prenda.",
    tolerance: "Tolerancia de fabricación: hasta 1 cm.",
    close: "Cerrar",
  },
};

export default function SizeGuide({
  productName,
  measurements,
  language,
}: SizeGuideProps) {
  const [isOpen, setIsOpen] = useState(false);
  const t = copy[language];

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="mt-4 inline-flex items-center gap-2 text-sm text-white/55 transition hover:text-white"
      >
        <span aria-hidden="true">📏</span>
        <span className="underline underline-offset-4">{t.button}</span>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/80 p-2 backdrop-blur-sm sm:p-4 sm:items-center"
          onClick={() => setIsOpen(false)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="size-guide-title"
            className="max-h-[92dvh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/10 bg-[#0a0a0a] p-4 shadow-2xl sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3 sm:gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-white/45">
                  {productName}
                </p>
                <h2 id="size-guide-title" className="mt-2 text-xl font-medium sm:text-2xl">
                  {t.title}
                </h2>
                <p className="mt-2 text-sm text-white/60">{t.subtitle}</p>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="shrink-0 rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/70 transition hover:border-white hover:text-white"
              >
                {t.close}
              </button>
            </div>

            <div className="mt-5 grid gap-5 md:mt-6 md:grid-cols-[1fr_220px] md:items-center md:gap-6">
              <div className="overflow-x-auto rounded-2xl border border-white/10">
                <table className="w-full min-w-[340px] border-collapse text-left text-xs sm:min-w-[390px] sm:text-sm">
                  <thead className="bg-white/[0.06] text-xs uppercase tracking-[0.14em] text-white/55">
                    <tr>
                      <th className="px-3 py-2.5 font-medium sm:px-4 sm:py-3">{t.size}</th>
                      <th className="px-3 py-2.5 font-medium sm:px-4 sm:py-3">{t.width}</th>
                      <th className="px-3 py-2.5 font-medium sm:px-4 sm:py-3">{t.length}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {measurements.map((measurement) => (
                      <tr key={measurement.size} className="border-t border-white/10">
                        <td className="px-3 py-2.5 font-medium sm:px-4 sm:py-3">{measurement.size}</td>
                        <td className="px-3 py-2.5 text-white/70 sm:px-4 sm:py-3">{measurement.width} cm</td>
                        <td className="px-3 py-2.5 text-white/70 sm:px-4 sm:py-3">{measurement.length} cm</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <svg viewBox="0 0 220 200" className="mx-auto w-full max-w-[170px] sm:max-w-[220px]" aria-hidden="true">
                <path d="M72 28 49 48 25 77l30 18 16-20v94h78V75l16 20 30-18-24-29-23-20-16 18H88Z" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.62)" strokeWidth="2" strokeLinejoin="round" />
                <path d="M83 29c6 24 48 24 54 0" fill="none" stroke="rgba(255,255,255,0.62)" strokeWidth="2" />
                <path d="M67 106h86M67 101l-9 5 9 5M153 101l9 5-9 5" fill="none" stroke="#fff" strokeWidth="2" />
                <path d="M110 53v119M105 62l5-9 5 9M105 163l5 9 5-9" fill="none" stroke="#fff" strokeWidth="2" />
                <text x="107" y="96" fill="#fff" fontSize="14" textAnchor="middle">A</text>
                <text x="123" y="116" fill="#fff" fontSize="14">B</text>
              </svg>
            </div>

            <p className="mt-5 text-xs leading-5 text-white/50">{t.description}</p>
            <p className="mt-2 text-xs text-white/40">{t.tolerance}</p>
          </section>
        </div>
      )}
    </>
  );
}
