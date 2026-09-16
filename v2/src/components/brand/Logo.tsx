interface LogoProps {
  variant?: "full" | "icon" | "wordmark";
  color?: "volt" | "white" | "dark";
  size?: number;
}

const fills = {
  volt: "var(--volt-300, #D4FF3F)",
  white: "var(--brand-50, #F5F3FF)",
  dark: "var(--brand-800, #1A1033)",
};

const bgs = {
  volt: "var(--brand-800, #1A1033)",
  white: "transparent",
  dark: "var(--volt-300, #D4FF3F)",
};

/**
 * GC Cred Logo — Monograma GC com cifrão no C.
 * Stroke-based geometric paths (arc + horizontal bar).
 *
 * Variantes:
 *   icon    → monograma GC (app icon, favicon, avatar)
 *   full    → monograma GC + "CRED" (header, materiais)
 *   wordmark → "GC CRED" texto puro
 */
export function Logo({
  variant = "full",
  color = "volt",
  size = 40,
}: LogoProps) {
  const fill = fills[color];
  const bg = bgs[color];

  /* ---------- ICON: monograma GC ---------- */
  if (variant === "icon") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="GC Cred"
      >
        <rect width="40" height="40" rx="10" fill={bg} />
        {/* G — arc + horizontal bar */}
        <path
          d="M 16 15 A 7 7 0 1 0 18 20 L 12 20"
          stroke={fill}
          strokeWidth="3.5"
          fill="none"
          strokeLinejoin="miter"
        />
        {/* C — open arc */}
        <path
          d="M 34 15 A 7 7 0 1 0 34 25"
          stroke={fill}
          strokeWidth="3.5"
          fill="none"
        />
        {/* Cifrão — vertical line */}
        <line
          x1="29"
          y1="10"
          x2="29"
          y2="30"
          stroke={fill}
          strokeWidth="0.8"
          opacity="0.35"
        />
      </svg>
    );
  }

  /* ---------- FULL: monograma + CRED ---------- */
  if (variant === "full") {
    return (
      <svg
        width={size * 4.5}
        height={size}
        viewBox="0 0 180 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="GC Cred"
      >
        <rect width="180" height="40" fill={bg} />
        {/* G */}
        <path
          d="M 16 15 A 7 7 0 1 0 18 20 L 12 20"
          stroke={fill}
          strokeWidth="3.5"
          fill="none"
          strokeLinejoin="miter"
        />
        {/* C */}
        <path
          d="M 34 15 A 7 7 0 1 0 34 25"
          stroke={fill}
          strokeWidth="3.5"
          fill="none"
        />
        {/* Cifrão */}
        <line
          x1="29"
          y1="10"
          x2="29"
          y2="30"
          stroke={fill}
          strokeWidth="0.8"
          opacity="0.35"
        />
        {/* Wordmark */}
        <text
          x="50"
          y="26.5"
          fontFamily="Sora, Montserrat, system-ui, sans-serif"
          fontSize="18"
          fontWeight="800"
          fill={fill}
          letterSpacing="1"
        >
          GC CRED
        </text>
      </svg>
    );
  }

  /* ---------- WORDMARK: texto puro ---------- */
  return (
    <svg
      width={size * 4.5}
      height={size}
      viewBox="0 0 180 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="GC Cred"
    >
      <text
        x="0"
        y="28"
        fontFamily="Sora, system-ui, sans-serif"
        fontSize="22"
        fontWeight="800"
        fill={fill}
        letterSpacing="-0.5"
      >
        GC CRED
      </text>
    </svg>
  );
}
