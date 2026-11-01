import { useEffect, useRef } from 'react';

const STAR_PATH = 'M12 0C13.7 8.3 15.7 10.3 24 12 15.7 13.7 13.7 15.7 12 24 10.3 15.7 8.3 13.7 0 12 8.3 10.3 10.3 8.3 12 0Z';

function Star({ className = '' }) {
  return <svg className={className} viewBox="0 0 24 24" aria-hidden="true"><path d={STAR_PATH} /></svg>;
}

export default function StarCursor() {
  const cursorRef = useRef(null);
  const layerRef = useRef(null);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reducedMotion) return undefined;

    const root = document.documentElement;
    root.classList.add('star-cursor-enabled');
    const move = (event) => {
      const cursor = cursorRef.current;
      if (!cursor) return;
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      cursor.classList.add('is-visible');
    };
    const burst = (event) => {
      const layer = layerRef.current;
      if (!layer) return;
      const count = 9;
      for (let i = 0; i < count; i += 1) {
        const star = document.createElement('span');
        star.className = 'cursor-burst-star';
        star.textContent = '✦';
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.24;
        const distance = 28 + Math.random() * 36;
        star.style.left = `${event.clientX}px`;
        star.style.top = `${event.clientY}px`;
        star.style.setProperty('--dx', `${Math.cos(angle) * distance}px`);
        star.style.setProperty('--dy', `${Math.sin(angle) * distance}px`);
        star.style.setProperty('--spin', `${(Math.random() - 0.5) * 190}deg`);
        star.style.fontSize = `${8 + Math.random() * 8}px`;
        layer.appendChild(star);
        window.setTimeout(() => star.remove(), 720);
      }
    };
    const hide = () => cursorRef.current?.classList.remove('is-visible');

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', burst, { passive: true });
    window.addEventListener('blur', hide);
    document.addEventListener('pointerleave', hide);
    return () => {
      root.classList.remove('star-cursor-enabled');
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', burst);
      window.removeEventListener('blur', hide);
      document.removeEventListener('pointerleave', hide);
    };
  }, []);

  return (
    <>
      <div className="star-cursor" ref={cursorRef}><Star /></div>
      <div className="cursor-burst-layer" ref={layerRef} aria-hidden="true" />
    </>
  );
}
