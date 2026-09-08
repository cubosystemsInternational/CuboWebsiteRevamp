'use client';

import Image from 'next/image';
import Reveal from './Reveal';

const logos = [
  { src: '/media/zy1l3chb/zoneberry-white.png', alt: 'Zoneberry' },
  { src: '/media/byebhoao/realtr_white.png', alt: 'Realtr' },
  { src: '/media/ksmpgull/xelutionwhite.png', alt: 'Xelution' },
];

export default function Trust() {
  return (
    <Reveal as="section" className="trust">
      <div className="container trust-inner">
        <p>Technology partner for ambitious businesses</p>
        <div className="marquee-row">
          <div className="marquee">
            <div className="marquee-track">
              {[...logos, ...logos].map((l, i) => (
                <span className="marquee-item" key={l.src + i}>
                  <Image src={l.src} alt={i < logos.length ? l.alt : ''} aria-hidden={i >= logos.length} width={120} height={32} style={{ width: 'auto', height: 'auto' }} />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
