"use client";

import { useEffect, useState } from "react";
import BottomNav from "../../components/BottomNav";

type Announcement = {
  Date: string;
  Time: string;
  Title: string;
  Message: string;
  Priority: string;
};

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRSmAC3kHb6-asEJxqGcQUnm723xpUiFYy7sSObHEvckb5AgSmU6sIfruCrQC7O-TqxSs8KtNa-_xgZ/pub?gid=753361707&single=true&output=csv";

function parseCSV(text: string): Announcement[] {
  const rows = text.trim().split(/\r?\n/);
  if (rows.length < 2) return [];

  const headers = rows[0].split(",").map((header) => header.trim());

  return rows.slice(1).map((line) => {
    const values = line.split(",").map((value) => value.trim());
    const row: Record<string, string> = {};

    headers.forEach((header, index) => {
      row[header] = values[index] ?? "";
    });

    return row as Announcement;
  });
}

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAnnouncements() {
      const response = await fetch(SHEET_URL, { cache: "no-store" });
      const text = await response.text();
      setAnnouncements(parseCSV(text));
      setLoading(false);
    }

    loadAnnouncements();
  }, []);

  return (
    <main className="min-h-screen bg-[#F4F8FB] pb-28">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#12BCC4]">
          Experiencing EdTech 2026
        </p>

        <h1 className="mt-2 text-4xl font-black text-[#062B70]">
          Announcements
        </h1>

        <p className="mt-3 text-slate-600">
          Stay up to date throughout the conference.
        </p>

        {loading && (
          <p className="mt-8 text-slate-600">Loading announcements...</p>
        )}

        {!loading && announcements.length === 0 && (
          <div className="mt-8 rounded-2xl bg-white p-6 text-slate-600 shadow">
            No announcements yet. Check back soon.
          </div>
        )}

        <div className="mt-8 space-y-4">
          {announcements.map((announcement, index) => (
            <article
              key={`${announcement.Title}-${index}`}
              className="rounded-3xl border border-[#DDEAF2] bg-white p-6 shadow-lg"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-bold uppercase tracking-wide text-[#12BCC4]">
                  {announcement.Priority || "Update"}
                </p>

                <p className="text-sm font-semibold text-slate-500">
                  {announcement.Date}
                  {announcement.Time ? ` • ${announcement.Time}` : ""}
                </p>
              </div>

              <h2 className="mt-3 text-xl font-black text-[#062B70]">
                {announcement.Title}
              </h2>

              <p className="mt-3 leading-relaxed text-slate-600">
                {announcement.Message}
              </p>
            </article>
          ))}
        </div>
      </div>

      <BottomNav />
    </main>
  );
}