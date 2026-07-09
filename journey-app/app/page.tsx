"use client";

import { useState } from "react";
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

const daySchedule = [
  ["8:15–9:00 AM", "Check-In, Breakfast/Coffee, & Explore Exhibitor Space"],
  ["9:00–10:00 AM", "Session 1"],
  ["10:05–11:05 AM", "Session 2"],
  ["11:05–11:25 AM", "Break — Explore Exhibitor Space"],
  ["11:25 AM–12:25 PM", "Session 3"],
  ["12:30–1:20 PM", "Lunch"],
  ["1:30–2:30 PM", "Keynote — Charles Clark"],
  ["2:40–3:40 PM", "Session 4"],
  ["3:45–4:30 PM", "Session 5"],
];

export default function Home() {
  const [showSchedule, setShowSchedule] = useState(false);

  return (
    <main className="min-h-screen bg-[#F4F8FB] pb-28">
      <Hero
        title="Welcome to Experiencing EdTech 2026"
        subtitle="Engage with the app to discover ideas, connect with innovators, and maximize your conference experience."
      />

      <section className="relative z-10 mx-auto -mt-20 grid max-w-6xl grid-cols-1 gap-5 px-6 sm:grid-cols-2 lg:grid-cols-4">
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

      <section className="mx-auto mt-10 max-w-6xl px-6">
        <div className="rounded-3xl border border-[#DDEAF2] bg-white p-6 shadow-lg">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#12BCC4]">
            Conference Schedule
          </p>

          <h2 className="mt-2 text-2xl font-black text-[#062B70]">
            Day at a Glance
          </h2>

          <p className="mt-2 text-slate-600">
            Plan your Experiencing EdTech 2026 experience.
          </p>

          <button
            type="button"
            onClick={() => setShowSchedule(!showSchedule)}
            className="mt-5 inline-flex items-center rounded-xl bg-[#062B70] px-5 py-3 font-bold text-white transition hover:bg-[#075C9B]"
          >
            {showSchedule ? "Hide Schedule ↑" : "View Day at a Glance ↓"}
          </button>

          {showSchedule && (
            <div className="mt-6 space-y-3 border-t border-[#DDEAF2] pt-6">
              {daySchedule.map(([time, event]) => (
                <div
                  key={time}
                  className="flex flex-col gap-1 rounded-2xl bg-[#F4F8FB] p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <p className="font-bold text-[#062B70]">{time}</p>
                  <p className="text-slate-700">{event}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <BottomNav />
    </main>
  );
}