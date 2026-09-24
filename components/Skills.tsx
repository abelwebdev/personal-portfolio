import React, { useState } from 'react';
import { 
  Code2, 
  Layout, 
  Server, 
  Database, 
  Terminal
} from 'lucide-react';
import { RevealOnScroll } from './RevealOnScroll';

interface SkillItem {
  name: string;
  iconName: string;
  invertInDark?: boolean;
}
interface CategoryGroup {
  index: number,
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  skills: SkillItem[];
}
const CATEGORIES: CategoryGroup[] = [
  {
    index: 1,
    name: 'Languages',
    icon: Code2,
    skills: [
      { name: 'TypeScript', iconName: 'logos:typescript-icon' },
      { name: 'JavaScript', iconName: 'logos:javascript' }
    ],
  },
  {
    index: 2,
    name: 'Frontend',
    icon: Layout,
    skills: [
      { name: 'React', iconName: 'logos:react' },
      { name: 'Next.js', iconName: 'logos:nextjs-icon', invertInDark: true },
      { name: 'Tailwind CSS', iconName: 'logos:tailwindcss-icon' },
      { name: 'Redux', iconName: 'logos:redux' },
      { name: "Zustand", iconName: 'devicon:zustand', invertInDark: true},
      { name: "React Router", iconName: 'devicon:reactrouter', invertInDark: true}
    ],
  },
  {
    index: 3,
    name: 'Backend',
    icon: Server,
    skills: [
      { name: 'Node.js', iconName: 'logos:nodejs-icon' },
      { name: 'Express.js', iconName: 'devicon:express', invertInDark: true },
      { name: 'Fastify', iconName: 'logos:fastify-icon', invertInDark: true },
      { name: 'Better-Auth', iconName: 'thesvg-color:better-auth-dark', invertInDark: true },
      { name: 'Firebase', iconName: 'vscode-icons:file-type-firebase' },
    ],
  },
  {
    index: 4,
    name: 'Database & ORM/ODM',
    icon: Database,
    skills: [
      { name: 'PostgreSQL', iconName: 'logos:postgresql' },
      { name: 'MongoDB', iconName: 'logos:mongodb-icon' },
      { name: 'MySQL', iconName: 'devicon:mysql' },
      { name: 'Prisma', iconName: 'logos:prisma', invertInDark: true },
      { name: 'Mongoose', iconName: 'devicon:mongoose' }
    ],
  },
  {
    index: 5,
    name: 'Devops & Tools',
    icon: Terminal,
    skills: [
      { name: 'Git', iconName: 'logos:git-icon' },
      { name: 'Docker', iconName: 'logos:docker-icon' },
      { name: 'Linux', iconName: 'logos:linux-tux' }
    ],
  },
];
const TechIcon: React.FC<{ iconName: string; name: string; invertInDark?: boolean }> = ({
  iconName,
  name,
  invertInDark,
}) => {
  const [hasError, setHasError] = useState(false);
  const src = `https://api.iconify.design/${iconName}.svg`;

  if (hasError) {
    return (
      <span className="font-mono font-bold text-xs text-primary shrink-0">
        {name.slice(0, 2).toUpperCase()}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      onError={() => setHasError(true)}
      className={`w-8 h-8 object-contain shrink-0 transition-transform duration-200 group-hover:scale-115 ${
        invertInDark ? 'dark:invert' : ''
      }`}
      loading="lazy"
    />
  );
};

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-black transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <RevealOnScroll>
          {/* Section Header */}
          <div className="mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center">
              <span className="text-primary mr-3 font-mono">01.</span> Skills & Technologies
            </h2>
          </div>
          {/* Grouped Skills Flow - No boxes, No grids */}
          <div className="divide-y divide-gray-200 dark:divide-zinc-800/80 border-y border-gray-200 dark:border-zinc-800/80">
            {CATEGORIES.map((category, index) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.index}
                  className="py-7 sm:py-8 flex flex-col md:flex-row md:items-baseline gap-4 md:gap-10 transition-colors"
                >
                  {/* Category Title & Indicator */}
                  <div className="w-full md:w-52 shrink-0 flex items-center justify-between md:justify-start gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-m text-primary font-semibold">
                        0{index + 1}.
                      </span>
                      <Icon className="w-5 h-5 text-gray-400 dark:text-zinc-500" />
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white font-mono tracking-tight">
                        {category.name}
                      </h3>
                    </div>
                  </div>

                  {/* Flowing Inline Skills List */}
                  <div className="flex-1 flex flex-wrap items-center gap-x-6 gap-y-3.5">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="group inline-flex items-center gap-2 py-1 text-base text-gray-700 dark:text-zinc-300 transition-colors cursor-default"
                      >
                        <TechIcon
                          iconName={skill.iconName}
                          name={skill.name}
                          invertInDark={skill.invertInDark}
                        />
                        <span className="font-medium tracking-tight">
                          {skill.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};