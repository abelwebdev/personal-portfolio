import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Project } from '../types';
import { RevealOnScroll } from './RevealOnScroll';

const projects: Project[] = [
  {
    id: 1,
    title: 'Flick Verse',
    description: 'A movie streaming platform built with React and Tailwind CSS, featuring the latest movies and TV shows with fast search functionality.',
    technologies: ['TypeScript', 'React', 'Tailwind', 'Framer Motion'],
    link: 'https://flick-verse.netlify.app',
    github: 'https://github.com/abelwebdev/flick-verse',
    image: '/projects/flick-verse.png',
  },
  {
    id: 2,
    title: 'Fit Track',
    description: 'A full-stack fitness platform with 1300+ exercises for tracking workouts, building custom routines, and monitoring progress.',
    technologies: ['TypeScript', 'React', 'Fastify', 'MongoDB', 'Redux', 'Tailwind', 'Firebase'],
    link: 'https://fit-trackweb.netlify.app',
    github: 'https://github.com/abelwebdev/fit-track',
    image: '/projects/fit-track.png',
  },
  {
    id: 3,
    title: 'Guitar JamTrack',
    description: 'A Next.js platform for guitar enthusiasts to browse, play, and organize backing tracks with seamless playlist creation and artist discovery.',
    technologies: ['TypeScript', 'Next.js', 'Tailwind', 'Prisma', 'PostgreSQL', 'Neon', 'Shadcn/ui', 'Firebase'],
    link: 'https://guitar-jam-track.netlify.app',
    github: 'https://github.com/abelwebdev/guitar-jam-track',
    image: '/projects/guitar-jam-track.png',
  }
];

const getTechIconUrl = (name: string) => {
  const mapping: Record<string, string> = {
    'React': 'logos:react',
    'TypeScript': 'logos:typescript-icon',
    'Next.js': 'logos:nextjs-icon',
    'Tailwind': 'logos:tailwindcss-icon',
    'Prisma': 'logos:prisma',
    'PostgreSQL': 'logos:postgresql',
    'Firebase': 'vscode-icons:file-type-firebase',
    'Fastify': 'logos:fastify-icon',
    'MongoDB': 'logos:mongodb-icon',
    'Redux': 'logos:redux',
    'Neon': 'logos:neon-icon',
    'Shadcn/ui': 'simple-icons:shadcnui',
    'Framer Motion': 'logos:framer',
  };
  
  const iconName = mapping[name] || 'vscode-icons:default-file';
  return `https://api.iconify.design/${iconName}.svg`;
};

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 flex items-center">
            <span className="text-primary mr-2">02.</span> Featured Projects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div 
                key={project.id}
                className="group flex flex-col bg-white dark:bg-zinc-950 rounded-2xl shadow-lg border border-gray-100 dark:border-zinc-900 overflow-hidden hover:border-primary dark:hover:border-primary transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-zinc-400 text-sm mb-4 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span 
                        key={tech} 
                        className="flex items-center gap-1.5 px-3 py-1 bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-full text-[10px] font-bold text-gray-700 dark:text-gray-300 transition-colors"
                      >
                        <img 
                          src={getTechIconUrl(tech)} 
                          className={`w-3 h-3 ${['Next.js', 'Fastify', 'Prisma', 'Shadcn/ui', 'Framer Motion'].includes(tech) ? 'dark:invert' : ''}`} 
                          alt="" 
                        />
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center gap-4 pt-4 border-t border-gray-100 dark:border-zinc-900">
                    <a href={project.github} target="_blank" className="flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-zinc-300 hover:text-primary transition-all duration-300 hover:-translate-y-1 hover:scale-105">
                      <Github size={18} className="transition-transform duration-300 group-hover:rotate-12" />
                      Code
                    </a>
                    <a href={project.link} target="_blank" className="flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-zinc-300 hover:text-primary transition-all duration-300 hover:-translate-y-1 hover:scale-105">
                      <ExternalLink size={18} className="transition-transform duration-300 group-hover:rotate-12" />
                      Live
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};