import { useEffect, useRef } from "react";

/**
 * A very faint field of topographic contour traces.
 * The pointer displaces the field like a lens moving over a computational material,
 * with inertia so the field keeps drifting briefly after the pointer stops.
 */
export function ContourField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // pointer state with inertia
    let px = width / 2;
    let py = height / 2;
    let tx = px;
    let ty = py;
    let vx = 0;
    let vy = 0;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    if (!coarse) window.addEventListener("pointermove", onMove, { passive: true });

    const wave = (x: number, y: number, t: number) =>
      Math.sin(x * 0.0065 + t * 0.00021) * 18 +
      Math.sin(y * 0.0041 - x * 0.0022 + t * 0.00013) * 14 +
      Math.sin((x + y) * 0.0029 + t * 0.00031) * 9;

    let raf = 0;
    let start = 0;

    const render = (time: number) => {
      if (!start) start = time;
      const t = time - start;

      if (coarse) {
        // autonomous drift on touch devices
        tx = width * (0.5 + 0.34 * Math.sin(t * 0.00019));
        ty = height * (0.5 + 0.28 * Math.cos(t * 0.00013));
      }

      // spring + inertia
      const k = reduced ? 0.2 : 0.045;
      vx = (vx + (tx - px) * k) * 0.88;
      vy = (vy + (ty - py) * k) * 0.88;
      px += vx;
      py += vy;

      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 0.6;

      const spacing = width < 640 ? 34 : 26;
      const step = 14;
      const radius = Math.min(width, height) * 0.42;
      const speed = Math.min(Math.hypot(vx, vy), 40);

      for (let baseY = -40; baseY < height + 40; baseY += spacing) {
        ctx.beginPath();
        for (let x = -20; x <= width + 20; x += step) {
          const w = reduced ? 0 : wave(x, baseY, t);
          let y = baseY + w * 0.22;

          const dx = x - px;
          const dy = baseY - py;
          const d = Math.hypot(dx, dy);
          if (d < radius) {
            const f = Math.pow(1 - d / radius, 2.2);
            const push = f * (26 + speed * 0.7);
            y += (dy / (d || 1)) * push;
          }
          if (x === -20) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        const dist = Math.abs(baseY - py) / (height || 1);
        const alpha = 0.055 + 0.085 * Math.max(0, 1 - dist * 2.4);
        ctx.strokeStyle = `rgba(40, 42, 46, ${alpha.toFixed(3)})`;
        ctx.stroke();
      }

      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 h-full w-full"
    />
  );
}
