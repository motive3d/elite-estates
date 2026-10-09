import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowDownToLine, ArrowUpRight, Check, MapPin } from 'lucide-react';
import { properties } from '../data/properties';

function DraftPreview({ draft }) {
  return <details className="draft-preview"><summary>Read or copy your draft</summary><textarea readOnly aria-label="Your inquiry draft" rows={8} value={`Name: ${draft.name}\nEmail: ${draft.email}\nInterest: ${draft.property || 'General conversation'}\n\n${draft.message}\n\nLocal draft only. No message has been sent.`} onFocus={(e) => e.target.select()} /></details>;
}

export default function Contact() {
  const [params] = useSearchParams();
  const chosen = properties.find((p) => p.id === params.get('property'));
  const [draft, setDraft] = useState(null);
  function submit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    for (const [field, length] of [['name', 2], ['message', 10]]) {
      if (data[field].trim().length < length) {
        const input = e.currentTarget.elements[field];
        input.setCustomValidity(`Please enter at least ${length} characters, excluding surrounding spaces.`);
        input.reportValidity();
        input.addEventListener('input', () => input.setCustomValidity(''), { once: true });
        return;
      }
    }
    setDraft(data);
  }
  function download() {
    const content = `ÉLITE ESTATES — Portfolio inquiry draft\n\nName: ${draft.name}\nEmail: ${draft.email}\nInterest: ${draft.property || 'General conversation'}\n\n${draft.message}\n\nLOCAL DRAFT ONLY. No message has been sent. This is a fictional portfolio experience.`;
    const url = URL.createObjectURL(new Blob([content], { type: 'text/plain;charset=utf-8' }));
    const a = document.createElement('a'); a.href = url; a.download = 'elite-estates-inquiry.txt'; a.hidden = true;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 60000);
  }
  return <><section className="page-intro section"><span className="eyebrow hero-reveal">LET’S BEGIN</span><h1 className="hero-reveal">Every extraordinary story<br />starts with a <em>conversation.</em></h1></section><section className="section contact-layout"><div className="contact-copy"><span className="eyebrow">A PERSONAL PERSPECTIVE</span><h2>Tell us what<br /><em>home means to you.</em></h2><p>Explore the inquiry experience. Share the places, spaces, and details that inspire you.</p><div className="contact-location"><MapPin size={21} /><div><h3>Inspired by Dubai</h3><p>United Arab Emirates</p></div></div><div className="honesty-note"><span className="eyebrow">PORTFOLIO DEMONSTRATION</span><p>This is a fictional agency. There is no staffed office, monitored email address, or telephone service.</p><p>The form prepares a local inquiry draft. Nothing is sent or stored on a server. You can download your draft after validation.</p></div></div><form className="contact-form" onSubmit={submit} onChange={() => setDraft(null)}><div className="form-row"><label htmlFor="name">Your name <span>(required)</span><input id="name" name="name" autoComplete="name" required minLength={2} maxLength={100} placeholder="Full name" /></label><label htmlFor="email">Email address <span>(required)</span><input id="email" name="email" type="email" autoComplete="email" required maxLength={200} placeholder="you@example.com" /></label></div><label htmlFor="property">I’m interested in<select id="property" name="property" defaultValue={chosen?.name || ''}><option value="">A general conversation</option>{properties.map((p) => <option key={p.id}>{p.name}</option>)}</select></label><label htmlFor="message">Your message <span>(required)</span><textarea id="message" name="message" required minLength={10} maxLength={4000} rows={5} defaultValue={chosen ? `I would like to learn more about the ${chosen.name} concept.` : ''} placeholder="Tell us about your ideal home…" /></label><label className="checkbox-label"><input type="checkbox" required name="acknowledgment" /> <span>I understand this is a portfolio demo and no inquiry will be sent.</span></label><button type="submit" className="button">Prepare inquiry draft <ArrowUpRight size={18} /></button><p className="fine-print">Your details stay in this browser tab until you leave or reload.</p>{draft && <div className="draft-confirmation" role="status"><Check size={24} /><div><h3>Your draft is ready. No message was sent.</h3><p>Download a copy for your records. This demonstration has no delivery service.</p><DraftPreview draft={draft} /><button type="button" className="text-button" onClick={download}>Download inquiry draft <ArrowDownToLine size={17} /></button></div></div>}</form></section></>;
}

