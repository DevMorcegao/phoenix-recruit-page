"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<{ x: number; y: number; size: number; speedX: number; speedY: number; life: number }[]>([]);
  const cursor = useRef({ x: 0, y: 0 });
  const lastMove = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    const onMouseMove = (e: MouseEvent) => {
      cursor.current.x = e.clientX;
      cursor.current.y = e.clientY;
      lastMove.current = Date.now();
      
      // Add particles on move
      for (let i = 0; i < 3; i++) {
        particles.current.push({
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 8 + 2,
          speedX: (Math.random() - 0.5) * 2,
          speedY: (Math.random() - 0.5) * 2,
          life: 1.0,
        });
      }
    };
    window.addEventListener("mousemove", onMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.current.forEach((p, i) => {
        p.x += p.speedX;
        p.y += p.speedY - 1; // Float up like fire
        p.life -= 0.02;
        p.size *= 0.95;

        if (p.life <= 0) {
          particles.current.splice(i, 1);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
          gradient.addColorStop(0, `rgba(255, 215, 0, ${p.life})`); // Gold center
          gradient.addColorStop(0.5, `rgba(255, 69, 0, ${p.life})`); // Orange middle
          gradient.addColorStop(1, `rgba(139, 0, 0, 0)`); // Dark red fade
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      });

      // Draw static cursor indicator (always visible)
      const isMoving = Date.now() - lastMove.current < 100;
      const ringOpacity = isMoving ? 0.4 : 0.8;
      
      // Outer ring
      ctx.beginPath();
      ctx.arc(cursor.current.x, cursor.current.y, 6, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 69, 0, ${ringOpacity})`;
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Inner dot
      ctx.beginPath();
      ctx.arc(cursor.current.x, cursor.current.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 215, 0, ${ringOpacity})`;
      ctx.fill();

      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
    />
  );
}
