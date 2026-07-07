type NavIconProps = {
  type: "home" | "sessions" | "partners" | "speakers" | "announcements";
};

export default function NavIcon({ type }: NavIconProps) {
  const icons = {
    home: "🏠",
    sessions: "🗓️",
    partners: "🤝",
    speakers: "🎤",
    announcements: "📣",
  };

  return (
    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-3xl shadow-sm">
      {icons[type]}
    </div>
  );
}