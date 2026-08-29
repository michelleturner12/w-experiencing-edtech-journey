"use client";

import { useEffect, useState } from "react";
import BottomNav from "../../components/BottomNav";
import { parseCSV } from "../../lib/csv";

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

function getTier(tier: string) {
  const value = String(tier || "").toLowerCase();

  if (value.includes("luminary")) return "luminary";
  if (value.includes("dynamo")) return "dynamo";
  if (value.includes("trail")) return "trail";

  return "other";
}

function LuminaryCard({ partner }: { partner: Partner }) {
  return (
    <article className="luminary-card">
      <div className="luminary-banner">FEATURED SPONSOR</div>

      <div className="luminary-content">
        {partner.Logo && (
          <div className="luminary-logo-box">
            <img
              src={partner.Logo}
              alt={partner.Name}
              className="luminary-logo"
            />
          </div>
        )}

        <div className="luminary-level">EDTECH LUMINARY</div>

        <h3 className="luminary-name">{partner.Name}</h3>

        {partner.Booth && partner.Booth !== "0" && (
          <p className="luminary-booth">Booth {partner.Booth}</p>
        )}

        {partner.Description && (
          <p className="luminary-description">{partner.Description}</p>
        )}

        {partner.Website && (
          <a
            href={partner.Website}
            target="_blank"
            rel="noreferrer"
            className="luminary-button"
          >
            Visit Website
          </a>
        )}
      </div>
    </article>
  );
}

function DynamoCard({ partner }: { partner: Partner }) {
  return (
    <article className="dynamo-card">
      <div className="dynamo-banner">DIGITAL DYNAMO</div>

      <div className="dynamo-content">
        {partner.Logo && (
          <div className="dynamo-logo-box">
            <img
              src={partner.Logo}
              alt={partner.Name}
              className="dynamo-logo"
            />
          </div>
        )}

        <h3 className="dynamo-name">{partner.Name}</h3>

        {partner.Booth && partner.Booth !== "0" && (
          <p className="partner-booth">Booth {partner.Booth}</p>
        )}

        {partner.Description && (
          <p className="partner-description">{partner.Description}</p>
        )}

        {partner.Website && (
          <a
            href={partner.Website}
            target="_blank"
            rel="noreferrer"
            className="dynamo-button"
          >
            Visit Website
          </a>
        )}
      </div>
    </article>
  );
}

function TrailCard({ partner }: { partner: Partner }) {
  return (
    <article className="trail-card">
      {partner.Logo && (
        <div className="trail-logo-box">
          <img
            src={partner.Logo}
            alt={partner.Name}
            className="trail-logo"
          />
        </div>
      )}

      <div className="trail-info">
        <div className="trail-level">TECH TRAIL PARTNER</div>

        <h3 className="trail-name">{partner.Name}</h3>

        {partner.Booth && partner.Booth !== "0" && (
          <p className="trail-booth">Booth {partner.Booth}</p>
        )}

        {partner.Description && (
          <p className="trail-description">{partner.Description}</p>
        )}

        {partner.Website && (
          <a
            href={partner.Website}
            target="_blank"
            rel="noreferrer"
            className="trail-link"
          >
            Visit Website →
          </a>
        )}
      </div>
    </article>
  );
}

export default function PartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPartners() {
      try {
        const response = await fetch(SHEET_URL, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(
            `Could not load partners: ${response.status}`
          );
        }

        const text = await response.text();
        const data = parseCSV<Partner>(text);

        setPartners(data);
      } catch (error) {
        console.error("Could not load partners:", error);
      } finally {
        setLoading(false);
      }
    }

    loadPartners();
  }, []);

  const luminaries = partners.filter(
    (partner) => getTier(partner.Tier) === "luminary"
  );

  const dynamos = partners.filter(
    (partner) => getTier(partner.Tier) === "dynamo"
  );

  const trails = partners.filter(
    (partner) => getTier(partner.Tier) === "trail"
  );

  return (
    <>
      <style jsx global>{`
        .partners-page {
          min-height: 100vh;
          background: #f4f8fb;
          padding-bottom: 100px;
        }

        .partners-header {
          max-width: 1150px;
          margin: 0 auto;
          padding: 40px 24px 32px;
        }

        .partners-eyebrow {
          margin: 0;
          color: #12bcc4;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 3px;
          text-transform: uppercase;
        }

        .partners-title {
          margin: 8px 0 0;
          color: #062b70;
          font-size: 40px;
          line-height: 1.05;
          font-weight: 900;
        }

        .partners-intro {
          margin: 14px 0 0;
          max-width: 650px;
          color: #64748b;
          font-size: 16px;
          line-height: 1.6;
        }

        /* =========================
           LUMINARY
        ========================== */

        .luminary-section {
          background: #062b70;
          padding: 48px 24px 58px;
          border-top: 8px solid #ffb13b;
          border-bottom: 8px solid #ffb13b;
        }

        .luminary-inner {
          max-width: 1150px;
          margin: 0 auto;
        }

        .luminary-heading {
          text-align: center;
          margin-bottom: 30px;
        }

        .luminary-heading-small {
          color: #ffb13b;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 3px;
          text-transform: uppercase;
        }

        .luminary-heading h2 {
          margin: 8px 0 0;
          color: white;
          font-size: 36px;
          line-height: 1.1;
          font-weight: 900;
        }

        .luminary-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 30px;
        }

        .luminary-card {
          overflow: hidden;
          background: white;
          border: 5px solid #ffb13b;
          border-radius: 30px;
          box-shadow: 0 22px 50px rgba(0, 0, 0, 0.28);
        }

        .luminary-banner {
          background: #ffb13b;
          color: #062b70;
          padding: 13px 20px;
          text-align: center;
          font-size: 14px;
          font-weight: 900;
          letter-spacing: 2px;
        }

        .luminary-content {
          padding: 32px;
        }

        .luminary-logo-box {
          height: 230px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f7fafc;
          border-radius: 22px;
          padding: 30px;
        }

        .luminary-logo {
          display: block;
          max-width: 90%;
          max-height: 175px;
          object-fit: contain;
        }

        .luminary-level {
          margin-top: 25px;
          color: #ff6242;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 2px;
        }

        .luminary-name {
          margin: 7px 0 0;
          color: #062b70;
          font-size: 30px;
          line-height: 1.1;
          font-weight: 900;
        }

        .luminary-booth {
          color: #ff6242;
          font-weight: 800;
        }

        .luminary-description {
          color: #64748b;
          line-height: 1.65;
          font-size: 15px;
        }

        .luminary-button {
          display: inline-block;
          margin-top: 18px;
          background: #ff6242;
          color: white;
          padding: 13px 22px;
          border-radius: 12px;
          font-weight: 800;
          text-decoration: none;
        }

        /* =========================
           DYNAMO
        ========================== */

        .dynamo-section {
          max-width: 1150px;
          margin: 0 auto;
          padding: 55px 24px;
        }

        .section-label {
          margin-bottom: 22px;
        }

        .section-label h2 {
          margin: 0;
          color: #062b70;
          font-size: 28px;
          font-weight: 900;
        }

        .section-label p {
          margin: 5px 0 0;
          color: #12bcc4;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .dynamo-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 24px;
        }

        .dynamo-card {
          overflow: hidden;
          background: white;
          border: 3px solid #12bcc4;
          border-radius: 22px;
          box-shadow: 0 10px 24px rgba(6, 43, 112, 0.12);
        }

        .dynamo-banner {
          background: #12bcc4;
          color: #062b70;
          padding: 10px 18px;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 2px;
        }

        .dynamo-content {
          padding: 24px;
        }

        .dynamo-logo-box {
          height: 145px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f7fafc;
          border-radius: 16px;
          padding: 22px;
        }

        .dynamo-logo {
          max-width: 85%;
          max-height: 105px;
          object-fit: contain;
        }

        .dynamo-name {
          margin: 20px 0 0;
          color: #062b70;
          font-size: 23px;
          line-height: 1.2;
          font-weight: 900;
        }

        .partner-booth {
          margin: 7px 0 0;
          color: #64748b;
          font-size: 14px;
        }

        .partner-description {
          color: #64748b;
          font-size: 14px;
          line-height: 1.6;
        }

        .dynamo-button {
          display: inline-block;
          margin-top: 15px;
          background: #062b70;
          color: white;
          padding: 11px 18px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 800;
          text-decoration: none;
        }

        /* =========================
           TECH TRAIL
        ========================== */

        .trail-section {
          max-width: 1150px;
          margin: 0 auto;
          padding: 10px 24px 60px;
        }

        .trail-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .trail-card {
          display: flex;
          align-items: center;
          gap: 18px;
          background: white;
          border: 1px solid #dce7ef;
          border-radius: 18px;
          padding: 20px;
          min-height: 135px;
          box-shadow: 0 4px 12px rgba(6, 43, 112, 0.08);
        }

        .trail-logo-box {
          width: 125px;
          height: 95px;
          flex: 0 0 125px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f7fafc;
          border-radius: 12px;
          padding: 12px;
        }

        .trail-logo {
          max-width: 100%;
          max-height: 72px;
          object-fit: contain;
        }

        .trail-info {
          min-width: 0;
          flex: 1;
        }

        .trail-level {
          color: #94a3b8;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 1.3px;
        }

        .trail-name {
          margin: 5px 0 0;
          color: #062b70;
          font-size: 19px;
          line-height: 1.15;
          font-weight: 900;
        }

        .trail-booth {
          margin: 5px 0 0;
          color: #64748b;
          font-size: 12px;
        }

        .trail-description {
          margin: 9px 0 0;
          color: #64748b;
          font-size: 13px;
          line-height: 1.5;
        }

        .trail-link {
          display: inline-block;
          margin-top: 8px;
          color: #075c9b;
          font-size: 13px;
          font-weight: 800;
          text-decoration: none;
        }

        /* =========================
           MOBILE
        ========================== */

        @media (max-width: 700px) {
          .partners-header {
            padding: 28px 18px 25px;
          }

          .partners-title {
            font-size: 34px;
          }

          .luminary-section {
            padding: 36px 16px 42px;
            border-top-width: 7px;
            border-bottom-width: 7px;
          }

          .luminary-heading h2 {
            font-size: 31px;
          }

          .luminary-grid {
            grid-template-columns: 1fr;
            gap: 26px;
          }

          .luminary-card {
            border-width: 5px;
            border-radius: 26px;
          }

          .luminary-banner {
            padding: 14px;
            font-size: 13px;
          }

          .luminary-content {
            padding: 25px;
          }

          .luminary-logo-box {
            height: 190px;
            padding: 26px;
          }

          .luminary-logo {
            max-height: 145px;
          }

          .luminary-name {
            font-size: 29px;
          }

          .luminary-button {
            width: 100%;
            text-align: center;
          }

          .dynamo-section {
            padding: 42px 18px;
          }

          .dynamo-grid {
            grid-template-columns: 1fr;
            gap: 18px;
          }

          .dynamo-card {
            border-width: 3px;
          }

          .dynamo-logo-box {
            height: 125px;
          }

          .dynamo-name {
            font-size: 22px;
          }

          .trail-section {
            padding: 5px 18px 50px;
          }

          .trail-grid {
            grid-template-columns: 1fr;
            gap: 13px;
          }

          .trail-card {
            min-height: 118px;
            padding: 16px;
            gap: 16px;
          }

          .trail-logo-box {
            width: 105px;
            height: 82px;
            flex-basis: 105px;
          }

          .trail-logo {
            max-height: 62px;
          }

          .trail-name {
            font-size: 18px;
          }

          .trail-level {
            font-size: 9px;
          }

          .trail-description {
            font-size: 12px;
          }
        }
      `}</style>

      <main className="partners-page">
        <header className="partners-header">
          <p className="partners-eyebrow">
            Experiencing EdTech 2026
          </p>

          <h1 className="partners-title">
            Conference Partners
          </h1>

          <p className="partners-intro">
            Meet the organizations helping make Experiencing EdTech 2026
            possible.
          </p>

          {loading && <p>Loading partners...</p>}
        </header>

        {luminaries.length > 0 && (
          <section className="luminary-section">
            <div className="luminary-inner">
              <div className="luminary-heading">
                <div className="luminary-heading-small">
                  Premier Conference Sponsors
                </div>

                <h2>EdTech Luminaries</h2>
              </div>

              <div className="luminary-grid">
                {luminaries.map((partner, index) => (
                  <LuminaryCard
                    key={
                      partner.PartnerID ||
                      `${partner.Name}-${index}`
                    }
                    partner={partner}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {dynamos.length > 0 && (
          <section className="dynamo-section">
            <div className="section-label">
              <h2>Digital Dynamos</h2>
              <p>Featured Conference Sponsors</p>
            </div>

            <div className="dynamo-grid">
              {dynamos.map((partner, index) => (
                <DynamoCard
                  key={
                    partner.PartnerID ||
                    `${partner.Name}-${index}`
                  }
                  partner={partner}
                />
              ))}
            </div>
          </section>
        )}

        {trails.length > 0 && (
          <section className="trail-section">
            <div className="section-label">
              <h2>Tech Trail Partners</h2>
              <p>Conference Partners</p>
            </div>

            <div className="trail-grid">
              {trails.map((partner, index) => (
                <TrailCard
                  key={
                    partner.PartnerID ||
                    `${partner.Name}-${index}`
                  }
                  partner={partner}
                />
              ))}
            </div>
          </section>
        )}

        <BottomNav />
      </main>
    </>
  );
}