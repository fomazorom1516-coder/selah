export default function Gallery() {
  return (
    <section
      id="gallery"
      className="bg-zinc-950 py-32 px-8 text-white"
    >
      <div className="mx-auto max-w-7xl">

        <h2 className="mb-20 text-center text-5xl font-light">
          Галерея
        </h2>

        <div className="grid gap-6 md:grid-cols-3">

          <img
            src="/images/gallery/gallery-001.jpg"
            alt="SELAH 1"
            className="h-[500px] w-full rounded-3xl object-cover transition duration-500 hover:scale-105"
          />

          <img
            src="/images/gallery/gallery-002.jpg"
            alt="SELAH 2"
            className="h-[500px] w-full rounded-3xl object-cover transition duration-500 hover:scale-105"
          />

          <img
            src="/images/gallery/gallery-003.jpg"
            alt="SELAH 3"
            className="h-[500px] w-full rounded-3xl object-cover transition duration-500 hover:scale-105"
          />

        </div>

      </div>
    </section>
  );
}