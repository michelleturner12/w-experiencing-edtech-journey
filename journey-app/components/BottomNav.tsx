"use client";

import Link from "next/link";
import NavIcon from "./NavIcon";

const navItems = [
  { label: "Home", href: "/", icon: "home" },
  { label: "Sessions", href: "/sessions", icon: "sessions" },
  { label: "Favorites", href: "/journey", icon: "sessions" },
  { label: "Partners", href: "/partners", icon: "partners" },
  { label: "Speakers", href: "/speakers", icon: "speakers" },
  { label: "Announcements", href: "/announcements", icon: "announcements" },
] as const;

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#DDEAF2] bg-white shadow-lg">
      <div className="mx-auto grid max-w-5xl grid-cols-6 px-1 py-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex min-w-0 flex-col items-center gap-1 px-1 text-center text-[10px] font-medium text-slate-700 transition hover:text-[#12BCC4] sm:text-xs"
          >
            <NavIcon type={item.icon} size="small" />

            <span className="leading-tight">
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}