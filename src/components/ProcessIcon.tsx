const paths: Record<number, string> = {
  0: 'M12 3a9 9 0 1 0 9 9 M12 3v9l6 3', // discover — magnifier/scope proxy (clock-scan)
  1: 'M4 6h16M4 12h10M4 18h13', // define — structured lines
  2: 'M4 4h7v7H4z M13 4h7v7h-7z M4 13h7v7H4z M13 13h7v7h-7z', // design — grid/blueprint
  3: 'M8 9l-4 3 4 3 M16 9l4 3-4 3 M13 6l-2 12', // develop — code
  4: 'M4 12l6 6L20 6', // deliver — check
};

export default function ProcessIcon({ index }: { index: number }) {
  const d = paths[index % 5];
  return (
    <svg className="timeline-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}
