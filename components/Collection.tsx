import Link from "next/link";

export default function Collection() {
  return (
    <section
      id="collection"
      className="bg-black py-32 px-8 text-white"
    >
      <div className="mx-auto max-w-7xl">

        {/* ЗАГОЛОВОК */}
        <h2 className="mb-20 text-center text-5xl font-light">
          Колекція
        </h2>

        {/* КАРТКИ */}
        <div className="grid gap-10 md:grid-cols-3">

          {/* =====================================================
              ФУТБОЛКИ
          ===================================================== */}

          <Link
            href="/tshirts"
            className="group block"
          >
            <div
              className="
                overflow-hidden
                rounded-3xl
                bg-zinc-900
                cursor-pointer
                transition-all
                duration-500
                hover:-translate-y-2
                hover:bg-zinc-800
              "
            >

              {/* ФОТО ФУТБОЛОК */}

              <div className="overflow-hidden">

                <img
                  src="/images/products/tshirt-01.PNG"
                  alt="Футболки SELAH"
                  className="
                    h-[420px]
                    w-full
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-105
                  "
                />

              </div>

              {/* ІНФОРМАЦІЯ */}

              <div className="p-8">

                <h3 className="mb-2 text-2xl">
                  Футболки
                </h3>

                <p className="text-gray-400">
                  Мінімалізм. Вишивка. Віра.
                </p>

                <p
                  className="
                    mt-6
                    text-sm
                    uppercase
                    tracking-[0.25em]
                    text-white/70
                    transition-colors
                    duration-300
                    group-hover:text-white
                  "
                >
                  Переглянути →
                </p>

              </div>

            </div>
          </Link>


          {/* =====================================================
              БЕЙСБОЛКИ
          ===================================================== */}

          <Link
            href="/headwear"
            className="group block"
          >

            <div
              className="
                overflow-hidden
                rounded-3xl
                bg-zinc-900
                cursor-pointer
                transition-all
                duration-500
                hover:-translate-y-2
                hover:bg-zinc-800
              "
            >

              {/* ФОТО БЕЙСБОЛОК */}

              <div className="overflow-hidden">

                <img
                  src="/images/headwear/headwear-collection.jpg"
                  alt="Колекція бейсболок SELAH"
                  className="
                    h-[420px]
                    w-full
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-105
                  "
                />

              </div>

              {/* ІНФОРМАЦІЯ */}

              <div className="p-8">

                <h3 className="mb-2 text-2xl">
                  Бейсболки
                </h3>

                <p className="text-gray-400">
                  Носи свою віру щодня.
                </p>

                <p
                  className="
                    mt-6
                    text-sm
                    uppercase
                    tracking-[0.25em]
                    text-white/70
                    transition-colors
                    duration-300
                    group-hover:text-white
                  "
                >
                  Переглянути →
                </p>

              </div>

            </div>

          </Link>


          {/* =====================================================
              ПАТЧІ
          ===================================================== */}

          <Link
            href="/patches"
            className="group block"
          >

            <div
              className="
                overflow-hidden
                rounded-3xl
                bg-zinc-900
                cursor-pointer
                transition-all
                duration-500
                hover:-translate-y-2
                hover:bg-zinc-800
              "
            >

              {/* ФОТО ПАТЧІВ */}

              <div className="overflow-hidden">

                <img
                  src="/images/patches/patch-todos.jpg"
                  alt="Патчі SELAH"
                  className="
                    h-[420px]
                    w-full
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-105
                  "
                />

              </div>

              {/* ІНФОРМАЦІЯ */}

              <div className="p-8">

                <h3 className="mb-2 text-2xl">
                  Патчі
                </h3>

                <p className="text-gray-400">
                  Змінюй послання разом із днем.
                </p>

                <p
                  className="
                    mt-6
                    text-sm
                    uppercase
                    tracking-[0.25em]
                    text-white/70
                    transition-colors
                    duration-300
                    group-hover:text-white
                  "
                >
                  Переглянути →
                </p>

              </div>

            </div>

          </Link>

        </div>
      </div>
    </section>
  );
}