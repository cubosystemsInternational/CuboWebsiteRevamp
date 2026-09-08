import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import './site.css';

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Cubo Systems | Digital Engineering & Technology Solutions',
  description: 'Cubo Systems transforms complex ideas, processes and data into scalable digital solutions.',
  metadataBase: new URL('https://cubosystems.com'),
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Cubo Systems | Technology that moves business forward',
    description: 'Practical digital engineering, automation and data solutions for ambitious businesses.',
    type: 'website',
    url: 'https://cubosystems.com/',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>{children}</body>
    </html>
  );
}
