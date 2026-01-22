import React, { useEffect, useRef } from 'react';
import { ArrowRight, GithubIcon, LinkedinIcon, Mail } from 'lucide-react';

export const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Array<{
      x: number;
      y: number;
      dx: number;
      dy: number;
      size: number;
    }> = [];
    let animationFrameId: number;

    const initParticles = () => {
      particles = [];
      const particleCount = Math.floor(window.innerWidth * (window.innerWidth < 768 ? 0.04 : 0.08));
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          dx: (Math.random() - 0.5) * 0.8,
          dy: (Math.random() - 0.5) * 0.8,
          size: Math.random() * 1.5 + 1,
        });
      }
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const isDark = document.documentElement.classList.contains('dark');
      // Using the primary color #10b981 for the particles and lines
      const colorBase = '16, 185, 129';
      
      particles.forEach((p, index) => {
        // Move
        p.x += p.dx;
        p.y += p.dy;

        // Bounce
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

        // Draw Particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${colorBase}, ${isDark ? 0.4 : 0.2})`;
        ctx.fill();

        // Mouse Connection
        const dxMouse = p.x - mouseRef.current.x;
        const dyMouse = p.y - mouseRef.current.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 180) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${colorBase}, ${0.4 * (1 - distMouse / 180)})`;
          ctx.lineWidth = 0.8;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
          ctx.stroke();
        }

        // Particle Connections
        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${colorBase}, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative h-[100dvh] flex flex-col justify-center overflow-hidden">
      {/* Background Particles Layer */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80"
      />

      <div className="max-w-7xl mx-auto w-full z-10 px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 md:space-y-6">
          <p className="text-primary font-medium tracking-wide uppercase text-sm animate-fade-in-up flex items-center gap-2">
            Hi, <span className="animate-wave origin-[70%_70%] inline-block">👋</span> I'm
          </p>
          <div className="space-y-1 md:space-y-2 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight">
              Abel
            </h1>
            <h2 className="text-2xl sm:text-4xl font-semibold text-primary">
              Full-Stack Developer
            </h2>
          </div>
          <p className="max-w-2xl text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            I build full-stack web applications from idea to launch, crafting scalable, user-focused solutions with modern technologies.          
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 pt-4 md:pt-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <a href="#projects" className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium transition-all hover:opacity-90 hover:scale-105 active:scale-95 shadow-lg">
              Check out my work
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            
            <div className="flex items-center space-x-4">
              <a href="https://github.com/abelwebdev" target="_blank" className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-all hover:-translate-y-1" aria-label="GitHub">
                <GithubIcon size={24} />
              </a>
              <a href="https://www.linkedin.com/in/abelwebdev" target="_blank" className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-all hover:-translate-y-1" aria-label="LinkedIn">
                <LinkedinIcon size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};