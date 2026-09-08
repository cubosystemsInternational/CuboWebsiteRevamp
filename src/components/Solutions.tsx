'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Reveal from './Reveal';
import { solutions } from '@/lib/content';

export default function Solutions() {
  const [active, setActive] = useState(0);
  const [openMobile, setOpenMobile] = useState<number | null>(null);
  const current = solutions[active];

  return (
    <section id="solutions" className="section solutions">
      <div className="container">
        <Reveal>
          <p className="eyebrow orange">DIGITAL SOLUTIONS</p>
          <h2>Technology built around<br />your <em className="accent">business</em>.</h2>
        </Reveal>

        <div className="solutions-layout">
          <ul className="solutions-nav" role="tablist" aria-label="Digital solutions">
            {solutions.map((s, i) => (
              <li key={s.n}>
                <button
                  role="tab"
                  aria-selected={active === i}
                  className={'solutions-nav-item' + (active === i ? ' active' : '')}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                >
                  <span className="solutions-nav-num">{s.n}</span>
                  <span className="solutions-nav-title">{s.title}</span>
                  <span className="solutions-nav-arrow" aria-hidden="true">→</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="solutions-preview" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.n}
                initial={{ opacity: 0, x: 24, scale: .98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -24, scale: .98 }}
                transition={{ duration: .45, ease: [0.16, 1, 0.3, 1] }}
                className="solutions-preview-card"
              >
                <span className="solutions-preview-num">{current.n}</span>
                <h3>{current.title}</h3>
                <p>{current.desc}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="solutions-mobile">
          {solutions.map((s, i) => {
            const isOpen = openMobile === i;
            return (
              <div className="solutions-mobile-item" key={s.n}>
                <button
                  className={'solutions-mobile-trigger' + (isOpen ? ' active' : '')}
                  aria-expanded={isOpen}
                  onClick={() => setOpenMobile(isOpen ? null : i)}
                >
                  <span className="solutions-nav-num">{s.n}</span>
                  <span className="solutions-nav-title">{s.title}</span>
                  <span className="solutions-nav-arrow" aria-hidden="true">{isOpen ? '−' : '+'}</span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: .3, ease: [0.16, 1, 0.3, 1] }}
                      className="solutions-mobile-panel"
                    >
                      <p>{s.desc}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
