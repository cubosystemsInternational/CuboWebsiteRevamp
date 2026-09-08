'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Reveal from './Reveal';
import { footerGroups } from '@/lib/content';
import { useMediaQuery } from './useMediaQuery';

export default function Footer() {
  const isMobile = useMediaQuery('(max-width: 800px)');
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  return (
    <Reveal as="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <a className="brand" href="#home">
            <Image src="/media/xsnjix1b/logo-white.png" alt="Cubo Systems" width={31} height={51} />
            <span>CUBO<br /><small>SYSTEMS</small></span>
          </a>
          <p>Practical digital engineering for ambitious businesses.</p>
          <div className="social">
            <a href="https://www.facebook.com/cubosystemsint/" aria-label="Cubo Systems on Facebook">f</a>
            <a href="https://www.instagram.com/cubo_systems/" aria-label="Cubo Systems on Instagram">ig</a>
            <a href="https://www.linkedin.com/company/cubo-systems-international-private-limited/" aria-label="Cubo Systems on LinkedIn">in</a>
          </div>
        </div>

        <div className="footer-groups">
          {footerGroups.map((group) => {
            const isOpen = isMobile ? openGroup === group.title : true;
            return (
              <div className={'footer-group' + (isOpen ? ' is-open' : '')} key={group.title}>
                <h4 className="footer-group-title">{group.title}</h4>
                <button
                  className="footer-group-trigger"
                  aria-expanded={isOpen}
                  aria-controls={`footer-group-${group.title}`}
                  onClick={() => setOpenGroup(isOpen && isMobile ? null : group.title)}
                >
                  {group.title}
                  <span className="footer-group-toggle" aria-hidden="true">{isOpen ? '−' : '+'}</span>
                </button>
                <motion.ul
                  id={`footer-group-${group.title}`}
                  className="footer-group-list"
                  initial={false}
                  animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: .3, ease: [0.16, 1, 0.3, 1] }}
                >
                  {group.links.map((link) => (
                    <li key={link.label}><a href={link.href}>{link.label}</a></li>
                  ))}
                </motion.ul>
              </div>
            );
          })}
        </div>
      </div>
      <div className="container copyright">© 2026 Cubo Systems. All rights reserved.</div>
    </Reveal>
  );
}
