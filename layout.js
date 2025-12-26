import React from 'react';
import MagicalBackground from '@/components/MagicalBackground';
import MagicalHeader from '@/components/MagicalHeader';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');
        
        :root {
          --font-serif: 'Cinzel', serif;
          --font-body: 'Crimson Text', Georgia, serif;
        }
        
        body {
          font-family: var(--font-body);
          background: #0a0a1a;
        }
        
        h1, h2, h3, h4, h5, h6 {
          font-family: var(--font-serif);
        }
        
        .font-serif {
          font-family: var(--font-serif);
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #1a1033;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #6b21a8, #d97706);
          border-radius: 4px;
        }
        
        /* Selection color */
        ::selection {
          background: rgba(217, 119, 6, 0.3);
          color: #fef3c7;
        }
      `}</style>
      
      <MagicalBackground />
      
      <div className="relative z-10">
        <MagicalHeader />
        <main>{children}</main>
        
        {/* Footer */}
        <footer className="relative mt-24 border-t border-purple-800/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
            <div className="text-center">
              <p className="font-serif text-2xl text-amber-400/80 mb-2">Enchanted Quill</p>
              <p className="text-purple-300/50 text-sm">Where Magic Meets Words</p>
              <div className="mt-6 flex justify-center gap-4">
                <div className="w-2 h-2 rounded-full bg-amber-500/50 animate-pulse" />
                <div className="w-2 h-2 rounded-full bg-purple-500/50 animate-pulse" style={{ animationDelay: '0.5s' }} />
                <div className="w-2 h-2 rounded-full bg-amber-500/50 animate-pulse" style={{ animationDelay: '1s' }} />
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}