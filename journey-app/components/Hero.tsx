import Image from "next/image";
import Link from "next/link";

type HeroProps = {
  title: string;
  subtitle: string;
};

export default function Hero({ title, subtitle }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#062B70] via-[#075C9B] to-[#12BCC4] px-6 pb-28 pt-10 text-white">
      {/* Big arrow swoosh */}
      <svg
        className="absolute right-[-6rem] top-10 h-[42rem] w-[42rem] opacity-35"
        viewBox="0 0 600 600"
        fill="none"
      >
        <path
          d="M80 520C210 410 330 270 445 95"
          stroke="#12BCC4"
          strokeWidth="58"
          strokeLinecap="round"
        />
        <path
          d="M405 90L520 52L497 172"
          fill="#12BCC4"
        />
        <path
          d="M130 555C280 430 390 300 520 90"
          stroke="#0AA3B5"
          strokeWidth="36"
          strokeLinecap="round"
          opacity="0.45"
        />
      </svg>

      <div className="relative mx-auto max-w-6xl">
        {/* Logo lockup recreated so EdTech is white */}
        <div className="mb-10 flex items-center gap-5">
          <Image
            src="/experiencing-edtech-logo.png"
            alt="Experiencing EdTech logo"
            width={145}
            height={145}
            priority
            className="h-32 w-32 rounded-md object-cover"
          />

          <div>
            <p className="text-3xl font-black uppercase tracking-wider text-[#FF6242]">
              Experiencing
            </p>

            <p className="text-7xl font-black leading-none text-white">
              EdTech
            </p>

            <p className="text-3xl font-black uppercase tracking-[0.28em] text-[#12BCC4]">
              Conference
            </p>
          </div>
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