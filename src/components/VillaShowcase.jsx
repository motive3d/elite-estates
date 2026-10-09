import { Component, lazy, Suspense, useState } from 'react';
import { Box, ArrowUpRight, RotateCcw, Moon, Sun, Plus, Minus, Hand, ArrowLeft, ArrowRight, X } from 'lucide-react';
import { Photo } from './UI';

const VillaScene = lazy(() => import('./VillaScene'));
const features = [
  { title: 'The pool court', text: 'A long turquoise pool is set into a stone deck, extending the social spaces into the landscape.' },
  { title: 'The upper terrace', text: 'A recessed upper-level terrace with a glass balustrade creates an outdoor room above the garden.' },
  { title: 'The glazed living façade', text: 'Full-height glazing connects the ground-level living volume to the pool court. This is an exterior study, not an interior tour.' },
  { title: 'The cantilever', text: 'A projecting upper volume and deep roof slab provide the model’s defining horizontal lines and shaded edges.' },
];
class ViewerBoundary extends Component {
  state = { error: false };
  static getDerivedStateFromError() { return { error: true }; }
  render() { return this.state.error ? <div className="viewer-failure"><h3>The architectural study is still here.</h3><p>Your browser could not start the 3D viewer. Use the static preview and feature descriptions, or try a browser with WebGL enabled.</p><button className="button" onClick={this.props.onClose}>Return to preview</button></div> : this.props.children; }
}
export default function VillaShowcase() {
  const [loaded, setLoaded] = useState(false), [interactive, setInteractive] = useState(false), [night, setNight] = useState(false), [selected, setSelected] = useState(0), [command, setCommand] = useState({ name: 'reset', seq: 0 });
  const [lost, setLost] = useState(false);
  const issue = (name) => setCommand((last) => ({ name, seq: last.seq + 1 }));
  const close = () => { setLoaded(false); setInteractive(false); setLost(false); };
  function keyControl(e) {
    if (!interactive || e.target !== e.currentTarget) return;
    const keys = { ArrowLeft: 'left', ArrowRight: 'right', '+': 'in', '=': 'in', '-': 'out', Home: 'reset' };
    if (keys[e.key]) { e.preventDefault(); issue(keys[e.key]); }
    if (e.key === 'Escape') setInteractive(false);
  }
  return <section className="villa-section section" id="villa"><div className="section-heading" data-reveal><div><span className="eyebrow">02 / A NEW DIMENSION</span><h2>Don’t just imagine it.<br /><em>Experience the architecture.</em></h2></div><p>An original villa study.<br />Every angle, a new perspective.</p></div><div className={`villa-viewer ${night && loaded ? 'night' : ''}`}>
    {!loaded ? <div className="villa-poster"><Photo file="villa-preview.webp" alt="Rendered preview of the original two-level villa model with pool, glass terraces, and landscaping" /><div className="poster-caption"><span className="eyebrow">THE COURTYARD VILLA / AN ORIGINAL 3D STUDY</span><button className="button button-light" onClick={() => setLoaded(true)}>Explore in 3D <Box size={20} /></button></div></div> : <ViewerBoundary onClose={close}><Suspense fallback={<div className="viewer-loading" role="status"><Box size={36} /><p>Preparing your architectural perspective…</p></div>}><div className={`canvas-container ${interactive ? 'interactive' : ''}`} tabIndex={0} role="region" aria-label="Interactive three-dimensional villa" aria-describedby="viewer-instructions" onKeyDown={keyControl}>{lost ? <div className="viewer-failure"><h3>The graphics connection was interrupted.</h3><button className="button" onClick={close}>Return to preview</button></div> : <VillaScene night={night} interactive={interactive} command={command} selected={selected} onSelect={setSelected} onContextLost={() => { setLost(true); setInteractive(false); }} />}</div></Suspense></ViewerBoundary>}
    <div className="viewer-label"><span className="status-dot" />{loaded ? `${night ? 'Evening' : 'Daylight'} study` : 'A different point of view'}<span>EXTERIOR CONCEPT</span></div>
    {loaded && <div className="viewer-toolbar"><button aria-label={interactive ? 'Pause controls' : 'Enable controls'} aria-pressed={interactive} onClick={() => setInteractive(!interactive)}><Hand size={17} /><span>{interactive ? 'Pause controls' : 'Enable controls'}</span></button><button aria-label="Rotate villa left" onClick={() => issue('left')}><ArrowLeft size={18} /></button><button aria-label="Rotate villa right" onClick={() => issue('right')}><ArrowRight size={18} /></button><button aria-label="Zoom in" onClick={() => issue('in')}><Plus size={18} /></button><button aria-label="Zoom out" onClick={() => issue('out')}><Minus size={18} /></button><button aria-label="Reset camera" onClick={() => issue('reset')}><RotateCcw size={17} /></button><button aria-label={night ? 'Switch to day lighting' : 'Switch to night lighting'} aria-pressed={night} onClick={() => setNight(!night)}>{night ? <Sun size={18} /> : <Moon size={18} />}</button><button aria-label="Close 3D viewer" onClick={close}><X size={18} /></button></div>}
  </div><div className="viewer-meta"><p id="viewer-instructions">{loaded ? (interactive ? 'Drag to orbit · Pinch or scroll to zoom · Escape to pause. Keyboard: ← →, + / −, Home to reset.' : 'Enable controls to drag or pinch. With controls paused, scroll naturally over the model.') : 'Explore in 3D to load the interactive villa. Rotate, zoom, and discover its architectural details.'}</p><span>ORIGINAL PROCEDURAL MODEL</span></div><div className="feature-explorer"><div className="feature-tabs" role="group" aria-label="Architectural features">{features.map((f, i) => <button key={f.title} aria-pressed={selected === i} onClick={() => setSelected(i)}><span>0{i + 1}</span>{f.title}<ArrowUpRight size={16} /></button>)}</div><div className="feature-description" aria-live="polite"><span className="eyebrow">DETAIL / 0{selected + 1}</span><h3>{features[selected].title}</h3><p>{features[selected].text}</p></div></div></section>;
}

