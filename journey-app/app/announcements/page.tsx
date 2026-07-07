import BottomNav from "../../components/BottomNav";

export default function AnnouncementsPage() {
  return (
    <main className="min-h-screen bg-slate-100 p-8 pb-24">
      <h1 className="text-4xl font-bold">Announcements</h1>
      <p className="mt-4 text-slate-600">Conference updates will appear here.</p>
      <BottomNav />
    </main>
  );
}