import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Sparkles, BookOpen } from 'lucide-react';
import { format } from 'date-fns';

const categoryIcons = {
  "Spells & Charms": "✨",
  "Magical Creatures": "🐉",
  "Potions": "🧪",
  "Dark Arts Defense": "🛡️",
  "Wizarding World": "🏰",
  "Quidditch": "🧹",
  "Magical History": "📜",
};

export default function MagicalCard({ post, featured = false }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`relative group ${featured ? 'md:col-span-2' : ''}`}
    >
      <Link to={createPageUrl('BlogPost') + `?id=${post.id}`}>
        {/* Magical glow effect on hover */}
        <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 via-purple-500/20 to-amber-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Card content */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#1a1525]/90 to-[#0d0a15]/90 border border-amber-900/30 backdrop-blur-sm">
          {/* Parchment texture overlay */}
          <div className="absolute inset-0 opacity-5" 
               style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1519682577862-22b62b24e493?w=800")' }} />
          
          {/* Cover image */}
          <div className={`relative overflow-hidden ${featured ? 'h-72' : 'h-48'}`}>
            {post.cover_image ? (
              <img 
                src={post.cover_image} 
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-900/50 to-indigo-900/50 flex items-center justify-center">
                <BookOpen className="w-16 h-16 text-amber-500/30" />
              </div>
            )}
            {/* Magical shimmer overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a15] via-transparent to-transparent" />
            
            {/* Featured badge */}
            {post.featured && (
              <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 bg-amber-500/20 backdrop-blur-sm rounded-full border border-amber-500/30">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span className="text-xs font-medium text-amber-300">Featured</span>
              </div>
            )}
            
            {/* Category badge */}
            {post.category && (
              <div className="absolute top-4 left-4 px-3 py-1 bg-purple-900/60 backdrop-blur-sm rounded-full border border-purple-500/30">
                <span className="text-sm">
                  {categoryIcons[post.category]} {post.category}
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 relative">
            {/* Decorative corner flourishes */}
            <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-amber-600/30 -translate-x-2 -translate-y-2" />
            <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-amber-600/30 translate-x-2 -translate-y-2" />
            
            <h3 className={`font-serif font-bold text-amber-100 mb-3 group-hover:text-amber-400 transition-colors ${featured ? 'text-2xl' : 'text-xl'}`}>
              {post.title}
            </h3>
            
            {post.excerpt && (
              <p className="text-gray-400 text-sm line-clamp-2 mb-4 leading-relaxed">
                {post.excerpt}
              </p>
            )}

            <div className="flex items-center justify-between text-xs text-gray-500">
              <span className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-600 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                  {post.author_name?.[0] || 'A'}
                </div>
                {post.author_name || 'Anonymous Wizard'}
              </span>
              <span>{format(new Date(post.created_date), 'MMM d, yyyy')}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}