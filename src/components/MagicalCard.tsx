import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, User, Sparkles } from 'lucide-react'

interface Post {
  id: string
  title: string
  excerpt: string
  category: string
  image_url?: string
  author: string
  created_date: string
  reading_time: number
  featured?: boolean
}

interface MagicalCardProps {
  post: Post
  featured?: boolean
}

export default function MagicalCard({ post, featured = false }: MagicalCardProps) {
  return (
    <Link to={`/post/${post.id}`}>
      <motion.article
        whileHover={{ y: -5, scale: 1.02 }}
        className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 ${
          featured 
            ? 'border-amber-500/30 bg-gradient-to-br from-purple-900/40 via-amber-900/20 to-purple-900/40' 
            : 'border-purple-700/30 bg-purple-900/20 hover:border-purple-500/50'
        }`}
      >
        {/* Glow effect */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
          featured ? 'bg-amber-500/5' : 'bg-purple-500/5'
        }`} />
        
        {/* Image */}
        {post.image_url && (
          <div className="relative h-48 overflow-hidden">
            <img 
              src={post.image_url} 
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900 via-transparent to-transparent" />
            
            {/* Category badge */}
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                featured 
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                  : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
              }`}>
                {post.category}
              </span>
            </div>

            {featured && (
              <div className="absolute top-4 right-4">
                <Sparkles className="w-5 h-5 text-amber-400" />
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          <h3 className={`font-serif text-xl font-semibold mb-2 transition-colors duration-300 ${
            featured 
              ? 'text-amber-100 group-hover:text-amber-300' 
              : 'text-purple-100 group-hover:text-amber-300'
          }`}>
            {post.title}
          </h3>
          
          <p className="text-purple-300/70 text-sm mb-4 line-clamp-2">
            {post.excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center justify-between text-xs text-purple-400">
            <div className="flex items-center gap-2">
              <User className="w-3 h-3" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3 h-3" />
              <span>{post.reading_time} min read</span>
            </div>
          </div>
        </div>

        {/* Bottom gradient line */}
        <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${
          featured 
            ? 'bg-gradient-to-r from-transparent via-amber-500 to-transparent' 
            : 'bg-gradient-to-r from-transparent via-purple-500 to-transparent'
        } opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      </motion.article>
    </Link>
  )
}

