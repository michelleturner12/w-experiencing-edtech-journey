type IconType = "home" | "sessions" | "partners" | "speakers" | "announcements";

type NavIconProps = {
  type: IconType;
  size?: "small" | "large";
};

const sizes = {
  small: "h-10 w-10",
  large: "h-20 w-20",
};

const iconSizes = {
  small: "h-7 w-7",
  large: "h-14 w-14",
};

export default function NavIcon({ type, size = "large" }: NavIconProps) {
  return (
    <div
      className={`flex ${sizes[size]} shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm`}
    >
      <svg
        viewBox="0 0 64 64"
        className={iconSizes[size]}
        fill="none"
        stroke="#08213F"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {type === "home" && (
          <>
            <path d="M10 30 32 12l22 18" fill="#2CBAC0" />
            <path d="M16 28v24h32V28" fill="#ffffff" />
            <path d="M27 52V38h10v14" fill="#2CBAC0" />
            <path d="M23 34h6v6h-6zM35 34h6v6h-6z" fill="#8EDFE0" />
          </>
        )}

        {type === "sessions" && (
          <>
            <rect x="12" y="16" width="40" height="38" rx="4" fill="#ffffff" />
            <path d="M12 24h40" />
            <path d="M22 10v10M42 10v10" />
            <rect x="20" y="30" width="6" height="6" fill="#2CBAC0" stroke="none" />
            <rect x="30" y="30" width="6" height="6" fill="#2CBAC0" stroke="none" />
            <rect x="40" y="30" width="6" height="6" fill="#2CBAC0" stroke="none" />
            <rect x="20" y="40" width="6" height="6" fill="#2CBAC0" stroke="none" />
            <rect x="30" y="40" width="6" height="6" fill="#2CBAC0" stroke="none" />
          </>
        )}

        {type === "partners" && (
          <>
            <path d="M18 32 9 23l8-8 9 9" fill="#2CBAC0" />
            <path d="M46 32l9-9-8-8-9 9" fill="#2CBAC0" />
            <path d="M24 30l8-8 8 8" />
            <path d="M20 34l13 13a5 5 0 0 0 7 0l4-4" />
            <path d="M27 41l-5 5M34 46l-4 4M41 41l4 4" />
          </>
        )}

        {type === "speakers" && (
          <>
            <circle cx="32" cy="16" r="7" fill="#0D6F8F" />
            <path d="M22 31h20v17H22z" fill="#8EDFE0" />
            <path d="M16 48h32v6H16z" fill="#ffffff" />
            <path d="M32 31v10" />
          </>
        )}

        {type === "announcements" && (
          <>
            <path d="M14 36h8l24 10V18L22 28h-8z" fill="#ffffff" />
            <path d="M22 36l5 14" />
            <path d="M46 24l8-6M49 32h9M46 40l8 6" stroke="#2CBAC0" />
            <path d="M14 28v8" fill="#2CBAC0" />
          </>
        )}
      </svg>
    </div>
  );
}