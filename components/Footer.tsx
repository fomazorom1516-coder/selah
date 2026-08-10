export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-black px-8 py-12 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">

        <div>
          <h3 className="text-2xl font-semibold tracking-[0.3em]">
            SELAH
          </h3>

          <p className="mt-2 text-sm text-gray-400">
            Wear your faith.
          </p>
        </div>

        <div className="flex gap-8 text-gray-400">

          <a href="#" className="transition hover:text-white">
            Instagram
          </a>

          <a href="#" className="transition hover:text-white">
            Telegram
          </a>

          <a href="#" className="transition hover:text-white">
            YouTube
          </a>

        </div>

      </div>

      <div className="mt-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} SELAH. All rights reserved.
      </div>
    </footer>
  );
}