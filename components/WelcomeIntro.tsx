"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function WelcomeIntro() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setVisible(false);
    }, 3200);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: 1.1,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
        >
          {/* Very subtle cinematic light */}
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
            initial={{ opacity: 0, scale: 0.55 }}
            animate={{
              opacity: 0.28,
              scale: 1,
            }}
            transition={{
              duration: 1.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0.14) 0%, rgba(202,168,122,0.07) 30%, transparent 70%)",
              filter: "blur(18px)",
            }}
          />

          {/* Logo + message as ONE composition */}
          <motion.div
            className="relative z-10 flex flex-col items-center"
            initial={{
              opacity: 0,
              scale: 0.78,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 1.15,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {/* Logo */}
            <motion.div
              animate={{
                filter: [
                  "drop-shadow(0 0 0 rgba(255,255,255,0))",
                  "drop-shadow(0 0 30px rgba(255,255,255,0.22))",
                  "drop-shadow(0 0 16px rgba(202,168,122,0.12))",
                ],
              }}
              transition={{
                duration: 2.2,
                ease: "easeOut",
              }}
            >
              <Image
                src="/images/selah-logo-transparent.png"
                alt="SELAH"
                width={794}
                height={893}
                priority
                className="h-auto w-[min(70vw,350px)] object-contain"
              />
            </motion.div>

            {/* Cinematic message appears together with the logo */}
            <motion.div
              className="relative -mt-1"
              initial={{
                opacity: 0,
                scale: 0.82,
                y: 10,
                filter: "blur(7px)",
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              transition={{
                delay: 0.35,
                duration: 1.05,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <motion.p
                className="whitespace-nowrap text-center text-2xl font-light tracking-[0.10em] text-white/95 sm:text-3xl md:text-[34px]"
                animate={{
                  textShadow: [
                    "0 0 0 rgba(255,255,255,0)",
                    "0 0 24px rgba(255,255,255,0.14)",
                    "0 0 12px rgba(202,168,122,0.08)",
                  ],
                }}
                transition={{
                  duration: 2.2,
                  ease: "easeOut",
                }}
              >
                Ісус любить тебе
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Soft cinematic vignette */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at center, transparent 35%, rgba(0,0,0,0.32) 75%, rgba(0,0,0,0.68) 100%)",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
