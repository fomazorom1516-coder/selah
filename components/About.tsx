"use client";

import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Language = "uk" | "es";

export default function About() {
  const [language, setLanguage] = useState<Language>("uk");
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadLanguage = () => {
      const saved = localStorage.getItem("selah-language");

      if (saved === "uk" || saved === "es") {
        setLanguage(saved);
      }
    };

    loadLanguage();

    window.addEventListener(
      "selah-language-changed",
      loadLanguage
    );

    return () => {
      window.removeEventListener(
        "selah-language-changed",
        loadLanguage
      );
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });

  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    [0.82, 1.08]
  );

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    [80, -30]
  );

  const isUk = language === "uk";

  return (
    <section
      id="about"
      className="overflow-hidden bg-zinc-950 px-8 py-32 text-white"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-20 md:grid-cols-2">

        {/* IMAGE */}

        <motion.div
          ref={imageRef}
          style={{
            scale: imageScale,
            y: imageY,
          }}
          className="overflow-hidden rounded-3xl shadow-2xl"
        >
          <Image
            src="/images/about/embroidery-machine.jpg"
            alt="SELAH embroidery"
            width={900}
            height={1100}
            className="h-full w-full object-cover"
            priority
          />
        </motion.div>

        {/* TEXT */}

        <div>

          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mb-6 text-5xl font-light"
          >
            {isUk
              ? "Бренд SELAH"
              : "La marca SELAH"}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.2,
              duration: 0.6,
            }}
            viewport={{ once: true }}
            className="mb-8 text-sm italic leading-7 text-gray-400"
          >
            <span className="font-semibold text-white">
              SELAH
            </span>{" "}
            {isUk ? (
              <>
                — слово давньоєврейського походження{" "}
                <span className="text-white">
                  (סֶלָה)
                </span>
                , яке зустрічається в книзі Псалмів.
                Його часто розуміють як запрошення{" "}
                <span className="text-white">
                  зупинитися, замислитися і звернути серце
                  до Бога.
                </span>
              </>
            ) : (
              <>
                — palabra de origen hebreo antiguo{" "}
                <span className="text-white">
                  (סֶלָה)
                </span>{" "}
                que aparece en el libro de los Salmos.
                A menudo se entiende como una invitación a{" "}
                <span className="text-white">
                  detenerse, reflexionar y volver el corazón
                  hacia Dios.
                </span>
              </>
            )}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.4,
              duration: 0.6,
            }}
            viewport={{ once: true }}
            className="mb-6 text-lg leading-8 text-gray-300"
          >
            <span className="font-medium text-[#D4AF37]">
              {isUk
                ? "SELAH — це більше, ніж одяг."
                : "SELAH — es más que ropa."}
            </span>{" "}
            {isUk
              ? "Це нагадування про Бога серед щоденної метушні."
              : "Es un recordatorio de Dios en medio del ajetreo de cada día."}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.6,
              duration: 0.6,
            }}
            viewport={{ once: true }}
            className="mb-6 text-lg leading-8 text-gray-300"
          >
            {isUk
              ? "Кожна вишивка, кожен патч і кожен NFC-тег створені для того, щоб допомогти людині зупинитися, задуматися та згадати Боже Слово."
              : "Cada bordado, cada parche y cada etiqueta NFC están creados para ayudar a la persona a detenerse, reflexionar y recordar la Palabra de Dios."}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.8,
              duration: 0.6,
            }}
            viewport={{ once: true }}
            className="text-lg leading-8 text-gray-300"
          >
            {isUk
              ? "Ми хочемо, щоб віра була частиною повсякденного життя."
              : "Queremos que la fe sea parte de la vida cotidiana."}
          </motion.p>

        </div>

      </div>
    </section>
  );
}