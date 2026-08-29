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

function getSavedIds(): string[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export default function SessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function refreshSavedIds() {
      setSavedIds(getSavedIds());
    }

    refreshSavedIds();

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

    window.addEventListener("focus", refreshSavedIds);
    window.addEventListener("storage", refreshSavedIds);
    window.addEventListener("pageshow", refreshSavedIds);

    return () => {
      window.removeEventListener("focus", refreshSavedIds);
      window.removeEventListener("storage", refreshSavedIds);
      window.removeEventListener("pageshow", refreshSavedIds);
    };
  }, []);

  function toggleFavorite(sessionId: string) {
    const currentIds = getSavedIds();

    const updatedIds = currentIds.includes(sessionId)
      ? currentIds.filter((id) => id !== sessionId)
      : [...currentIds, sessionId];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedIds));
    setSavedIds(updatedIds);
  }

  return (
    <main className="min-h-screen bg-[#F4F8FB] pb-28">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#12BCC4]">
          Experiencing EdTech 2026
        </p>

        <h1 className="mt-2 text-4xl font-black text-[#062B70]">
          Sessions
        </h1>

        <p className="mt-3 mb-8 text-slate-600">
          Explore the conference sessions and save your favorites.
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
            const isFavorite = savedIds.includes(session.SessionID);

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
                    onClick={() => toggleFavorite(session.SessionID)}
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition ${
                      isFavorite
                        ? "border-[#FF6242] bg-[#FFF2EF] text-[#FF6242]"
                        : "border-[#DDEAF2] bg-white text-slate-400 hover:border-[#FF6242] hover:text-[#FF6242]"
                    }`}
                    aria-label={
                      isFavorite
                        ? "Remove from My Favorites"
                        : "Add to My Favorites"
                    }
                    title={
                      isFavorite
                        ? "Remove from My Favorites"
                        : "Add to My Favorites"
                    }
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-6 w-6"
                      fill={isFavorite ? "currentColor" : "none"}
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
                      />
                    </svg>
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