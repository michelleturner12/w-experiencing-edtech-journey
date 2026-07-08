import Link from "next/link";
import Hero from "../components/Hero";
import BottomNav from "../components/BottomNav";

function Icon({ type }: { type: "sessions" | "partners" | "speakers" | "announcements" }) {
  return (
    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-teal-50 shadow-sm">
      {type === "sessions" && <span className="text-5xl">📅</span>}
      {type === "partners" && <span className="text-5xl">🤝</span>}
      {type === "speakers" && <span className="text-5xl">🎙️</span>}
      {type === "announcements" && <span className="text-5xl">📣</span>}
    </div>
  );
}

const cards = [
  { label: "Sessions", description: "View the full schedule", href: "/sessions", icon: "sessions" },
  { label: "Partners", description: "Discover our partners", href: "/partners", icon: "partners" },
  { label: "Speakers", description: "Meet featured speakers", href: "/speakers", icon: "speakers" },
  { label: "Announcements", description: "Get the latest updates", href: "/announcements", icon: "announcements" },
] as const;

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100 pb-28">
      <Hero
        title="Your Experiencing EdTech Journey"
        subtitle="A personalized conference companion designed to help you discover ideas, connect with innovators, and maximize your conference experience."
      />

      <section className="mx-auto -mt-10 grid max-w-6xl gap-5 px-6 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="flex items-center gap-5 rounded-2xl bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
          >
            <Icon type={card.icon} />
            <div>
              <h2 className="text-xl font-bold text-slate-900">{card.label}</h2>
              <p className="mt-1 text-sm text-slate-600">{card.description}</p>
            </div>
          </Link>
        ))}
      </section>

      <BottomNav />
    </main>
  );
}