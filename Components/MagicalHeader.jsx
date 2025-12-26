import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Wand2, Menu, X, Feather, Home, BookOpen, PenTool } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MagicalHeader() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', icon: Home, page: 'Home' },
    { name: 'All Posts', icon: BookOpen, page: 'AllPosts' },
    { name: 'Write', icon: PenTool, page: 'CreatePost' },
  ];

  return (
    <header className="relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to={createPageUrl('Home')}>
            <motion.div 
              className="flex items-center gap-3 group cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-amber-500 blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center border border-amber-400/50 shadow-lg shadow-amber-500/20">
                  <Wand2 className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-serif font-bold bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent">
                  Enchanted Quill
                </h1>
                <p className="text-xs text-purple-300/60 tracking-widest uppercase">Tales of Magic</p>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Link key={item.name} to={createPageUrl(item.page)}>
                <Button
                  variant="ghost"
                  className="text-purple-200 hover:text-amber-300 hover:bg-purple-900/30 transition-all duration-300"
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.name}
                </Button>
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-purple-200 hover:text-amber-400 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 overflow-hidden"
            >
              <div className="bg-purple-900/40 backdrop-blur-lg rounded-xl border border-purple-700/30 p-4 space-y-2">
                {navItems.map((item) => (
                  <Link 
                    key={item.name} 
                    to={createPageUrl(item.page)}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-center gap-3 p-3 rounded-lg text-purple-200 hover:text-amber-300 hover:bg-purple-800/30 transition-all">
                      <item.icon className="w-5 h-5" />
                      {item.name}
                    </div>
                  </Link>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}