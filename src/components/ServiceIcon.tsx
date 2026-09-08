const paths: Record<number, string> = {
  0: 'M4 17V7l8-4 8 4v10l-8 4-8-4Z M4 7l8 4 8-4 M12 11v10', // product/layers
  1: 'M4 6h16 M4 12h16 M4 18h10', // process/consultancy
  2: 'M4 20V10 M10 20V4 M16 20v-7 M22 20h-20', // analytics bars
  3: 'M12 2v4 M12 18v4 M4.9 4.9l2.8 2.8 M16.3 16.3l2.8 2.8 M2 12h4 M18 12h4 M4.9 19.1l2.8-2.8 M16.3 7.7l2.8-2.8', // AI/spark
  4: 'M8 9l-4 3 4 3 M16 9l4 3-4 3 M13 6l-2 12', // code
  5: 'M12 2a10 10 0 1 0 10 10 M12 6v6l4 2', // research/clock-orbit
};

export default function ServiceIcon({ index }: { index: number }) {
  const d = paths[index % 6];
  return (
    <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}
