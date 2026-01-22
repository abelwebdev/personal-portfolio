import React, { useEffect, useRef, useState } from 'react';
import { Skill } from '../types';
import { RevealOnScroll } from './RevealOnScroll';

const skills: Partial<Skill>[] = [
  { name: 'JavaScript', category: 'Frontend' },
  { name: 'TypeScript', category: 'Frontend' },
  { name: 'Next.js', category: 'Frontend' },
  { name: 'React', category: 'Frontend' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Redux', category: 'Frontend' },
  { name: 'Express.js', category: 'Backend' },
  { name: 'Fastify', category: 'Backend' },
  { name: 'Firebase', category: 'Backend' },
  { name: 'Tailwind', category: 'Frontend' },
  { name: 'Prisma', category: 'Backend' },
  { name: 'Postgres', category: 'Backend' },
  { name: 'MySQL', category: 'Backend' },
  { name: 'MongoDB', category: 'Backend' },
  { name: 'Git', category: 'Tools' },
];

const getIconUrl = (name: string) => {
  const mapping: Record<string, string> = {
    'JavaScript': 'logos:javascript',
    'TypeScript': 'logos:typescript-icon',
    'Next.js': 'logos:nextjs-icon',
    'React': 'logos:react',
    'Node.js': 'logos:nodejs-icon',
    'Redux': 'logos:redux',
    'Express.js': 'logos:express',
    'Fastify': 'logos:fastify-icon',
    'Firebase': 'vscode-icons:file-type-firebase',
    'Tailwind': 'logos:tailwindcss-icon',
    'Prisma': 'logos:prisma',
    'Postgres': 'logos:postgresql',
    'MySQL': 'logos:mysql',
    'MongoDB': 'logos:mongodb-icon',
    'Git': 'logos:git-icon',
  };
  
  const iconName = mapping[name] || 'vscode-icons:default-file';
  return `https://api.iconify.design/${iconName}.svg`;
};

const SkillSphere: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState<{ x: number; y: number; z: number; name: string }[]>([]);
  const rotationRef = useRef({ x: 0.005, y: 0.005 });

  useEffect(() => {
    const count = skills.length;
    const radius = 150;
    const initialPositions = skills.map((skill, i) => {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      return {
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi),
        name: skill.name || '',
      };
    });
    setPositions(initialPositions);

    let animationFrameId: number;
    const animate = () => {
      setPositions((prev) =>
        prev.map((pos) => {
          const cosX = Math.cos(rotationRef.current.x);
          const sinX = Math.sin(rotationRef.current.x);
          let y1 = pos.y * cosX - pos.z * sinX;
          let z1 = pos.y * sinX + pos.z * cosX;
          const cosY = Math.cos(rotationRef.current.y);
          const sinY = Math.sin(rotationRef.current.y);
          let x2 = pos.x * cosY + z1 * sinY;
          let z2 = -pos.x * sinY + z1 * cosY;
          return { ...pos, x: x2, y: y1, z: z2 };
        })
      );
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      rotationRef.current = { x: -y * 0.02, y: x * 0.02 };
    };

    const container = containerRef.current;
    if (container) container.addEventListener('mousemove', handleMouseMove);
    animate();
    return () => {
      cancelAnimationFrame(animationFrameId);
      if (container) container.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[400px] flex items-center justify-center perspective-1000 overflow-visible cursor-default">
      {positions.map((pos, i) => {
        const scale = (pos.z + 200) / 350;
        const opacity = (pos.z + 150) / 300;
        return (
          <span
            key={i}
            className="absolute font-bold text-lg select-none pointer-events-none whitespace-nowrap transition-colors duration-300"
            style={{
              transform: `translate3d(${pos.x}px, ${pos.y}px, 0) scale(${scale})`,
              opacity: Math.max(0.1, opacity),
              color: `rgba(16, 185, 129, ${Math.max(0.3, opacity)})`,
              zIndex: Math.round(pos.z + 200),
            }}
          >
            {pos.name}
          </span>
        );
      })}
      <div className="absolute w-24 h-24 bg-primary/10 rounded-full blur-3xl animate-pulse" />
    </div>
  );
};

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-zinc-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 flex items-center">
            <span className="text-primary mr-2">01.</span> Skills & Technologies
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {skills.map((skill, index) => (
                <div 
                  key={skill.name}
                  className="flex flex-col items-center justify-center p-3 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800 hover:border-primary dark:hover:border-primary transition-all duration-300 group hover:-translate-y-1"
                  style={{ transitionDelay: `${index * 30}ms` }}
                >
                  <div className="w-12 h-7 mb-2 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <img 
                      src={getIconUrl(skill.name!)} 
                      alt={skill.name} 
                      className={`w-full h-full object-contain ${['Express.js', 'Next.js', 'Fastify', 'Prisma'].includes(skill.name!) ? 'dark:invert' : ''}`}
                      loading="lazy"
                    />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-tighter text-gray-500 dark:text-zinc-500 transition-colors">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
            <div className="hidden lg:flex justify-center items-center">
              <SkillSphere />
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};