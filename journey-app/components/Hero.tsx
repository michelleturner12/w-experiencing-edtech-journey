type HeroProps = {
  title: string;
  subtitle: string;
};

export default function Hero({ title, subtitle }: HeroProps) {
  return (
    <section className="bg-gradient-to-r from-teal-700 to-sky-800 text-white">
      <div className="mx-auto max-w-6xl px-8 py-16">
        <p className="uppercase tracking-[0.3em] text-sm opacity-80">
          October 6, 2026
        </p>

        <h1 className="mt-4 text-6xl font-bold">
          {title}
        </h1>

        <p className="mt-6 max-w-2xl text-xl text-teal-50">
          {subtitle}
        </p>

        <button className="mt-10 rounded-xl bg-white px-8 py-4 font-semibold text-teal-700 transition hover:scale-105">
          Begin My Journey →
        </button>
      </div>
    </section>
  );
}