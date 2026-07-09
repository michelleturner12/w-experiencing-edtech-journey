import Image from "next/image";
import Link from "next/link";

type HeroProps = {
  title: string;
  subtitle: string;
};

export default function Hero({ title, subtitle }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#062B70] via-[#075C9B] to-[#12BCC4] px-6 pb-36 pt-8 text-white">
      <svg
        className="pointer-events-none absolute right-[-8rem] top-12 h-[42rem] w-[42rem] opacity-30"
        viewBox="0 0 600 600"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M55 540C200 430 340 280 455 90"
          stroke="#12BCC4"
          strokeWidth="58"
          strokeLinecap="round"
        />
        <path d="M415 90L530 52L507 172" fill="#12BCC4" />
        <path
          d="M130 570C275 455 400 310 520 115"
          stroke="#0A8FA8"
          strokeWidth="34"
          strokeLinecap="round"
          opacity="0.55"
        />
      </svg>

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-8 flex items-center gap-5">
  <Image
    src="/experiencing-edtech-mark.png"
    alt=""
    width={150}
    height={150}
    priority
    className="h-32 w-32 shrink-0 object-contain"
  />

  <div className="leading-none">
    <p className="text-2xl font-black uppercase tracking-[0.12em] text-[#FF6242] sm:text-3xl">
      Experiencing
    </p>

    <p className="mt-1 text-5xl font-black tracking-tight text-white sm:text-6xl">
      EdTech
    </p>

    <p className="mt-1 text-xl font-black uppercase tracking-[0.28em] text-[#12BCC4] sm:text-2xl">
      Conference
    </p>
  </div>
</div>

        <p className="mb-4 text-sm font-black uppercase tracking-[0.35em] text-[#FFB13B]">
          October 6, 2026
        </p>

        <h1 className="whitespace-nowrap text-4xl font-black leading-tight sm:text-5xl">
          {title}
        </h1>

        <p className="mt-5 text-lg leading-relaxed text-white/95 sm:whitespace-nowrap">
          {subtitle}
        </p>

        <Link
          href="/sessions"
          className="mt-8 inline-flex rounded-xl bg-[#FF6242] px-7 py-4 font-bold text-white shadow-lg transition hover:bg-[#D93A9D]"
        >
          Begin My Journey →
        </Link>
      </div>
    </section>
  );
}