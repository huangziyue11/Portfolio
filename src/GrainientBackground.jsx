import { useEffect, useRef } from 'react';

/** A lightweight canvas interpretation of the original warm, grainy background. */
export default function GrainientBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d', { alpha: false });
    if (!canvas || !context) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pointer = { x: 0.5, y: 0.42, targetX: 0.5, targetY: 0.42, active: false };
    const noise = document.createElement('canvas');
    noise.width = 180;
    noise.height = 180;
    const noiseContext = noise.getContext('2d');
    const noisePixels = noiseContext.createImageData(noise.width, noise.height);
    for (let i = 0; i < noisePixels.data.length; i += 4) {
      const shade = Math.random() * 255;
      noisePixels.data[i] = shade;
      noisePixels.data[i + 1] = shade;
      noisePixels.data[i + 2] = shade;
      noisePixels.data[i + 3] = 30;
    }
    noiseContext.putImageData(noisePixels, 0, 0);

    let width = 1;
    let height = 1;
    let ratio = 1;
    let raf = 0;
    let lastPaint = 0;
    let noisePattern = null;

    const schedulePaint = () => {
      if (!raf && !document.hidden) raf = requestAnimationFrame(paint);
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      ratio = Math.min(window.devicePixelRatio || 1, 1.25);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      noisePattern = context.createPattern(noise, 'repeat');
      schedulePaint();
    };

    const paint = (now) => {
      raf = 0;
      const dt = lastPaint ? Math.min((now - lastPaint) / 1000, 0.05) : 1 / 60;
      lastPaint = now;
      const follow = reduceMotion ? 1 : 1 - Math.exp(-dt / 0.18);
      pointer.x += (pointer.targetX - pointer.x) * follow;
      pointer.y += (pointer.targetY - pointer.y) * follow;

      context.fillStyle = '#0b0907';
      context.fillRect(0, 0, width, height);
      const glowX = pointer.active ? pointer.x * width : width * 0.5;
      const glowY = pointer.active ? pointer.y * height : height * 0.38;
      const radius = Math.max(width, height) * 0.72;

      const glow = context.createRadialGradient(glowX, glowY, 0, glowX, glowY, radius);
      glow.addColorStop(0, 'rgba(255, 201, 150, 0.12)');
      glow.addColorStop(0.38, 'rgba(146, 92, 56, 0.09)');
      glow.addColorStop(1, 'rgba(11, 9, 7, 0)');
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      const amber = context.createRadialGradient(width * 0.78, height * 0.82, 0, width * 0.78, height * 0.82, radius * 0.62);
      amber.addColorStop(0, 'rgba(192, 126, 78, 0.07)');
      amber.addColorStop(1, 'rgba(11, 9, 7, 0)');
      context.fillStyle = amber;
      context.fillRect(0, 0, width, height);

      context.globalAlpha = 0.1;
      context.fillStyle = noisePattern;
      context.fillRect(0, 0, width, height);
      context.globalAlpha = 1;

      const isSettled = Math.abs(pointer.targetX - pointer.x) < 0.001 && Math.abs(pointer.targetY - pointer.y) < 0.001;
      if (!isSettled) schedulePaint();
    };

    const onPointerMove = (event) => {
      pointer.targetX = event.clientX / Math.max(1, width);
      pointer.targetY = event.clientY / Math.max(1, height);
      pointer.active = true;
      schedulePaint();
    };
    const onPointerLeave = () => {
      pointer.active = false;
      pointer.targetX = 0.5;
      pointer.targetY = 0.42;
      schedulePaint();
    };
    const onVisibilityChange = () => {
      if (document.hidden && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else {
        schedulePaint();
      }
    };

    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onPointerLeave);
    document.addEventListener('visibilitychange', onVisibilityChange);
    resize();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      document.documentElement.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="grainient-background" aria-hidden="true" />;
}
