import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function Block({ position, scale, material, rotation, ...props }) {
  return <mesh position={position} scale={scale} rotation={rotation} material={material} {...props}><boxGeometry /></mesh>;
}

function Architecture({ night, selected, onSelect }) {
  const materials = useMemo(() => ({
    stone: new THREE.MeshStandardMaterial({ color: '#d3c9b4', roughness: .82 }),
    white: new THREE.MeshStandardMaterial({ color: '#e9e4d9', roughness: .72 }),
    dark: new THREE.MeshStandardMaterial({ color: '#303b36', roughness: .6 }),
    wood: new THREE.MeshStandardMaterial({ color: '#876347', roughness: .8 }),
    glass: new THREE.MeshStandardMaterial({ color: night ? '#b69857' : '#577d80', metalness: .42, roughness: .18, emissive: night ? '#cda458' : '#000000', emissiveIntensity: night ? .6 : 0 }),
    rail: new THREE.MeshStandardMaterial({ color: '#a7c6c7', transparent: true, opacity: .36, metalness: .3, roughness: .18, depthWrite: false }),
    pool: new THREE.MeshStandardMaterial({ color: night ? '#26757a' : '#489da1', roughness: .16, metalness: .42, emissive: night ? '#1a6f75' : '#000000', emissiveIntensity: .3 }),
    lawn: new THREE.MeshStandardMaterial({ color: '#62755a', roughness: 1 }),
    leaf: new THREE.MeshStandardMaterial({ color: '#3c5842', roughness: 1 }),
    light: new THREE.MeshStandardMaterial({ color: '#d9b478', emissive: '#efb966', emissiveIntensity: night ? 2 : .15 }),
  }), [night]);
  useEffect(() => () => Object.values(materials).forEach((m) => m.dispose()), [materials]);
  const m = materials;
  const b = (key, pos, scale, material = m.white, rotation) => <Block key={key} position={pos} scale={scale} material={material} rotation={rotation} />;
  return <group position={[0, -.35, 0]}>
    {b('base', [0, 0, 0], [19, .5, 15], m.stone)}
    {b('lawn', [0, .28, -.9], [18.6, .07, 12.7], m.lawn)}
    {b('deck', [0, .4, 3.25], [16.8, .22, 7.4], m.stone)}
    {b('ground', [0, .67, -1.5], [12, .38, 6.5])}
    {b('backwall', [0, 2.08, -4.65], [11.7, 2.7, .25], m.stone)}
    {b('leftwall', [-5.75, 2.08, -1.5], [.35, 2.7, 6.3], m.stone)}
    {b('rightwall', [5.75, 2.08, -1.5], [.35, 2.7, 6.3], m.stone)}
    {b('groundglass', [0, 2.08, 1.61], [10.8, 2.7, .12], m.glass)}
    {b('sideglass', [5.94, 2.1, -1.2], [.08, 2.6, 3.8], m.glass)}
    {b('firstslab', [.3, 3.53, -.95], [13.8, .35, 7.6])}
    {b('upperback', [-.6, 5.03, -4.24], [11.4, 2.7, .28], m.stone)}
    {b('upperleft', [-6.15, 5.03, -1.6], [.3, 2.7, 5.5], m.stone)}
    {b('upperright', [5.05, 5.03, -1.6], [.3, 2.7, 5.5], m.stone)}
    {b('upperglass', [-.5, 4.97, .92], [10.95, 2.6, .12], m.glass)}
    {b('roof', [-.65, 6.48, -1.5], [12.4, .32, 6.2])}
    {b('uppertrim', [-.5, 6.21, 1.06], [11.4, .12, .12], m.dark)}
    {b('balconyfloor', [.05, 3.76, 1.7], [12.75, .12, 2.1], m.wood)}
    {b('rail', [.05, 4.2, 2.72], [12.7, .86, .05], m.rail)}
    {b('railtop', [.05, 4.64, 2.72], [12.8, .045, .05], m.dark)}
    {b('rightbalcony', [6.4, 4.18, 1.73], [.05, .85, 2], m.rail)}
    {b('leftbalcony', [-6.3, 4.18, 1.73], [.05, .85, 2], m.rail)}
    {b('featurevolume', [-4.9, 5.0, 1.02], [2.4, 2.68, .25], m.wood)}
    {Array.from({ length: 11 }, (_, i) => b(`slat${i}`, [-6.02 + i * .22, 5.0, 1.2], [.065, 2.7, .12], m.dark))}
    {Array.from({ length: 8 }, (_, i) => b(`mullion${i}`, [-5.4 + i * 1.54, 2.06, 1.7], [.065, 2.8, .12], m.dark))}
    {Array.from({ length: 6 }, (_, i) => b(`uppermullion${i}`, [-3.5 + i * 1.67, 5.0, 1.03], [.06, 2.65, .13], m.dark))}
    {[-5.8, 5.8].map((x) => b(`column${x}`, [x, 2.02, 2.65], [.22, 2.9, .22], m.stone))}
    {b('poolrim', [1.3, .52, 5.16], [9.5, .13, 3.2])}
    {b('water', [1.3, .595, 5.16], [9.12, .03, 2.82], m.pool)}
    {b('poolline1', [1.3, .615, 4.48], [8.8, .008, .015], m.rail)}
    {b('poolline2', [1.3, .615, 5.82], [8.8, .008, .015], m.rail)}
    {[-6, -4.7].map((x) => <group key={`lounger${x}`} position={[x, .66, 4.6]}>{b('frame', [0, .12, 0], [.78, .18, 1.85], m.wood)}{b('cushion', [0, .28, -.22], [.72, .15, 1.28])}{b('back', [0, .49, .65], [.72, .15, .7], m.white, [.5, 0, 0])}</group>)}
    {b('bench', [3.8, 3.95, 1.78], [2.5, .28, .65], m.stone)}
    {b('benchcushion', [3.8, 4.12, 1.78], [2.35, .13, .6])}
    {b('entry', [7.4, .42, -2.5], [1.2, .1, 4.5], m.stone)}
    {[0,1,2,3].map((i) => b(`stepping${i}`, [-7.4, .38, -1.5 + i * 1.4], [1.2, .14, .9], m.stone))}
    {[[-7.8, -4.9], [7.65, -4.9], [7.8, 1.4]].map(([x, z], index) => <group key={index} position={[x, .3, z]}><mesh position={[0, 1.6, 0]} material={m.wood}><cylinderGeometry args={[.11, .17, 3.2, 7]} /></mesh>{[0, 1, 2, 3, 4, 5].map((i) => <group key={i} rotation={[0, i * Math.PI / 3, 0]}><mesh position={[.7, 3.17, 0]} rotation={[0, 0, -.18]} scale={[1.2, .13, .35]} material={m.leaf}><sphereGeometry args={[1, 7, 4]} /></mesh></group>)}</group>)}
    {[-7.5, -5, -2.5, 0, 2.5, 5, 7.5].map((x) => <mesh key={`hedge${x}`} position={[x, .65, -6.4]} scale={[1.35, .6, .65]} material={m.leaf}><icosahedronGeometry args={[1, 1]} /></mesh>)}
    {[-5.8, 5.8].map((x) => b(`light${x}`, [x, 3.28, 2.45], [.12, .045, .9], m.light))}
    {b('strip', [0, 3.29, 1.86], [10.5, .025, .035], m.light)}
    {night && <pointLight position={[0, 2.4, 3]} intensity={32} distance={13} color="#e2b978" decay={2} />}
  </group>;
}

// Keep labels in the normal React DOM tree. Projecting their positions avoids
// separate HTML roots inside the canvas and keeps touch/focus handling stable.
function HotspotProjection({ markers }) {
  const { camera, size } = useThree();
  const points = useMemo(() => [[1.4, .5, 5.2], [3.8, 4.2, 2.7], [0, 1.85, 1.85], [-5.4, 6.35, 1.6]].map((p) => new THREE.Vector3(...p)), []);
  const projected = useMemo(() => new THREE.Vector3(), []);
  useFrame(() => {
    points.forEach((point, i) => {
      const marker = markers.current[i];
      if (!marker) return;
      projected.copy(point).project(camera);
      marker.style.transform = `translate(-50%, -50%) translate(${(projected.x + 1) * size.width / 2}px, ${(1 - projected.y) * size.height / 2}px)`;
      marker.style.visibility = projected.z > 1 || projected.z < -1 ? 'hidden' : 'visible';
    });
  });
  return null;
}

function CameraRig({ interactive, command }) {
  const ref = useRef();
  const { camera, invalidate, size } = useThree();
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reset = () => { const portrait = size.width < 620; camera.position.set(portrait ? 24 : 18, portrait ? 18 : 13, portrait ? 30 : 23); camera.lookAt(0, 1.8, 0); if (ref.current) { ref.current.target.set(0, 1.8, 0); ref.current.update(); } invalidate(); };
  useEffect(reset, [size.width, size.height]);
  useEffect(() => {
    if (!ref.current) return;
    if (command.name === 'reset') { reset(); return; }
    const offset = camera.position.clone().sub(ref.current.target);
    const spherical = new THREE.Spherical().setFromVector3(offset);
    if (command.name === 'left') spherical.theta -= .23;
    if (command.name === 'right') spherical.theta += .23;
    if (command.name === 'in') spherical.radius = Math.max(16, spherical.radius * .85);
    if (command.name === 'out') spherical.radius = Math.min(48, spherical.radius * 1.18);
    camera.position.copy(new THREE.Vector3().setFromSpherical(spherical).add(ref.current.target)); ref.current.update(); invalidate();
  }, [command]);
  return <OrbitControls ref={ref} makeDefault enabled={interactive} enablePan={false} enableDamping={!reducedMotion} dampingFactor={.09} minDistance={16} maxDistance={48} minPolarAngle={.52} maxPolarAngle={1.43} rotateSpeed={.65} zoomSpeed={.7} touches={{ ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_ROTATE }} />;
}

function AdaptiveQuality() {
  const { setDpr } = useThree();
  const samples = useRef([]), reduced = useRef(false);
  useFrame((_, delta) => {
    if (reduced.current || delta > .2) return;
    samples.current.push(delta);
    if (samples.current.length >= 45) { const average = samples.current.reduce((a, b) => a + b, 0) / samples.current.length; if (average > .032) { setDpr(1); reduced.current = true; } samples.current = []; }
  });
  return null;
}

function ContextListener({ onContextLost }) {
  const { gl } = useThree();
  useEffect(() => { const handler = (e) => { e.preventDefault(); onContextLost(); }; gl.domElement.addEventListener('webglcontextlost', handler); return () => gl.domElement.removeEventListener('webglcontextlost', handler); }, [gl, onContextLost]);
  return null;
}

export default function VillaScene({ night, interactive, command, selected, onSelect, onContextLost }) {
  const [lowPower] = useState(() => (navigator.hardwareConcurrency || 4) <= 4);
  const markers = useRef([]);
  return <div className="scene-root"><Canvas dpr={[1, lowPower ? 1.25 : 1.5]} frameloop="demand" camera={{ position: [18, 13, 23], fov: 42, near: .1, far: 150 }} gl={{ antialias: !lowPower, powerPreference: 'low-power', alpha: false }} fallback={<div className="viewer-failure">WebGL is unavailable. The static preview and architectural descriptions remain available.</div>}>
    <color attach="background" args={[night ? '#172522' : '#d8d9cd']} />
    <ambientLight intensity={night ? .7 : 1.6} color={night ? '#94b5c8' : '#fff4df'} />
    <hemisphereLight args={[night ? '#819ba8' : '#eff5eb', '#64745d', night ? .65 : 1.5]} />
    <directionalLight position={[9, 17, 8]} intensity={night ? .7 : 3} color={night ? '#afc8e0' : '#fff2d9'} />
    <directionalLight position={[-10, 7, -5]} intensity={night ? .3 : .7} />
    <Architecture night={night} />
    <HotspotProjection markers={markers} />
    <CameraRig interactive={interactive} command={command} /><AdaptiveQuality /><ContextListener onContextLost={onContextLost} />
  </Canvas><div className="hotspot-layer">{['pool court', 'upper terrace', 'glazed living façade', 'cantilever'].map((name, i) => <button key={name} ref={(el) => { markers.current[i] = el; }} className={`hotspot ${selected === i ? 'selected' : ''}`} aria-label={`Explore ${name}`} aria-pressed={selected === i} onClick={() => onSelect(i)}>{i + 1}</button>)}</div></div>;
}
