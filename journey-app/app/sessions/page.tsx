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

const STORAGE_KEY = "experiencing-edtech-saved-sessions";

export default function SessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setSavedIds(JSON.parse(saved));

    async function loadSessions() {
      const response = await fetch(SHEET_URL, { cache: "no-store" });
      const text = await response.text();
      setSessions(parseCSV(text));
      setLoading(false);
    }

    loadSessions();
  }, []);

  function toggleSaved(sessionId: string) {
    const updated = savedIds.includes(sessionId)
      ? savedIds.filter((id) => id !== sessionId)
      : [...savedIds, sessionId];

    setSavedIds(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  return (
    <main className="min-h-screen bg-slate-100 pb-24">
      <div className="mx-auto max-w-5xl p-8">
        <h1 className="mb-2 text-4xl font-bold">Sessions</h1>

        <p className="mb-6 text-slate-600">
          Explore sessions and save the ones you want in My Journey.
        </p>

        {loading && <p className="text-slate-600">Loading sessions...</p>}

        {!loading && sessions.length === 0 && (
          <div className="rounded-2xl bg-white p-6 text-slate-600 shadow">
            No sessions are available yet.
          </div>
        )}

        <div className="space-y-4">
          {sessions.map((session) => {
            const isSaved = savedIds.includes(session.SessionID);

            return (
              <div
                key={session.SessionID}
                className="rounded-2xl bg-white p-6 shadow"
              >
                <div className="flex justify-between gap-4">
                  <div>
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

                    {session.Description && (
                      <p className="mt-4 text-slate-600">
                        {session.Description}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => toggleSaved(session.SessionID)}
                    className="h-fit text-3xl"
                    aria-label={
                      isSaved ? "Remove saved session" : "Save session"
                    }
                  >
                    {isSaved ? "❤️" : "🤍"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <BottomNav />
    </main>
  );
}