"use client";

import Link from "next/link";

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t bg-white shadow-lg">
      <div className="mx-auto flex max-w-5xl justify-around py-3">
        <Link
          href="/"
          className="flex flex-col items-center text-sm text-slate-700 hover:text-teal-700"
        >
          <span className="text-xl">🏠</span>
          Home
        </Link>

        <Link
          href="/sessions"
          className="flex flex-col items-center text-sm text-slate-700 hover:text-teal-700"
        >
          <span className="text-xl">🎤</span>
          Sessions
        </Link>

        <Link
          href="/journey"
          className="flex flex-col items-center text-sm text-slate-700 hover:text-teal-700"
        >
          <span className="text-xl">❤️</span>
          My Journey
        </Link>

        <Link
          href="/partners"
          className="flex flex-col items-center text-sm text-slate-700 hover:text-teal-700"
        >
          <span className="text-xl">🤝</span>
          Partners
        </Link>

        <Link
          href="/announcements"
          className="flex flex-col items-center text-sm text-slate-700 hover:text-teal-700"
        >
          <span className="text-xl">📢</span>
          Announcements
        </Link>
      </div>
    </nav>
  );
}