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
  Audience?: string;
  Featured?: string;
  Resources?: string;
  "Favorite Enabled"?: string;
  "Reflection Prompt"?: string;
};

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRSmAC3kHb6-asEJxqGcQUnm723xpUiFYy7sSObHEvckb5AgSmU6sIfruCrQC7O-TqxSs8KtNa-_xgZ/pub?gid=0&single=true&output=csv";

const STORAGE_KEY = "experiencing-edtech-saved-sessions";

function getSavedIds() {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];

    return Array.isArray(parsed)
      ? parsed.map((value) => String(value))
      : [];
  } catch {
    return [];
  }
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-6 w-6"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
    </svg>
  );
}

export default function SessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSessions() {
      try {
        const response = await fetch(SHEET_URL, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(
            `Could not load sessions: ${response.status}`
          );
        }

        const text = await response.text();
        const data = parseCSV<Session>(text);

        setSessions(data);
      } catch (error) {
        console.error("Could not load sessions:", error);
      } finally {
        setLoading(false);
      }
    }

    function refreshFavorites() {
      setSavedIds(getSavedIds());
    }

    loadSessions();
    refreshFavorites();

    window.addEventListener("focus", refreshFavorites);
    window.addEventListener("storage", refreshFavorites);
    window.addEventListener("pageshow", refreshFavorites);

    return () => {
      window.removeEventListener("focus", refreshFavorites);
      window.removeEventListener("storage", refreshFavorites);
      window.removeEventListener("pageshow", refreshFavorites);
    };
  }, []);

  function toggleFavorite(sessionId: string) {
    const id = String(sessionId);

    const nextSavedIds = savedIds.includes(id)
      ? savedIds.filter((savedId) => savedId !== id)
      : [...savedIds, id];

    setSavedIds(nextSavedIds);
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(nextSavedIds)
    );
  }

  return (
    <main className="min-h-screen bg-[#F4F8FB] pb-28">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#12BCC4]">
          Experiencing EdTech 2026
        </p>

        <h1 className="mt-2 text-4xl font-black text-[#062B70]">
          Sessions
        </h1>

        <p className="mt-3 text-slate-600">
          Explore the conference sessions and save your favorites.
        </p>

        {loading && (
          <p className="mt-8 text-slate-600">
            Loading sessions...
          </p>
        )}

        {!loading && sessions.length === 0 && (
          <div className="mt-8 rounded-2xl bg-white p-6 text-slate-600 shadow">
            Session information will be added soon.
          </div>
        )}

        <div className="mt-8 space-y-5">
          {sessions.map((session, index) => {
            const sessionId =
              String(session.SessionID || "").trim();

            const isSaved =
              sessionId.length > 0 &&
              savedIds.includes(sessionId);

            return (
              <article
                key={
                  sessionId ||
                  `${session.Title}-${session.Time}-${index}`
                }
                className="overflow-hidden rounded-3xl border border-[#DDEAF2] bg-white shadow-md"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between gap-5">
                    <div className="min-w-0 flex-1">
                      {session.Strand && (
                        <p className="text-xs font-black uppercase tracking-wide text-[#12BCC4]">
                          {session.Strand}
                        </p>
                      )}

                      <h2 className="mt-2 text-2xl font-black leading-tight text-[#062B70]">
                        {session.Title}
                      </h2>

                      {session.Speaker && (
                        <p className="mt-2 text-base text-slate-600">
                          {session.Speaker}
                        </p>
                      )}

                      {(session.Time ||
                        session.EndTime ||
                        session.Room) && (
                        <p className="mt-3 text-sm font-semibold text-slate-500">
                          {session.Time}
                          {session.EndTime &&
                            `–${session.EndTime}`}
                          {session.Room &&
                            ` • ${session.Room}`}
                        </p>
                      )}
                    </div>

                    {sessionId && (
                      <button
                        type="button"
                        onClick={() =>
                          toggleFavorite(sessionId)
                        }
                        aria-label={
                          isSaved
                            ? "Remove from My Favorites"
                            : "Add to My Favorites"
                        }
                        title={
                          isSaved
                            ? "Remove from My Favorites"
                            : "Add to My Favorites"
                        }
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition ${
                          isSaved
                            ? "border-[#FF6242] bg-[#FFF0EC] text-[#FF6242]"
                            : "border-[#DDEAF2] bg-white text-slate-400 hover:border-[#FF6242] hover:text-[#FF6242]"
                        }`}
                      >
                        <HeartIcon filled={isSaved} />
                      </button>
                    )}
                  </div>
                </div>

                {(session.Description ||
                  session.Audience ||
                  session.Resources ||
                  session["Reflection Prompt"]) && (
                  <details className="border-t border-[#DDEAF2]">
                    <summary className="cursor-pointer list-none px-6 py-4 text-sm font-bold text-[#062B70] transition hover:bg-[#F4F8FB]">
                      View Session Details ↓
                    </summary>

                    <div className="space-y-5 px-6 pb-6">
                      {session.Description && (
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wide text-[#12BCC4]">
                            About This Session
                          </p>

                          <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-slate-600">
                            {session.Description}
                          </p>
                        </div>
                      )}

                      {session.Audience && (
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wide text-[#12BCC4]">
                            Audience
                          </p>

                          <p className="mt-2 text-sm text-slate-600">
                            {session.Audience}
                          </p>
                        </div>
                      )}

                      {session["Reflection Prompt"] && (
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wide text-[#12BCC4]">
                            Reflection
                          </p>

                          <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-slate-600">
                            {session["Reflection Prompt"]}
                          </p>
                        </div>
                      )}

                      {session.Resources && (
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wide text-[#12BCC4]">
                            Resources
                          </p>

                          <a
                            href={session.Resources}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-2 inline-flex text-sm font-bold text-[#075C9B] hover:text-[#12BCC4]"
                          >
                            Open Session Resources →
                          </a>
                        </div>
                      )}
                    </div>
                  </details>
                )}
              </article>
            );
          })}
        </div>
      </div>

      <BottomNav />
    </main>
  );
}