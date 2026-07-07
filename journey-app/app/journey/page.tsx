"use client";

import { useEffect, useState } from "react";
import BottomNav from "../../components/BottomNav";

type Session = {
  SessionID: string;
  Title: string;
  Speaker: string;
  Time: string;
  EndTime: string;
  Strand: string;
  Description: string;
  Room: string;
};

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRSmAC3kHb6-asEJxqGcQUnm723xpUiFYy7sSObHEvckb5AgSmU6sIfruCrQC7O-TqxSs8KtNa-_xgZ/pub?gid=0&single=true&output=csv";

const STORAGE_KEY = "experiencing-edtech-saved-sessions";

function parseCSV(text: string): Session[] {
  const rows = text.trim().split(/\r?\n/);
  if (rows.length < 2) return [];

  const headers = rows[0].split(",").map((header) => header.trim());

  return rows.slice(1).map((line) => {
    const values = line.split(",").map((value) => value.trim());
    const row: Record<string, string> = {};

    headers.forEach((header, index) => {
      row[header] = values[index] ?? "";
    });

    return row as Session;
  });
}

export default function JourneyPage() {
  const [savedSessions, setSavedSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadJourney() {
      const saved = localStorage.getItem(STORAGE_KEY);
      const savedIds: string[] = saved ? JSON.parse(saved) : [];

      const response = await fetch(SHEET_URL);
      const text = await response.text();
      const allSessions = parseCSV(text);

      setSavedSessions(
        allSessions.filter((session) => savedIds.includes(session.SessionID))
      );
      setLoading(false);
    }

    loadJourney();
  }, []);

  return (
    <main className="min-h-screen bg-slate-100 pb-24">
      <div className="mx-auto max-w-5xl p-8">
        <h1 className="mb-2 text-4xl font-bold">My Journey ❤️</h1>

        <p className="mb-6 text-slate-600">
          Your saved sessions will appear here.
        </p>

        {loading && <p className="text-slate-600">Loading your journey...</p>}

        {!loading && savedSessions.length === 0 && (
          <div className="rounded-2xl bg-white p-6 text-slate-600 shadow">
            You have not saved any sessions yet. Visit Sessions to begin building your journey.
          </div>
        )}

        <div className="space-y-4">
          {savedSessions.map((session) => (
            <div
              key={session.SessionID}
              className="rounded-2xl bg-white p-6 shadow"
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
                {session.Strand}
              </p>

              <h2 className="mt-1 text-xl font-bold text-slate-900">
                {session.Title}
              </h2>

              <p className="mt-1 text-slate-600">{session.Speaker}</p>

              <p className="mt-2 text-sm text-slate-500">
                {session.Time}–{session.EndTime} • {session.Room}
              </p>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </main>
  );
}