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
      const response = await fetch(SHEET_URL);
      const text = await response.text();
      setAnnouncements(parseCSV(text));
      setLoading(false);
    }

    loadAnnouncements();
  }, []);

  return (
    <main className="min-h-screen bg-slate-100 pb-24">
      <div className="mx-auto max-w-5xl p-8">
        <h1 className="mb-2 text-4xl font-bold">Announcements</h1>

        <p className="mb-6 text-slate-600">
          Stay up to date throughout Experiencing EdTech 2026.
        </p>

        {loading && (
          <p className="text-slate-600">Loading announcements...</p>
        )}

        {!loading && announcements.length === 0 && (
          <div className="rounded-2xl bg-white p-6 text-slate-600 shadow">
            No announcements yet. Check back soon.
          </div>
        )}

        <div className="space-y-4">
          {announcements.map((announcement, index) => (
            <article
              key={`${announcement.Title}-${index}`}
              className="rounded-2xl bg-white p-6 shadow"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
                  {announcement.Priority || "Update"}
                </p>

                <p className="text-sm text-slate-500">
                  {announcement.Date} {announcement.Time && `• ${announcement.Time}`}
                </p>
              </div>

              <h2 className="mt-2 text-xl font-bold text-slate-900">
                {announcement.Title}
              </h2>

              <p className="mt-3 text-slate-600">{announcement.Message}</p>
            </article>
          ))}
        </div>
      </div>

      <BottomNav />
    </main>
  );
}