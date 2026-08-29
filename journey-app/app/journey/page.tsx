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

export default function JourneyPage() {
  const [allSessions, setAllSessions] = useState<Session[]>([]);
  const [favoriteSessions, setFavoriteSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  function refreshFavorites(sessions: Session[]) {
    const savedIds = getSavedIds();

    setFavoriteSessions(
      sessions.filter((session) =>
        savedIds.includes(session.SessionID)
      )
    );
  }

  useEffect(() => {
    let loadedSessions: Session[] = [];

    async function loadFavorites() {
      try {
        const response = await fetch(SHEET_URL, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(
            `Could not load favorite sessions: ${response.status}`
          );
        }

        const text = await response.text();
        loadedSessions = parseCSV<Session>(text);

        setAllSessions(loadedSessions);
        refreshFavorites(loadedSessions);
      } catch (error) {
        console.error("Could not load favorite sessions:", error);
      } finally {
        setLoading(false);
      }
    }

    function refreshFromStorage() {
      if (loadedSessions.length > 0) {
        refreshFavorites(loadedSessions);
      }
    }

    loadFavorites();

    window.addEventListener("focus", refreshFromStorage);
    window.addEventListener("storage", refreshFromStorage);
    window.addEventListener("pageshow", refreshFromStorage);

    return () => {
      window.removeEventListener("focus", refreshFromStorage);
      window.removeEventListener("storage", refreshFromStorage);
      window.removeEventListener("pageshow", refreshFromStorage);
    };
  }, []);

  function removeFavorite(sessionId: string) {
    const savedIds = getSavedIds();

    const updatedIds = savedIds.filter(
      (id) => id !== sessionId
    );

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedIds)
    );

    setFavoriteSessions(
      allSessions.filter((session) =>
        updatedIds.includes(session.SessionID)
      )
    );
  }

  return (
    <main className="min-h-screen bg-[#F4F8FB] pb-28">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#12BCC4]">
          Experiencing EdTech 2026
        </p>

        <h1 className="mt-2 text-4xl font-black text-[#062B70]">
          My Favorite Sessions
        </h1>

        <p className="mt-3 mb-8 text-slate-600">
          Keep track of the sessions you don't want to miss.
        </p>

        {loading && (
          <p className="text-slate-600">
            Loading your favorite sessions...
          </p>
        )}

        {!loading && favoriteSessions.length === 0 && (
          <div className="rounded-2xl border border-[#DDEAF2] bg-white p-6 shadow">
            <h2 className="font-bold text-[#062B70]">
              No favorites yet
            </h2>

            <p className="mt-2 text-slate-600">
              Visit Sessions and select the heart next to any session you want
              to save.
            </p>
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
                  onClick={() => removeFavorite(session.SessionID)}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#FF6242] bg-[#FFF2EF] text-[#FF6242] transition hover:bg-[#FFE3DC]"
                  aria-label="Remove from My Favorites"
                  title="Remove from My Favorites"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-6 w-6"
                    fill="currentColor"
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
          ))}
        </div>
      </div>

      <BottomNav />
    </main>
  );
}