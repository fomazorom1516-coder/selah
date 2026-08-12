"use client";

import { useRef, useState } from "react";

export default function AudioPlayer({ src = "/audio/isaiah-41.mp3", title = "Роздуми над Словом", reference = "ІСАЯ 41" }: { src?: string; title?: string; reference?: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      await audioRef.current.play();
      setPlaying(true);
    }
  };

  const updateProgress = () => {
    if (!audioRef.current) return;

    const value =
      (audioRef.current.currentTime / audioRef.current.duration) * 100;

    setProgress(Number.isFinite(value) ? value : 0);
  };

  const handleEnded = () => {
    setPlaying(false);
    setProgress(0);
  };

  return (
    <div className="mt-3 rounded-2xl bg-white/[0.025] p-4 transition-all duration-700 hover:border-white/20 hover:bg-white/[0.04]">

      <div className="flex items-center gap-4">

        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? "Пауза" : "Слухати роздум"}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white transition-all duration-500 hover:scale-105 hover:bg-white/10"
        >
          {playing ? "Ⅱ" : "▶"}
        </button>

        <div className="min-w-0 flex-1">

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/80">
                {title}
              </p>

              <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-white/30">
                {reference}
              </p>
            </div>

            <span className="text-xs text-white/30">
              🎧
            </span>
          </div>

          <div
            className="mt-4 h-2 cursor-pointer overflow-hidden rounded-full bg-white/10"
            onClick={(event) => {
              if (!audioRef.current || !audioRef.current.duration) return;

              const rect = event.currentTarget.getBoundingClientRect();
              const clickPosition = event.clientX - rect.left;
              const percentage = Math.max(
                0,
                Math.min(1, clickPosition / rect.width)
              );

              audioRef.current.currentTime =
                percentage * audioRef.current.duration;

              setProgress(percentage * 100);
            }}
            role="slider"
            aria-label="Перемотування аудіо"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress)}
            tabIndex={0}
          >
            <div
              className="h-full rounded-full bg-white/60 transition-[width] duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>

        </div>

      </div>

      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={updateProgress}
        onEnded={handleEnded}
        preload="metadata"
      />

    </div>
  );
}
