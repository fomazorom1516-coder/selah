"use client";

import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

const steps = [
  "Доторкнися",
  "Відкрий SELAH",
  "Знайди свій патч",
  "Роздумай",
  "Живи Словом",
];

export default function NFC() {
  const galleryRef = useRef<HTMLDivElement>(null);

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

  return (
    <section
      id="nfc"
      className="bg-[#0b0b0b] text-white py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* HERO */}

        <div className="grid lg:grid-cols-2 gap-24 items-center">

          <div>

            <p className="uppercase tracking-[0.4em] text-[#C7A96B] text-sm mb-6">

              SELAH EXPERIENCE

            </p>

            <h2 className="text-5xl md:text-7xl font-light leading-tight mb-8">

              Від дотику
              <br />
              до роздумів

            </h2>

            <p className="text-2xl text-gray-300 leading-10 mb-10">

              Один дотик може стати
              початком чогось більшого.

            </p>

            <div className="space-y-6">

              <p className="text-gray-400 text-lg leading-9">

                У футболку SELAH вбудована
                NFC-мітка.

                Достатньо піднести смартфон —
                і відкриється сторінка SELAH.

              </p>

              <p className="text-gray-400 text-lg leading-9">

                Там можна знайти біблійний уривок,
                який відповідає обраному патчу,
                прочитати короткі роздуми,
                молитву або прослухати аудіо.

              </p>

              <p className="text-gray-400 text-lg leading-9">

                Технологія лише відкриває двері.

                Зустріч зі Словом Божим
                починається після цього.

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
              className="rounded-[36px] shadow-2xl object-cover"
            />

          </motion.div>

        </div>        {/* TIMELINE */}

        <div className="mt-32">

          <div className="hidden lg:flex items-center">

            {steps.map((step, index) => (

              <div
                key={step}
                className="flex items-center flex-1"
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
                  className="flex flex-col items-center min-w-[130px]"
                >

                  <div
                    className="
                      w-5
                      h-5
                      rounded-full
                      bg-[#C7A96B]
                      shadow-[0_0_20px_rgba(199,169,107,0.45)]
                    "
                  />

                  <p className="mt-5 text-sm tracking-wide text-center text-gray-300">

                    {step}

                  </p>

                </motion.div>

                {index !== steps.length - 1 && (

                  <div
                    className="
                      flex-1
                      h-px
                      mx-3
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

          <div className="lg:hidden space-y-7">

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
                    w-4
                    h-4
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
        >          {/* PHOTO 01 */}

          <div className="max-w-6xl mx-auto">

            <motion.div
              style={{
                scale: imageScale,
              }}
              className="overflow-hidden rounded-[40px]"
            >

              <Image
                src="/images/nfc/nfc-patches.jpg"
                alt="SELAH patches"
                width={1600}
                height={1000}
                className="w-full h-auto object-cover"
              />

            </motion.div>

            <motion.div
              style={{
                opacity: textOpacity,
                y: textY,
              }}
              className="max-w-2xl mt-14"
            >

              <p className="uppercase tracking-[0.35em] text-[#C7A96B] text-sm mb-5">

                SELAH PATCHES

              </p>

              <h3 className="text-4xl md:text-5xl font-light leading-tight mb-8">

                Кожен патч
                <br />
                має свою історію.

              </h3>

              <p className="text-xl text-gray-400 leading-9">

                Кожен змінний патч пов'язаний із певним
                уривком Святого Письма.

                Один дотик відкриває сторінку,
                де можна прочитати біблійний текст,
                роздуми, молитву або прослухати аудіо.

              </p>

            </motion.div>

          </div>

          {/* PHOTO 02 */}

          <div className="max-w-6xl mx-auto">

            <motion.div
              style={{
                scale: imageScale,
              }}
              className="overflow-hidden rounded-[40px]"
            >

              <Image
                src="/images/nfc/nfc-patches-close.jpg"
                alt="Premium embroidery"
                width={1600}
                height={1000}
                className="w-full h-auto object-cover"
              />

            </motion.div>

            <motion.div
              style={{
                opacity: textOpacity,
                y: textY,
              }}
              className="max-w-2xl ml-auto mt-14 text-right"
            >

              <p className="uppercase tracking-[0.35em] text-[#C7A96B] text-sm mb-5">

                PREMIUM EMBROIDERY

              </p>

              <h3 className="text-4xl md:text-5xl font-light leading-tight mb-8">

                Створено,
                <br />
                щоб служити роками.

              </h3>

              <p className="text-xl text-gray-400 leading-9">

                Якісна тканина,
                преміальна машинна вишивка
                та змінні патчі створені для
                щоденного використання.

                Це не просто одяг.
                Це нагадування про Боже Слово.

              </p>

            </motion.div>

          </div>          {/* FINAL MESSAGE */}

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
            className="max-w-4xl mx-auto text-center mt-44"
          >

            <p className="uppercase tracking-[0.35em] text-[#C7A96B] text-sm mb-8">

              SELAH

            </p>

            <h2 className="text-5xl md:text-6xl font-light leading-tight mb-10">

              Технологія відкриває сторінку.
              <br />
              Слово Боже відкриває серце.

            </h2>

            <p className="text-xl text-gray-400 leading-10 max-w-3xl mx-auto">

              NFC — це лише інструмент.
              Справжня цінність починається тоді,
              коли людина зупиняється,
              відкриває Боже Слово
              і дозволяє Йому говорити до свого серця.

            </p>

          </motion.div>

        </div>

      </div>

    </section>

  );
}