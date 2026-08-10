"use client";

import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

export default function About() {
  const imageRef = useRef<HTMLDivElement>(null);

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

  return (
    <section
      id="about"
      className="bg-zinc-950 py-32 px-8 text-white overflow-hidden"
    >
      <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-20 items-center">

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
            className="w-full h-full object-cover"
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
            className="text-5xl font-light mb-6"
          >
            Бренд SELAH
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-sm text-gray-400 italic leading-7 mb-8"
          >
            <span className="font-semibold text-white">SELAH</span> — слово
            давньоєврейського походження{" "}
            <span className="text-white">(סֶלָה)</span>, яке
            зустрічається в книзі Псалмів. Його часто розуміють як
            запрошення{" "}
            <span className="text-white">
              зупинитися, замислитися
              і звернути серце до Бога.
            </span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-lg leading-8 text-gray-300 mb-6"
          >
            <span className="text-[#D4AF37] font-medium">
              SELAH — це більше, ніж одяг.
            </span>{" "}
            Це нагадування про Бога серед
            щоденної метушні.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-lg leading-8 text-gray-300 mb-6"
          >
            Кожна вишивка, кожен патч і кожен NFC-тег
            створені для того,
            щоб допомогти людині зупинитися,
            задуматися та згадати
            Боже Слово.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-lg leading-8 text-gray-300"
          >
            Ми хочемо, щоб віра була
            частиною повсякденного життя.
          </motion.p>

        </div>

      </div>
    </section>
  );
}