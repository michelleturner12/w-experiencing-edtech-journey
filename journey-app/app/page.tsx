import Link from "next/link";
import Hero from "../components/Hero";
import BottomNav from "../components/BottomNav";

export default function Home() {
  const cards = [
    { label: "🎤 Sessions", href: "/sessions" },
    { label: "❤️ My Journey", href: "/journey" },
    { label: "🤝 Partners", href: "/more" },
    { label: "📢 Announcements", href: "/more" },
  ];

  return (
    <main className="min-h-screen bg-slate-100 pb-24">
      <Hero
        title="Your Experiencing EdTech Journey"
        subtitle="A personalized conference companion designed to help you discover ideas, connect with innovators, and maximize your conference experience."
      />

      <section className="mx-auto -mt-10 grid max-w-6xl gap-6 px-8 md:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-2xl bg-white p-8 text-center shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
          >
            <h2 className="text-xl font-semibold">{card.label}</h2>
          </Link>
        ))}
      </section>

      <BottomNav />
    </main>
  );
}