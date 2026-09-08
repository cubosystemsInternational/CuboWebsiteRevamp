'use client';

import { motion } from 'framer-motion';
import Reveal from './Reveal';
import { usePrefersReducedMotion } from './useReducedMotion';

export default function About() {
  const reduced = usePrefersReducedMotion();
  return (
    <section id="about" className="section about">
      <div className="container split">
        <div>
          <motion.p
            className="eyebrow orange"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: .4 }}
            transition={{ duration: .6, ease: [0.16, 1, 0.3, 1] }}
          >
            WHO WE ARE
          </motion.p>
          {/* whileInView lives on the (unclipped) outer element; overflow:hidden
              sits on the inner wrapper only, so Motion's own viewport check
              never intersects a clipping ancestor. */}
          <motion.div
            className="clip-reveal-trigger"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: .4 }}
          >
            <div className="clip-reveal">
              <motion.h2
                variants={{ hidden: { y: reduced ? 0 : '100%' }, show: { y: 0 } }}
                transition={{ duration: reduced ? .3 : .9, ease: [0.16, 1, 0.3, 1], delay: .1 }}
              >
                Technology should <em className="accent">solve</em> problems, not create them.
              </motion.h2>
            </div>
          </motion.div>
        </div>
        <Reveal variant="right" delay={.12} className="about-copy">
          <p>We start with how your business works, then design technology that makes it work better. Cubo combines deep technical knowledge with a practical understanding of people, processes and priorities.</p>
          <p>From automation and cloud infrastructure to data, integration and product development, we create cost-effective solutions that improve performance and deliver long-term value.</p>
          <a className="text-link dark" href="#services">Discover Cubo <b>→</b></a>
        </Reveal>
      </div>
    </section>
  );
}
