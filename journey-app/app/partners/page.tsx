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
      const response = await fetch(SHEET_URL);
      const text = await response.text();
      setPartners(parseCSV(text));
      setLoading(false);
    }

    loadPartners();
  }, []);

  return (
    <main className="min-h-screen bg-slate-100 pb-24">
      <div className="mx-auto max-w-5xl p-8">
        <h1 className="mb-2 text-4xl font-bold">Partners</h1>

        <p className="mb-6 text-slate-600">
          Explore the organizations supporting Experiencing EdTech 2026.
        </p>

        {loading && <p className="text-slate-600">Loading partners...</p>}

        {!loading && partners.length === 0 && (
          <div className="rounded-2xl bg-white p-6 text-slate-600 shadow">
            Partner information will be available soon.
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          {partners.map((partner) => (
            <div
              key={partner.PartnerID}
              className="rounded-2xl bg-white p-6 shadow"
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
                {partner.Tier}
              </p>

              <h2 className="mt-1 text-xl font-bold text-slate-900">
                {partner.Name}
              </h2>

              {partner.Booth && (
                <p className="mt-2 text-sm text-slate-500">
                  Booth {partner.Booth}
                </p>
              )}

              {partner.Website && (
                <a
                  href={partner.Website}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-block font-semibold text-teal-700 underline"
                >
                  Visit website
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </main>
  );
}