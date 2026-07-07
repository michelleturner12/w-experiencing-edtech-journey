import BottomNav from "../../components/BottomNav";

export default function MorePage() {
  return (
    <main className="min-h-screen bg-slate-100 pb-24">
      <div className="mx-auto max-w-5xl p-8">
        <h1 className="mb-6 text-4xl font-bold">More</h1>

        <div className="grid gap-4">
          <div className="rounded-2xl bg-white p-6 shadow">
            <h2 className="text-xl font-bold">🤝 Partners</h2>
            <p className="mt-2 text-slate-600">Partner information will appear here.</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <h2 className="text-xl font-bold">📢 Announcements</h2>
            <p className="mt-2 text-slate-600">Conference announcements will appear here.</p>
          </div>
        </div>
      </div>

      <BottomNav />
    </main>
  );
}