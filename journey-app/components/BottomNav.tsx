"use client";

import Link from "next/link";
import NavIcon from "./NavIcon";

const navItems = [
  { label: "Home", href: "/", icon: "home" },
  { label: "Sessions", href: "/sessions", icon: "sessions" },
  { label: "Partners", href: "/partners", icon: "partners" },
  { label: "Speakers", href: "/speakers", icon: "speakers" },
  { label: "Announcements", href: "/announcements", icon: "announcements" },
] as const;

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
            <NavIcon type={item.icon} size="small" />
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}