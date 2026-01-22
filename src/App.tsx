
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Hero } from '../components/Hero';
import { Skills } from '../components/Skills';
import { Projects } from '../components/Projects';
import { Contact } from '../components/Contact';
import { ThemeToggle } from '../components/ThemeToggle';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const navLinks = [
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const Logo = () => (
    <div className="font-bold text-xl tracking-tight text-gray-900 dark:text-white font-mono flex items-center group">
      <span className="text-gray-400 dark:text-zinc-600 transition-transform duration-300 group-hover:-translate-x-1">&lt;</span>
      <span className="mx-0.5">Abel</span>
      <span className="text-gray-400 dark:text-zinc-600 transition-transform duration-300 group-hover:translate-x-1"> /&gt;</span>
    </div>
  );

  return (
    <div className="min-h-screen relative bg-gray-50 dark:bg-black transition-colors duration-300">
      {/* Navigation Bar */}
      <nav className="fixed w-full top-0 z-40 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-100 dark:border-zinc-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <a href="#" className="block">
                <Logo />
              </a>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href} 
                  className="relative group py-1 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 ease-out group-hover:w-full" />
                </a>
              ))}
              <div className="flex items-center gap-4 pl-8 border-l border-gray-200 dark:border-zinc-800">
                <ThemeToggle />
              </div>
            </div>

            {/* Mobile Navigation Controls */}
            <div className="flex md:hidden items-center gap-4">
              <ThemeToggle />
              <button 
                onClick={() => setIsMenuOpen(true)}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary transition-colors transform active:scale-90"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      <div 
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
        <div className={`absolute right-0 top-0 h-full w-72 bg-white dark:bg-zinc-950 transition-transform duration-300 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full shadow-2xl'}`}>
          <div className="flex flex-col h-full p-8">
            <div className="flex justify-between items-center mb-12">
              <Logo />
              <button onClick={() => setIsMenuOpen(false)} className="text-gray-500 hover:text-primary transition-colors transform active:scale-90">
                <X size={28} />
              </button>
            </div>
            <div className="flex flex-col space-y-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="relative group w-fit text-2xl font-bold text-gray-900 dark:text-white hover:text-primary transition-colors"
                >
                  {link.name}
                  <span className="absolute -bottom-2 left-0 w-0 h-1 bg-primary transition-all duration-300 ease-out group-hover:w-full" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <main>
        <Hero />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <footer className="py-12 text-center border-t border-gray-100 dark:border-zinc-900 text-gray-500 text-sm">
        <div className="max-w-7xl mx-auto px-4">
          <p className="flex items-center justify-center gap-2">
            &copy; {new Date().getFullYear()} 
            <span className="font-mono text-gray-900 dark:text-white">&lt;Abel /&gt;</span>. 
            Built with React & Tailwind.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
