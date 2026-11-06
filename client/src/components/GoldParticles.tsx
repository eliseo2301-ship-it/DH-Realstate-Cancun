import React, { useEffect, useRef } from 'react';

interface GoldParticlesProps {
  className?: string;
  count?: number;
  interactive?: boolean;
}

export const GoldParticles: React.FC<GoldParticlesProps> = ({ 
  className = "absolute inset-0 pointer-events-none",
  count = 35,
  interactive = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Responsive resize handler
    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle definition
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      maxOpacity: number;
      opacitySpeed: number;
      pulse: number;
      color: string;
    }

    const goldColors = [
      'rgba(245, 208, 169, ', // light champagne gold
      'rgba(226, 176, 136, ', // warm rose gold
      'rgba(197, 146, 104, ', // metallic bronze
      'rgba(255, 223, 186, ', // radiant gold
      'rgba(0, 180, 216, ',   // subtle caribbean cyan speck
    ];

    const particles: Particle[] = [];
    const particleCount = Math.min(count, Math.floor((width * height) / 18000) || count);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.5 + 0.8,
        speedY: -(Math.random() * 0.4 + 0.15),
        speedX: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.7 + 0.2,
        maxOpacity: Math.random() * 0.6 + 0.3,
        opacitySpeed: (Math.random() * 0.015 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
        pulse: Math.random() * Math.PI * 2,
        color: goldColors[Math.floor(Math.random() * goldColors.length)]
      });
    }

    // Mouse interactivity
    const mouse = { x: -1000, y: -1000, radius: 90 };
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    if (interactive && canvas.parentElement) {
      canvas.parentElement.addEventListener('mousemove', handleMouseMove);
      canvas.parentElement.addEventListener('mouseleave', handleMouseLeave);
    }

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Position update with gentle floating
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.pulse) * 0.25;
        p.pulse += 0.02;

        // Twinkling opacity
        p.opacity += p.opacitySpeed;
        if (p.opacity > p.maxOpacity || p.opacity < 0.15) {
          p.opacitySpeed = -p.opacitySpeed;
        }

        // Mouse repulsion / shimmer interaction
        if (interactive && mouse.x > 0) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (1 - dist / mouse.radius) * 1.5;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
            p.opacity = Math.min(1, p.opacity + 0.3);
          }
        }

        // Wrap around boundaries
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Draw glowing particle with radial gradient
        ctx.save();
        const radGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        radGrad.addColorStop(0, `${p.color}${p.opacity})`);
        radGrad.addColorStop(0.5, `${p.color}${p.opacity * 0.5})`);
        radGrad.addColorStop(1, `${p.color}0)`);

        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fill();

        // Core brilliant sparkle
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity * 0.9})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (interactive && canvas?.parentElement) {
        canvas.parentElement.removeEventListener('mousemove', handleMouseMove);
        canvas.parentElement.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [count, interactive]);

  return (
    <canvas 
      ref={canvasRef} 
      className={className}
      style={{ pointerEvents: 'none' }}
    />
  );
};
