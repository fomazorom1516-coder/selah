export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">

      {/* Відео */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Темний шар */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Контент */}
      <div className="relative z-10 flex min-h-screen items-center justify-center text-center px-6">

        <div>

          <h1 className="text-6xl md:text-8xl font-bold tracking-[0.35em]">
            SELAH
          </h1>

          <p className="mt-8 text-xl text-gray-200">
            Носи свою віру.
            <br />
            Живи нею.
          </p>

          <button className="mt-12 rounded-full border border-white px-8 py-4 transition hover:bg-white hover:text-black">
            Переглянути колекцію
          </button>

        </div>

      </div>

    </section>
  );
}