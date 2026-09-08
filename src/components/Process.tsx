'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import Reveal from './Reveal';
import ProcessIcon from './ProcessIcon';
import { process } from '@/lib/content';
import { useMediaQuery } from './useMediaQuery';

export default function Process() {
  // .timeline-scroll is a tall driver track; the row is manually pinned in
  // place (via a counter-translate, not CSS position:sticky — the site's
  // global `overflow-x:hidden` on html/body breaks sticky positioning
  // everywhere, a pre-existing site-wide rule out of scope for this fix) so
  // the 0->1 scroll-progress range spans that full driver height instead of
  // just the row's own ~200px, giving each of the 5 steps a deliberate,
  // unhurried scroll distance.
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [pinRange, setPinRange] = useState(0);
  const isDesktop = useMediaQuery('(min-width: 801px)');
  const { scrollYProgress } = useScroll({ target: scrollRef, offset: ['start start', 'end end'] });

  useEffect(() => {
    if (!isDesktop) return;
    const el = scrollRef.current;
    if (!el) return;
    const update = () => setPinRange(Math.max(0, el.offsetHeight - window.innerHeight));
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [isDesktop]);

  const pinY = useTransform(scrollYProgress, [0, 1], [0, pinRange]);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = Math.min(process.length - 1, Math.max(0, Math.floor(v * process.length)));
    setActiveIndex(idx);
  });

  return (
    <section id="process" className="section process">
      <div className="container">
        <Reveal>
          <p className="eyebrow orange">OUR APPROACH</p>
          <h2>From idea to <em className="accent">impact</em>.</h2>
        </Reveal>

        <div className="timeline-scroll" ref={scrollRef}>
          <motion.div className="timeline-sticky" style={isDesktop ? { y: pinY } : undefined}>
            <div className="timeline">
              <div className="timeline-rail">
                <motion.div className="timeline-rail-fill" style={{ scaleX: scrollYProgress }} />
              </div>
              {process.map((step, i) => (
                <div className={'timeline-step' + (i <= activeIndex ? ' active' : '')} key={step.title}>
                  <span className="timeline-node" aria-hidden="true">
                    <ProcessIcon index={i} />
                  </span>
                  <span className="timeline-index">0{i + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
