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

type Speaker = {
  Name: string;
  Title: string;
  Organization: string;
  Bio: string;
  Photo: string;
};

type SpeakerWithSessions = Speaker & {
  Sessions: Session[];
};

const SPEAKERS_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRSmAC3kHb6-asEJxqGcQUnm723xpUiFYy7sSObHEvckb5AgSmU6sIfruCrQC7O-TqxSs8KtNa-_xgZ/pub?gid=1680982673&single=true&output=csv";

const SESSIONS_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRSmAC3kHb6-asEJxqGcQUnm723xpUiFYy7sSObHEvckb5AgSmU6sIfruCrQC7O-TqxSs8KtNa-_xgZ/pub?gid=0&single=true&output=csv";

function cleanName(value: string) {
  return String(value ?? "")
    .normalize("NFKD")
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .replace(/[^a-zA-Z0-9]/g, "")
    .toLowerCase();
}

export default function SpeakersPage() {
  const [speakers, setSpeakers] = useState<SpeakerWithSessions[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [speakerResponse, sessionResponse] = await Promise.all([
          fetch(SPEAKERS_URL, {
            cache: "no-store",
          }),
          fetch(SESSIONS_URL, {
            cache: "no-store",
          }),
        ]);

        if (!speakerResponse.ok) {
          throw new Error(
            `Could not load speakers: ${speakerResponse.status}`
          );
        }

        if (!sessionResponse.ok) {
          throw new Error(
            `Could not load sessions: ${sessionResponse.status}`
          );
        }

        const [speakerText, sessionText] = await Promise.all([
          speakerResponse.text(),
          sessionResponse.text(),
        ]);

        const speakerData = parseCSV<Speaker>(speakerText);
        const sessionData = parseCSV<Session>(sessionText);

        const connectedSpeakers: SpeakerWithSessions[] = speakerData.map(
          (speaker) => {
            const speakerName = cleanName(speaker.Name);

            const matchingSessions = sessionData.filter((session) => {
              const sessionSpeaker = cleanName(session.Speaker);

              return (
                speakerName.length > 0 &&
                sessionSpeaker.length > 0 &&
                sessionSpeaker.includes(speakerName)
              );
            });

            return {
              ...speaker,
              Sessions: matchingSessions,
            };
          }
        );

        setSpeakers(connectedSpeakers);
      } catch (error) {
        console.error("Could not load speaker information:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
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
          Meet the leaders and innovators sharing ideas at this year’s
          conference.
        </p>

        {loading && (
          <p className="mt-8 text-slate-600">
            Loading speakers...
          </p>
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

              <details className="border-t border-[#DDEAF2]">
                <summary className="cursor-pointer list-none px-6 py-4 text-sm font-bold text-[#062B70] hover:bg-[#F4F8FB]">
                  View Speaker Details ↓
                </summary>

                <div className="px-6 pb-6">
                  {speaker.Sessions.length > 0 && (
                    <div className="mb-5">
                      <p className="text-xs font-bold uppercase tracking-wide text-[#FF6242]">
                        Presenting
                      </p>

                      <div className="mt-2 space-y-3">
                        {speaker.Sessions.map((session) => (
                          <div
                            key={
                              session.SessionID ||
                              `${session.Title}-${session.Time}`
                            }
                            className="rounded-2xl bg-[#F4F8FB] p-4"
                          >
                            <p className="font-bold text-[#062B70]">
                              {session.Title}
                            </p>

                            <p className="mt-1 text-sm text-slate-500">
                              {session.Time}
                              {session.EndTime &&
                                `–${session.EndTime}`}
                              {session.Room &&
                                ` • ${session.Room}`}
                            </p>

                            {session.Strand && (
                              <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-[#12BCC4]">
                                {session.Strand}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {speaker.Bio && (
                    <div>
                      {speaker.Sessions.length > 0 && (
                        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[#12BCC4]">
                          About
                        </p>
                      )}

                      <p className="whitespace-pre-line text-sm leading-relaxed text-slate-600">
                        {speaker.Bio}
                      </p>
                    </div>
                  )}
                </div>
              </details>
            </article>
          ))}
        </div>
      </div>

      <BottomNav />
    </main>
  );
}