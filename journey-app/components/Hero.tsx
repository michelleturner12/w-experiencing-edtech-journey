import Image from "next/image";
import Link from "next/link";

type HeroProps = {
  title: string;
  subtitle: string;
};

export default function Hero({ title, subtitle }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#062B70] via-[#0A5D9C] to-[#12BCC4] px-6 pb-24 pt-10 text-white">
      <div className="absolute right-[-8rem] top-12 h-[34rem] w-[34rem] rounded-full border-[4rem] border-[#12BCC4]/20" />

      <div className="relative mx-auto max-w-6xl">
        <Image
          src="/experiencing-edtech-logo.png"
          alt="Experiencing EdTech Conference"
          width={900}
          height={360}
          priority
          className="mb-8 h-auto w-full max-w-xl"
        />

        <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#FFB13B]">
          October 6, 2026
        </p>

        <h1 className="max-w-4xl text-4xl font-bold leading-tight sm:text-5xl">
          {title}
        </h1>

        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-white/90">
          {subtitle}
        </p>

        <Link
          href="/sessions"
          className="mt-8 inline-flex rounded-xl bg-[#FF6242] px-6 py-4 font-bold text-white shadow-lg transition hover:bg-[#D93A9D]"
        >
          Begin My Journey →
        </Link>
      </div>
    </section>
  );
}