'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { usePrefersReducedMotion } from './useReducedMotion';
import SplitText from './SplitText';
import LightRays from './LightRays';

// One shared timing scale for the entrance sequence — badge, headline (via
// SplitText's own stagger), lede, actions and scroll cue all step off this
// so the Hero reads as one coordinated entrance rather than independent fades.
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const T_BADGE = 0;
const T_LEDE = 0.85;
const T_ACTIONS = 1.0;
const T_SCROLL_CUE = 1.3;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 50]);
  const contentOpacity = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 0.4]);

  return (
    <section id="home" className="hero hero-centered" ref={sectionRef}>
      <div className="hero-grid" aria-hidden="true"></div>
      <LightRays
        className="hero-rays"
        raysOrigin="top-center"
        raysColor="#f58220"
        raysSpeed={0.6}
        lightSpread={0.7}
        rayLength={1.4}
        fadeDistance={1.0}
        saturation={0.85}
        followMouse
        mouseInfluence={0.08}
        noiseAmount={0.04}
        distortion={0.02}
      />
      <motion.div className="container hero-content" style={{ y: contentY, opacity: contentOpacity }}>
        <motion.span className="hero-badge" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5, delay: T_BADGE, ease: EASE }}>
          <span className="hero-badge-dot" aria-hidden="true" />
          Digital technology partner
        </motion.span>
        <h1 aria-label="We build technology that moves businesses forward.">
          <SplitText
            tag="span"
            text="We build technology that moves businesses forward."
            className="hero-split"
            splitType="words"
            delay={45}
            duration={0.9}
            ease="power3.out"
            from={{ opacity: 0, y: 32 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.2}
            rootMargin="0px"
            textAlign="center"
          />
        </h1>
        <motion.p className="lede" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, delay: T_LEDE, ease: EASE }}>
          Cubo Systems helps businesses transform complex ideas, processes and data into scalable digital solutions.
        </motion.p>
        <motion.div className="actions" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, delay: T_ACTIONS, ease: EASE }}>
          <a className="button" href="#contact">Let’s Talk <b>→</b></a>
          <a className="text-link" href="#services">Explore our capabilities <b>↓</b></a>
        </motion.div>
      </motion.div>
      <motion.a
        href="#home"
        className="scroll-cue"
        aria-label="Scroll down"
        onClick={(e) => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: .6, delay: T_SCROLL_CUE, ease: EASE }}
      >
        <motion.span animate={reduced ? undefined : { y: [0, 10, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}></motion.span>
      </motion.a>
    </section>
  );
}
