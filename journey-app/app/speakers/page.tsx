"use client";

import { useEffect, useState } from "react";
import BottomNav from "../../components/BottomNav";

type Speaker = {
  Name: string;
  Title: string;
  Organization: string;
  Bio: string;
  Photo: string;
  SessionTitle: string;
};

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRSmAC3kHb6-asEJxqGcQUnm723xpUiFYy7sSObHEvckb5AgSmU6sIfruCrQC7O-TqxSs8KtNa-_xgZ/pub?gid=1680982673&single=true&output=csv";

function parseCSV(text: string): Speaker[] {
  const rows = text.trim().split(/\r?\n/);
  if (rows.length < 2) return [];

  const headers = rows[0].split(",").map((header) => header.trim());

  return rows.slice(1).map((line) => {
    const values = line.split(",").map((value) => value.trim());
    const row: Record<string, string> = {};

    headers.forEach((header, index) => {
      row[header] = values[index] ?? "";
    });

    return row as Speaker;
  });
}

export default function SpeakersPage() {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSpeakers() {
      try {
        const response = await fetch(SHEET_URL, { cache: "no-store" });
        const text = await response.text();
        setSpeakers(parseCSV(text));
      } catch (error) {
        console.error("Could not load speakers:", error);
      } finally {
        setLoading(false);
      }
    }

    loadSpeakers();
  }, []);

  return (
    <main className="min-h-screen bg-[#F4F8FB] pb-28">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#12BCC4]">
          Experiencing EdTech 2026
        </p>

        <h1 className="mt-2 text-4xl font-black text-[#062B70]">
          Featured Speakers
        </h1>

        <p className="mt-3 text-slate-600">
          Meet the leaders and innovators sharing ideas at this year’s conference.
        </p>

        {loading && (
          <p className="mt-8 text-slate-600">Loading speakers...</p>
        )}

        {!loading && speakers.length === 0 && (
          <div className="mt-8 rounded-2xl bg-white p-6 text-slate-600 shadow">
            Speaker information will be added soon.
          </div>
        )}

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {speakers.map((speaker, index) => (
            <article
              key={`${speaker.Name}-${index}`}
              className="overflow-hidden rounded-3xl border border-[#DDEAF2] bg-white shadow-lg"
            >
              <div className="flex items-start gap-4 p-6">
                {speaker.Photo ? (
                  <img
                    src={speaker.Photo}
                    alt={speaker.Name}
                    className="h-20 w-20 shrink-0 rounded-2xl object-cover"
                  />
                ) : (
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#E8F8F8] text-2xl font-black text-[#12BCC4]">
                    {speaker.Name?.charAt(0) || "S"}
                  </div>
                )}

                <div className="min-w-0">
                  <h2 className="text-xl font-black text-[#062B70]">
                    {speaker.Name}
                  </h2>

                  {(speaker.Title || speaker.Organization) && (
                    <p className="mt-1 text-sm font-semibold text-[#12BCC4]">
                      {[speaker.Title, speaker.Organization]
                        .filter(Boolean)
                        .join(" • ")}
                    </p>
                  )}
                </div>
              </div>

              <div className="border-t border-[#DDEAF2] px-6 pb-6 pt-5">
                {speaker.SessionTitle && (
                  <p className="text-sm font-bold text-[#FF6242]">
                    {speaker.SessionTitle}
                  </p>
                )}

                {speaker.Bio && (
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {speaker.Bio}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      <BottomNav />
    </main>
  );
}