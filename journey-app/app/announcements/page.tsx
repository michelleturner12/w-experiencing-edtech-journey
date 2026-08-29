"use client";

import { useEffect, useState } from "react";
import BottomNav from "../../components/BottomNav";
import { parseCSV } from "../../lib/csv";

type Announcement = {
  Date: string;
  Time: string;
  Title: string;
  Message: string;
  Priority: string;
};

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRSmAC3kHb6-asEJxqGcQUnm723xpUiFYy7sSObHEvckb5AgSmU6sIfruCrQC7O-TqxSs8KtNa-_xgZ/pub?gid=753361707&single=true&output=csv";

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAnnouncements() {
      try {
        const response = await fetch(SHEET_URL, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`Could not load announcements: ${response.status}`);
        }

        const text = await response.text();

        setAnnouncements(parseCSV<Announcement>(text));
      } catch (error) {
        console.error("Could not load announcements:", error);
      } finally {
        setLoading(false);
      }
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
          <p className="mt-8 text-slate-600">
            Loading announcements...
          </p>
        )}

        {!loading && announcements.length === 0 && (
          <div className="mt-8 rounded-2xl bg-white p-6 text-slate-600 shadow">
            No announcements yet. Check back soon.
          </div>
        )}

        <div className="mt-8 space-y-4">
          {announcements.map((announcement, index) => (
            <article
              key={`${announcement.Title}-${announcement.Date}-${index}`}
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

              {announcement.Message && (
                <p className="mt-3 whitespace-pre-line leading-relaxed text-slate-600">
                  {announcement.Message}
                </p>
              )}
            </article>
          ))}
        </div>
      </div>

      <BottomNav />
    </main>
  );
}