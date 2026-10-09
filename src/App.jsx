import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Home from './pages/Home';
import Properties from './pages/Properties';
import PropertyDetail from './pages/PropertyDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import { properties } from './data/properties';

gsap.registerPlugin(ScrollTrigger);

function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const menuButton = useRef();
  useEffect(() => { setOpen(false); }, [location]);
  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 30);
    scroll(); window.addEventListener('scroll', scroll, { passive: true });
    return () => window.removeEventListener('scroll', scroll);
  }, []);
  useEffect(() => {
    const key = (e) => { if (e.key === 'Escape' && open) { setOpen(false); menuButton.current?.focus(); } };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, [open]);
  return <header className={`site-header ${location.pathname === '/' && !scrolled ? 'over-hero' : ''} ${open ? 'menu-open' : ''}`}>
    <Link className="wordmark" to="/" aria-label="Élite Estates home">ÉLITE ESTATES<span>SIGNATURE EDITION</span></Link>
    <button ref={menuButton} className="menu-toggle icon-button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    <nav id="main-nav" className={open ? 'nav-open' : ''} aria-label="Main navigation">
      <NavLink to="/" end>Home</NavLink><NavLink to="/properties">Residences</NavLink><NavLink to="/about">Our perspective</NavLink><NavLink to="/contact" className="nav-contact">Let’s talk <ArrowUpRight size={15} /></NavLink>
    </nav>
  </header>;
}

function Footer() {
  return <footer className="site-footer"><div className="footer-top"><Link className="wordmark" to="/">ÉLITE ESTATES<span>SIGNATURE EDITION</span></Link><p>Extraordinary Homes.<br />Exceptional Living.</p><div className="footer-links"><Link to="/properties">The collection</Link><Link to="/about">Our perspective</Link><Link to="/contact">Get in touch</Link></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} ÉLITE ESTATES · Portfolio concept</span><p>All six listings are fictional. Stock imagery is architectural inspiration, not photography of the listed properties. No properties are offered for sale.</p><a href={`${import.meta.env.BASE_URL}ASSET-ATTRIBUTIONS.md`} target="_blank" rel="noreferrer">Image credits ↗</a></div></footer>;
}

function RouteEffects() {
  const { pathname } = useLocation();
  useEffect(() => {
    const detail = properties.find((p) => pathname === `/properties/${p.id}`);
    const title = detail?.name || ({ '/': 'Extraordinary Homes. Exceptional Living.', '/properties': 'The Residence Collection', '/about': 'Our Perspective', '/contact': 'A Conversation Begins' }[pathname] || 'Page not found');
    document.title = `${title} | ÉLITE ESTATES`;
    const description = detail ? `${detail.name} — fictional ${detail.type.toLowerCase()} concept in ${detail.location}. Explore the specifications and architectural inspiration.` : `ÉLITE ESTATES — ${title}. A fictional luxury real estate portfolio experience inspired by Dubai.`;
    document.querySelector('meta[name="description"]').content = description;
    document.querySelector('meta[property="og:title"]').content = document.title;
    document.querySelector('meta[property="og:description"]').content = description;
    document.querySelector('meta[property="og:image"]').content = new URL(`${import.meta.env.BASE_URL}images/${detail?.image || 'hero.webp'}`, window.location.origin).href;
    window.scrollTo({ top: 0, behavior: 'instant' });
    const main = document.getElementById('main');
    main?.focus({ preventScroll: true });
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo('.hero-reveal', { y: 32, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, stagger: 0.12, ease: 'power3.out', clearProps: 'all' });
      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        gsap.fromTo(el, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 94%', once: true }, clearProps: 'all' });
      });
    });
    return () => mm.revert();
  }, [pathname]);
  return null;
}

export default function App() {
  return <><a className="skip-link" href="#main" onClick={(e) => { e.preventDefault(); document.getElementById('main').focus(); }}>Skip to content</a><Navigation /><main id="main" tabIndex={-1}><Routes><Route path="/" element={<Home />} /><Route path="/properties" element={<Properties />} /><Route path="/properties/:id" element={<PropertyDetail />} /><Route path="/about" element={<About />} /><Route path="/contact" element={<Contact />} /><Route path="*" element={<section className="section not-found"><span className="eyebrow">404 · A different direction</span><h1>This address is<br /><em>yet to be discovered.</em></h1><Link className="button" to="/">Return home <ArrowUpRight /></Link></section>} /></Routes></main><Footer /><RouteEffects /></>;
}
