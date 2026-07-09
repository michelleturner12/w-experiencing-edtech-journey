"use client";

import { useEffect, useState } from "react";
import BottomNav from "../../components/BottomNav";

type Partner = {
  PartnerID: string;
  Name: string;
  Tier: string;
  Logo: string;
  Website: string;
  Booth: string;
  Description: string;
};

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRSmAC3kHb6-asEJxqGcQUnm723xpUiFYy7sSObHEvckb5AgSmU6sIfruCrQC7O-TqxSs8KtNa-_xgZ/pub?gid=884408230&single=true&output=csv";

function parseCSV(text: string): Partner[] {
  const rows = text.trim().split(/\r?\n/);
  if (rows.length < 2) return [];

  const headers = rows[0].split(",").map((header) => header.trim());

  return rows.slice(1).map((line) => {
    const values = line.split(",").map((value) => value.trim());
    const row: Record<string, string> = {};

    headers.forEach((header, index) => {
      row[header] = values[index] ?? "";
    });

    return row as Partner;
  });
}

export default function PartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPartners() {
      const response = await fetch(SHEET_URL, { cache: "no-store" });
      const text = await response.text();
      setPartners(parseCSV(text));
      setLoading(false);
    }

    loadPartners();
  }, []);

  return (
    <main className="min-h-screen bg-[#F4F8FB] pb-28">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#12BCC4]">
          Experiencing EdTech 2026
        </p>

        <h1 className="mt-2 text-4xl font-black text-[#062B70]">
          Partners
        </h1>

        <p className="mt-3 text-slate-600">
          Explore the organizations supporting this year’s conference.
        </p>

        {loading && <p className="mt-8 text-slate-600">Loading partners...</p>}

        {!loading && partners.length === 0 && (
          <div className="mt-8 rounded-2xl bg-white p-6 text-slate-600 shadow">
            Partner information will be added soon.
          </div>
        )}

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {partners.map((partner, index) => (
            <article
              key={`${partner.Name}-${index}`}
              className="rounded-3xl border border-[#DDEAF2] bg-white p-6 shadow-lg"
            >
              {partner.Logo && (
                <img
                  src={partner.Logo}
                  alt={partner.Name}
                  className="mb-5 max-h-20 w-full object-contain"
                />
              )}

              <p className="text-sm font-bold uppercase tracking-wide text-[#12BCC4]">
                {partner.Tier || "Partner"}
              </p>

              <h2 className="mt-2 text-xl font-black text-[#062B70]">
                {partner.Name}
              </h2>

              {partner.Booth && (
                <p className="mt-2 text-sm font-semibold text-slate-500">
                  Booth {partner.Booth}
                </p>
              )}

              {partner.Description && (
                <p className="mt-4 text-sm leading-relaxed text-slate-600">
                  {partner.Description}
                </p>
              )}

              {partner.Website && (
                <a
                  href={partner.Website}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex rounded-xl bg-[#062B70] px-4 py-3 text-sm font-bold text-white hover:bg-[#075C9B]"
                >
                  Visit Website
                </a>
              )}
            </article>
          ))}
        </div>
      </div>

      <BottomNav />
    </main>
  );
}