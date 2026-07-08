"use client";

import Link from "next/link";

const navItems = [
  { label: "Home", href: "/", icon: "🏠" },
  { label: "Sessions", href: "/sessions", icon: "📅" },
  { label: "Partners", href: "/partners", icon: "🤝" },
  { label: "Speakers", href: "/speakers", icon: "🎙️" },
  { label: "Updates", href: "/announcements", icon: "📣" },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t bg-white shadow-lg">
      <div className="mx-auto flex max-w-5xl justify-around px-2 py-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col items-center gap-1 text-xs font-medium text-slate-700 hover:text-teal-700"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-2xl shadow-sm">
              {item.icon}
            </div>
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}