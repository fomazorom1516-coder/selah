"use client";

export default function FloatingTikTok() {
  return (
    <a
      href="https://www.tiktok.com/@selahverse.live"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="SELAH on TikTok"
      className="fixed bottom-6 left-6 z-[100] flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-black/90 text-white shadow-[0_0_18px_rgba(255,255,255,0.22)] backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-white/50 hover:bg-white hover:text-black hover:shadow-[0_0_30px_rgba(255,255,255,0.55)] active:scale-95 md:bottom-8 md:left-8"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-7 w-7"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-3.94V2h-3.48v13.64a2.91 2.91 0 1 1-2-2.76v-3.53a6.44 6.44 0 1 0 5.48 6.29V8.9a8.27 8.27 0 0 0 4.84 1.56V7a4.85 4.85 0 0 1-1.07-.31Z" />
      </svg>
    </a>
  );
}
