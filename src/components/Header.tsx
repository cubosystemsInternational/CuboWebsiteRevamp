'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { navLinks } from '@/lib/content';
import { usePrefersReducedMotion } from './useReducedMotion';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>('');
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = navLinks.map((l) => l.id);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll while the mobile menu is open, restore on close/unmount.
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [open]);

  // Escape closes the mobile menu and returns focus to the trigger.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <motion.header
      className={'header' + (scrolled ? ' scrolled' : '') + (open ? ' menu-open' : '')}
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: .6, ease: EASE }}
    >
      <motion.div
        className="header-bar"
        animate={{
          paddingTop: scrolled ? 12 : 22,
          paddingBottom: scrolled ? 12 : 22,
          borderRadius: scrolled ? 2 : 0,
          backgroundColor: scrolled ? 'rgba(15,15,15,0.85)' : 'rgba(15,15,15,0)',
          boxShadow: scrolled ? '0 12px 30px rgba(0,0,0,0.35)' : '0 0 0 rgba(0,0,0,0)',
          borderColor: scrolled ? 'var(--line)' : 'transparent',
        }}
        transition={{ duration: reduced ? 0 : .45, ease: EASE }}
      >
        <a className="brand" href="#home" aria-label="Cubo Systems home">
          <Image src="/media/q5nhltn2/logo.png" alt="Cubo Systems" width={31} height={51} />
          <span>CUBO<br /><small>SYSTEMS</small></span>
        </a>

        <nav className="header-nav-desktop" aria-label="Primary">
          {navLinks.map(({ label, id }) => (
            <a key={id} href={'#' + id} className={'nav-link' + (active === id ? ' active' : '')}>
              {label}
              {active === id && (
                <motion.span
                  className="nav-link-indicator"
                  layoutId="nav-active-indicator"
                  transition={{ duration: reduced ? 0 : .35, ease: EASE }}
                />
              )}
            </a>
          ))}
        </nav>

        <a className="button button-small header-cta" href="#contact">Let’s Talk <b>→</b></a>

        <button
          ref={menuButtonRef}
          className="menu"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <i className={open ? 'open' : ''}></i>
          <i className={open ? 'open' : ''}></i>
          <i className={open ? 'open' : ''}></i>
        </button>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-nav-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: .25, ease: EASE }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            className="mobile-nav"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: .3, ease: EASE }}
          >
            <motion.ul
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{ hidden: {}, show: { transition: { staggerChildren: .05, delayChildren: .05 } } }}
            >
              {navLinks.map(({ label, id }) => (
                <motion.li
                  key={id}
                  variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
                  transition={{ duration: .35, ease: EASE }}
                >
                  <a
                    href={'#' + id}
                    className={'mobile-nav-link' + (active === id ? ' active' : '')}
                    onClick={() => setOpen(false)}
                  >
                    {label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: .35, ease: EASE }}
              >
                <a className="button mobile-nav-cta" href="#contact" onClick={() => setOpen(false)}>
                  Let’s Talk <b>→</b>
                </a>
              </motion.li>
            </motion.ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
