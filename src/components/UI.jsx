import { ArrowUpRight, BedDouble, Bath, Maximize } from 'lucide-react';
import { Link } from 'react-router-dom';
import { asset, money } from '../data/properties';

export function Photo({ file, alt, className = '', eager = false, ...props }) {
  return <img src={asset(`images/${file}`)} alt={alt} className={className} loading={eager ? 'eager' : 'lazy'} decoding="async" fetchPriority={eager ? 'high' : 'auto'} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = asset('images/fallback.svg'); }} {...props} />;
}
export function Specs({ property: p }) {
  return <div className="specs"><span><BedDouble size={16} />{p.beds} beds</span><span><Bath size={16} />{p.baths} baths</span><span><Maximize size={15} />{p.area.toLocaleString()} sqft</span></div>;
}
export function PropertyCard({ property: p, index = 0 }) {
  return <article className="property-card"><Link to={`/properties/${p.id}`} className="card-image" aria-label={`Explore ${p.name}`}><Photo file={p.image} alt={`Stock architectural inspiration for ${p.name}, a fictional ${p.type.toLowerCase()}`} /><span className="image-tag">{p.type}</span><span className="card-arrow"><ArrowUpRight size={23} /></span></Link><div className="card-topline"><span>{p.location}</span><span>0{index + 1}</span></div><h3><Link to={`/properties/${p.id}`}>{p.name}</Link></h3><Specs property={p} /><div className="card-price">{money(p.price)}<span>Fictional listing</span></div></article>;
}
export function ContactBanner() {
  return <section className="contact-banner section"><span className="eyebrow">THE NEXT CHAPTER</span><h2>A remarkable home.<br /><em>A conversation away.</em></h2><Link to="/contact" className="button button-light">Begin a conversation <ArrowUpRight size={18} /></Link><span className="banner-mark" aria-hidden="true">É</span></section>;
}
