"use client";

import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Language = "uk" | "es";

export default function NFC() {
  const [language, setLanguage] = useState<Language>("uk");
  const galleryRef = useRef<HTMLDivElement>(null);

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
    target: galleryRef,
    offset: ["start end", "end start"],
  });

  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.5],
    [0.82, 1]
  );

  const textOpacity = useTransform(
    scrollYProgress,
    [0.15, 0.45],
    [0, 1]
  );

  const textY = useTransform(
    scrollYProgress,
    [0.15, 0.45],
    [70, 0]
  );

  const isUk = language === "uk";

  const steps = isUk
    ? [
        "Доторкнися",
        "Відкрий SELAH",
        "Знайди свій патч",
        "Роздумай",
        "Живи Словом",
      ]
    : [
        "Toca",
        "Abre SELAH",
        "Encuentra tu parche",
        "Reflexiona",
        "Vive la Palabra",
      ];

  return (
    <section
      id="nfc"
      className="overflow-hidden bg-[#0b0b0b] py-32 text-white"
    >
      <div className="mx-auto max-w-7xl px-6">

        {/* HERO */}

        <div className="grid items-center gap-24 lg:grid-cols-2">

          <div>

            <p className="mb-6 text-sm uppercase tracking-[0.4em] text-[#C7A96B]">
              SELAH EXPERIENCE
            </p>

            <h2 className="mb-8 text-5xl font-light leading-tight md:text-7xl">
              {isUk ? (
                <>
                  Від дотику
                  <br />
                  до роздумів
                </>
              ) : (
                <>
                  Del toque
                  <br />
                  a la reflexión
                </>
              )}
            </h2>

            <p className="mb-10 text-2xl leading-10 text-gray-300">
              {isUk
                ? "Один дотик може стати початком чогось більшого."
                : "Un solo toque puede ser el comienzo de algo más grande."}
            </p>

            <div className="space-y-6">

              <p className="text-lg leading-9 text-gray-400">
                {isUk
                  ? "У футболку SELAH вбудована NFC-мітка. Достатньо піднести смартфон — і відкриється сторінка SELAH."
                  : "La camiseta SELAH lleva integrada una etiqueta NFC. Solo tienes que acercar tu smartphone y se abrirá la página de SELAH."}
              </p>

              <p className="text-lg leading-9 text-gray-400">
                {isUk
                  ? "Там можна знайти біблійний уривок, який відповідає обраному патчу, прочитати короткі роздуми, молитву або прослухати аудіо."
                  : "Allí puedes encontrar un pasaje bíblico relacionado con el parche elegido, leer una breve reflexión, una oración o escuchar un audio."}
              </p>

              <p className="text-lg leading-9 text-gray-400">
                {isUk
                  ? "Технологія лише відкриває двері. Зустріч зі Словом Божим починається після цього."
                  : "La tecnología solo abre la puerta. El encuentro con la Palabra de Dios comienza después."}
              </p>

            </div>

          </div>

          <motion.div
            initial={{
              opacity: 0,
              y: 80,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
            }}
            viewport={{
              once: true,
            }}
          >

            <Image
              src="/images/nfc/nfc-phone.jpg"
              alt="SELAH NFC"
              width={900}
              height={1100}
              className="rounded-[36px] object-cover shadow-2xl"
            />

          </motion.div>

        </div>

        {/* TIMELINE */}

        <div className="mt-32">

          {/* DESKTOP */}

          <div className="hidden items-center lg:flex">

            {steps.map((step, index) => (

              <div
                key={step}
                className="flex flex-1 items-center"
              >

                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.6,
                  }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    delay: index * 0.15,
                    duration: 0.5,
                  }}
                  viewport={{
                    once: true,
                  }}
                  className="flex min-w-[130px] flex-col items-center"
                >

                  <div
                    className="
                      h-5
                      w-5
                      rounded-full
                      bg-[#C7A96B]
                      shadow-[0_0_20px_rgba(199,169,107,0.45)]
                    "
                  />

                  <p className="mt-5 text-center text-sm tracking-wide text-gray-300">
                    {step}
                  </p>

                </motion.div>

                {index !== steps.length - 1 && (

                  <div
                    className="
                      mx-3
                      h-px
                      flex-1
                      bg-gradient-to-r
                      from-[#5d4b2d]
                      via-[#C7A96B]
                      to-[#5d4b2d]
                    "
                  />

                )}

              </div>

            ))}

          </div>

          {/* MOBILE */}

          <div className="space-y-7 lg:hidden">

            {steps.map((step, index) => (

              <motion.div
                key={step}
                initial={{
                  opacity: 0,
                  x: -30,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: index * 0.1,
                }}
                viewport={{
                  once: true,
                }}
                className="flex items-center gap-5"
              >

                <div
                  className="
                    h-4
                    w-4
                    rounded-full
                    bg-[#C7A96B]
                  "
                />

                <p className="text-lg text-gray-300">
                  {step}
                </p>

              </motion.div>

            ))}

          </div>

        </div>

        {/* APPLE GALLERY */}

        <div
          ref={galleryRef}
          className="mt-40 space-y-44"
        >

          {/* PHOTO 01 */}

          <div className="mx-auto max-w-6xl">

            <motion.div
              style={{
                scale: imageScale,
              }}
              className="overflow-hidden rounded-[40px]"
            >

              <Image
                src="/images/nfc/nfc-patches.jpg"
                alt={
                  isUk
                    ? "Патчі SELAH"
                    : "Parches SELAH"
                }
                width={1600}
                height={1000}
                className="h-auto w-full object-cover"
              />

            </motion.div>

            <motion.div
              style={{
                opacity: textOpacity,
                y: textY,
              }}
              className="mt-14 max-w-2xl"
            >

              <p className="mb-5 text-sm uppercase tracking-[0.35em] text-[#C7A96B]">
                SELAH PATCHES
              </p>

              <h3 className="mb-8 text-4xl font-light leading-tight md:text-5xl">
                {isUk ? (
                  <>
                    Кожен патч
                    <br />
                    має свою історію.
                  </>
                ) : (
                  <>
                    Cada parche
                    <br />
                    tiene su historia.
                  </>
                )}
              </h3>

              <p className="text-xl leading-9 text-gray-400">
                {isUk
                  ? "Кожен змінний патч пов'язаний із певним уривком Святого Письма. Один дотик відкриває сторінку, де можна прочитати біблійний текст, роздуми, молитву або прослухати аудіо."
                  : "Cada parche intercambiable está relacionado con un pasaje concreto de las Sagradas Escrituras. Un solo toque abre una página donde puedes leer el texto bíblico, una reflexión, una oración o escuchar un audio."}
              </p>

            </motion.div>

          </div>

          {/* PHOTO 02 */}

          <div className="mx-auto max-w-6xl">

            <motion.div
              style={{
                scale: imageScale,
              }}
              className="overflow-hidden rounded-[40px]"
            >

              <Image
                src="/images/nfc/nfc-patches-close.jpg"
                alt={
                  isUk
                    ? "Преміальна вишивка"
                    : "Bordado premium"
                }
                width={1600}
                height={1000}
                className="h-auto w-full object-cover"
              />

            </motion.div>

            <motion.div
              style={{
                opacity: textOpacity,
                y: textY,
              }}
              className="ml-auto mt-14 max-w-2xl text-right"
            >

              <p className="mb-5 text-sm uppercase tracking-[0.35em] text-[#C7A96B]">
                PREMIUM EMBROIDERY
              </p>

              <h3 className="mb-8 text-4xl font-light leading-tight md:text-5xl">
                {isUk ? (
                  <>
                    Створено,
                    <br />
                    щоб служити роками.
                  </>
                ) : (
                  <>
                    Creado
                    <br />
                    para durar años.
                  </>
                )}
              </h3>

              <p className="text-xl leading-9 text-gray-400">
                {isUk
                  ? "Якісна тканина, преміальна машинна вишивка та змінні патчі створені для щоденного використання. Це не просто одяг. Це нагадування про Боже Слово."
                  : "Tejidos de calidad, bordado a máquina premium y parches intercambiables creados para el uso diario. No es solo ropa. Es un recordatorio de la Palabra de Dios."}
              </p>

            </motion.div>

          </div>

          {/* FINAL MESSAGE */}

          <motion.div
            initial={{
              opacity: 0,
              y: 80,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.9,
            }}
            viewport={{
              once: true,
            }}
            className="mx-auto mt-44 max-w-4xl text-center"
          >

            <p className="mb-8 text-sm uppercase tracking-[0.35em] text-[#C7A96B]">
              SELAH
            </p>

            <h2 className="mb-10 text-5xl font-light leading-tight md:text-6xl">
              {isUk ? (
                <>
                  Технологія відкриває сторінку.
                  <br />
                  Слово Боже відкриває серце.
                </>
              ) : (
                <>
                  La tecnología abre la página.
                  <br />
                  La Palabra de Dios abre el corazón.
                </>
              )}
            </h2>

            <p className="mx-auto max-w-3xl text-xl leading-10 text-gray-400">
              {isUk
                ? "NFC — це лише інструмент. Справжня цінність починається тоді, коли людина зупиняється, відкриває Боже Слово і дозволяє Йому говорити до свого серця."
                : "NFC es solo una herramienta. El verdadero valor comienza cuando una persona se detiene, abre la Palabra de Dios y permite que hable a su corazón."}
            </p>

          </motion.div>

        </div>

      </div>
    </section>
  );
}