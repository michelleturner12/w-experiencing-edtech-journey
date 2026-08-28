"use client";

import { useEffect, useState } from "react";
import BottomNav from "../../components/BottomNav";
import { parseCSV } from "../../lib/csv";

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

export default function SessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        setSavedIds(JSON.parse(saved));
      } catch {
        console.warn("Could not read saved sessions.");
      }
    }

    async function loadSessions() {
      try {
        const response = await fetch(SHEET_URL, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`Could not load sessions: ${response.status}`);
        }

        const text = await response.text();

        setSessions(parseCSV<Session>(text));
      } catch (error) {
        console.error("Could not load sessions:", error);
      } finally {
        setLoading(false);
      }
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
        <h1 className="mb-2 text-4xl font-bold text-[#062B70]">
          Sessions
        </h1>

        <p className="mb-6 text-slate-600">
          Explore sessions and save the ones you want in My Schedule.
        </p>

        {loading && (
          <p className="text-slate-600">
            Loading sessions...
          </p>
        )}

        {!loading && sessions.length === 0 && (
          <div className="rounded-2xl bg-white p-6 text-slate-600 shadow">
            No sessions are available yet.
          </div>
        )}

        <div className="space-y-4">
          {sessions.map((session) => {
            const isSaved = savedIds.includes(session.SessionID);

            return (
              <article
                key={session.SessionID}
                className="rounded-2xl border border-[#DDEAF2] bg-white p-6 shadow"
              >
                <div className="flex justify-between gap-4">
                  <div className="min-w-0">
                    {session.Strand && (
                      <p className="text-sm font-semibold uppercase tracking-wide text-[#12BCC4]">
                        {session.Strand}
                      </p>
                    )}

                    <h2 className="mt-1 text-xl font-bold text-[#062B70]">
                      {session.Title}
                    </h2>

                    {session.Speaker && (
                      <p className="mt-1 font-medium text-slate-600">
                        {session.Speaker}
                      </p>
                    )}

                    <p className="mt-2 text-sm text-slate-500">
                      {session.Time}
                      {session.EndTime && `–${session.EndTime}`}
                      {session.Room && ` • ${session.Room}`}
                    </p>

                    {session.Description && (
                      <p className="mt-4 whitespace-pre-line leading-relaxed text-slate-600">
                        {session.Description}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleSaved(session.SessionID)}
                    className="h-fit shrink-0 text-3xl"
                    aria-label={
                      isSaved
                        ? "Remove from My Schedule"
                        : "Add to My Schedule"
                    }
                    title={
                      isSaved
                        ? "Remove from My Schedule"
                        : "Add to My Schedule"
                    }
                  >
                    {isSaved ? "❤️" : "🤍"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <BottomNav />
    </main>
  );
}