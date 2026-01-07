const BoxspaceLogo = () => (
  <svg
    className="h-6 w-6 text-primary"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="2" />
    <circle cx="50" cy="50" r="24" stroke="currentColor" strokeWidth="1" />
    <path
      d="M50 2 L50 98 M2 50 L98 50 M26 26 L74 74 M26 74 L74 26"
      stroke="currentColor"
      strokeWidth="0.5"
    />
    {Array.from({ length: 6 }).map((_, i) => {
      const angle = (i * Math.PI) / 3;
      const x1 = 50 + 24 * Math.cos(angle);
      const y1 = 50 + 24 * Math.sin(angle);
      const x2 = 50 + 48 * Math.cos(angle + Math.PI / 6);
      const y2 = 50 + 48 * Math.sin(angle + Math.PI / 6);
      return (
        <g key={i}>
          <circle cx={x1} cy={y1} r="2" fill="currentColor" />
          <line
            x1="50"
            y1="50"
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <circle
            cx={50 + 48 * Math.cos(angle)}
            cy={50 + 48 * Math.sin(angle)}
            r="2"
            fill="currentColor"
          />
          <line
            x1={50 + 48 * Math.cos(angle)}
            y1={50 + 48 * Math.sin(angle)}
            x2={50 + 48 * Math.cos(angle + (2 * Math.PI) / 6)}
            y2={50 + 48 * Math.sin(angle + (2 * Math.PI) / 6)}
            stroke="currentColor"
            strokeWidth="1"
          />
        </g>
      );
    })}
  </svg>
);


export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <BoxspaceLogo />
          <span className="font-bold font-headline">Boxspace</span>
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Boxspace. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
