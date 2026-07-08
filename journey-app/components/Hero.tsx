import Image from "next/image";
import Link from "next/link";

type HeroProps = {
  title: string;
  subtitle: string;
};

export default function Hero({ title, subtitle }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#062B70] via-[#075C9B] to-[#12BCC4] px-6 pb-36 pt-10 text-white">
      <svg
        className="absolute right-[-10rem] top-16 h-[44rem] w-[44rem] opacity-30"
        viewBox="0 0 600 600"
        fill="none"
      >
        <path
          d="M80 520C210 410 330 270 445 95"
          stroke="#12BCC4"
          strokeWidth="58"
          strokeLinecap="round"
        />
        <path d="M405 90L520 52L497 172" fill="#12BCC4" />
      </svg>

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-10 inline-flex rounded-2xl bg-white px-8 py-5 shadow-xl">
          <Image
            src="/experiencing-edtech-logo.png"
            alt="Experiencing EdTech Conference"
            width={520}
            height={180}
            priority
            className="h-auto w-full max-w-md"
          />
        </div>

        <p className="mb-4 text-sm font-black uppercase tracking-[0.35em] text-[#FFB13B]">
          October 6, 2026
        </p>

        <h1 className="max-w-4xl text-4xl font-black leading-tight sm:text-5xl">
          {title}
        </h1>

        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-white/95">
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