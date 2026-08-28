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

export default function JourneyPage() {
  const [favoriteSessions, setFavoriteSessions] = useState<Session[]>([]);
  const [allSessions, setAllSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFavorites() {
      try {
        const response = await fetch(SHEET_URL, {
          cache: "no-store",
        });

        const text = await response.text();
        const sessions = parseCSV<Session>(text);

        setAllSessions(sessions);

        const saved = localStorage.getItem(STORAGE_KEY);
        const savedIds: string[] = saved ? JSON.parse(saved) : [];

        setFavoriteSessions(
          sessions.filter((session) =>
            savedIds.includes(session.SessionID)
          )
        );
      } catch (error) {
        console.error("Could not load favorite sessions:", error);
      } finally {
        setLoading(false);
      }
    }

    loadFavorites();
  }, []);

  useEffect(() => {
    function refreshFavorites() {
      const saved = localStorage.getItem(STORAGE_KEY);
      const savedIds: string[] = saved ? JSON.parse(saved) : [];

      setFavoriteSessions(
        allSessions.filter((session) =>
          savedIds.includes(session.SessionID)
        )
      );
    }

    window.addEventListener("focus", refreshFavorites);
    window.addEventListener("storage", refreshFavorites);

    return () => {
      window.removeEventListener("focus", refreshFavorites);
      window.removeEventListener("storage", refreshFavorites);
    };
  }, [allSessions]);

  function removeFavorite(sessionId: string) {
    const saved = localStorage.getItem(STORAGE_KEY);
    const savedIds: string[] = saved ? JSON.parse(saved) : [];

    const updatedIds = savedIds.filter((id) => id !== sessionId);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedIds));

    setFavoriteSessions((current) =>
      current.filter((session) => session.SessionID !== sessionId)
    );
  }

  return (
    <main className="min-h-screen bg-[#F4F8FB] pb-24">
      <div className="mx-auto max-w-5xl p-8">
        <h1 className="mb-2 text-4xl font-black text-[#062B70]">
          My Favorite Sessions
        </h1>

        <p className="mb-6 text-slate-600">
          Your saved sessions will appear here.
        </p>

        {loading && (
          <p className="text-slate-600">
            Loading your favorite sessions...
          </p>
        )}

        {!loading && favoriteSessions.length === 0 && (
          <div className="rounded-2xl bg-white p-6 text-slate-600 shadow">
            You have not saved any sessions yet. Visit Sessions and tap the
            heart to add favorites.
          </div>
        )}

        <div className="space-y-4">
          {favoriteSessions.map((session) => (
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
                    <p className="mt-1 text-slate-600">
                      {session.Speaker}
                    </p>
                  )}

                  <p className="mt-2 text-sm text-slate-500">
                    {session.Time}
                    {session.EndTime && `–${session.EndTime}`}
                    {session.Room && ` • ${session.Room}`}
                  </p>

                  {session.Description && (
                    <p className="mt-4 whitespace-pre-line text-slate-600">
                      {session.Description}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => removeFavorite(session.SessionID)}
                  className="h-fit shrink-0 text-3xl"
                  aria-label="Remove from My Favorite Sessions"
                  title="Remove from My Favorite Sessions"
                >
                  ❤️
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      <BottomNav />
    </main>
  );
}