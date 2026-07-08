import Link from "next/link";
import Hero from "../components/Hero";
import BottomNav from "../components/BottomNav";
import NavIcon from "../components/NavIcon";

const cards = [
  { label: "Sessions", description: "View the full schedule", href: "/sessions", icon: "sessions" },
  { label: "Partners", description: "Discover our partners", href: "/partners", icon: "partners" },
  { label: "Speakers", description: "Meet featured speakers", href: "/speakers", icon: "speakers" },
  { label: "Announcements", description: "Get the latest updates", href: "/announcements", icon: "announcements" },
] as const;

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F4F8FB] pb-28">
      <Hero
        title="Your Experiencing EdTech Journey"
        subtitle="A personalized conference companion designed to help you discover ideas, connect with innovators, and maximize your conference experience."
      />

      <section className="mx-auto -mt-10 grid max-w-6xl grid-cols-1 gap-5 px-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
           className="flex min-w-0 items-center gap-4 rounded-2xl border border-[#DDEAF2] bg-white p-5 shadow-lg transition hover:-translate-y-1 hover:border-[#12BCC4] hover:shadow-xl sm:min-h-32"
          >
            <NavIcon type={card.icon} size="large" />

            <div className="min-w-0">
  <h2 className="text-lg font-bold leading-tight text-slate-900">
    {card.label}
  </h2>
  <p className="mt-1 text-sm leading-snug text-slate-600">
    {card.description}
  </p>
</div>
          </Link>
        ))}
      </section>

      <BottomNav />
    </main>
  );
}