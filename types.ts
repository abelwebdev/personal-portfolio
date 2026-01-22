
export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  link: string;
  github: string;
  image: string;
}

export interface Skill {
  name: string;
  category: 'Frontend' | 'Backend' | 'Tools' | 'Design';
  level: number;
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}