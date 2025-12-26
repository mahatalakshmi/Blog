import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { base44 } from '@/api/base44Client'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, User, Calendar, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

export default function BlogPost() {
  const { id } = useParams()

  const { data: post, isLoading } = useQuery({
    queryKey: ['post', id],
    queryFn: () => base44.entities.BlogPost.get(id!),
    enabled: !!id,
  })

  if (isLoading) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-8 w-32 mb-8" />
          <Skeleton className="h-64 w-full rounded-2xl mb-8" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center py-20">
          <h1 className="font-serif text-3xl text-purple-100 mb-4">Tale Not Found</h1>
          <p className="text-purple-400 mb-8">This magical story seems to have vanished into thin air...</p>
          <Link to="/">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6">
      <article className="max-w-4xl mx-auto">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link to="/posts">
            <Button variant="ghost" className="text-purple-300 hover:text-amber-300">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Chronicles
            </Button>
          </Link>
        </motion.div>

        {/* Hero Image */}
        {post.image_url && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative rounded-2xl overflow-hidden mb-8"
          >
            <img 
              src={post.image_url} 
              alt={post.title}
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-transparent to-transparent" />
            
            {/* Category badge */}
            <div className="absolute bottom-6 left-6">
              <span className="px-4 py-2 rounded-full text-sm font-medium bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-sm">
                {post.category}
              </span>
            </div>

            {post.featured && (
              <div className="absolute top-6 right-6">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/30 backdrop-blur-sm">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="text-amber-300 text-sm">Featured</span>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Title and Meta */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-purple-100 mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-purple-400">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(post.created_date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.reading_time} min read</span>
            </div>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent mb-8" />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-invert prose-purple max-w-none"
        >
          <p className="text-lg text-purple-200/80 leading-relaxed mb-6 italic">
            {post.excerpt}
          </p>
          
          <div className="text-purple-200/70 leading-relaxed space-y-6">
            {post.content.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 pt-8 border-t border-purple-700/30"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-amber-600 flex items-center justify-center">
                <span className="text-white font-serif font-bold text-lg">
                  {post.author.charAt(0)}
                </span>
              </div>
              <div>
                <p className="text-purple-100 font-medium">{post.author}</p>
                <p className="text-purple-400 text-sm">Magical Chronicler</p>
              </div>
            </div>
            
            <Link to="/posts">
              <Button variant="outline" className="border-purple-500/50 text-purple-200">
                More Tales
              </Button>
            </Link>
          </div>
        </motion.div>
      </article>
    </div>
  )
}

