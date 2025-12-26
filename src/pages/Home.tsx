import { useQuery } from '@tanstack/react-query'
import { base44 } from '@/api/base44Client'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { createPageUrl } from '@/utils'
import { Sparkles, ArrowRight, BookOpen, Feather, Stars } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import MagicalCard from '@/components/MagicalCard'

export default function Home() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: () => base44.entities.BlogPost.list('-created_date', 10),
  })

  const featuredPosts = posts?.filter(p => p.featured) || []
  const recentPosts = posts?.filter(p => !p.featured).slice(0, 6) || []

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative inline-block mb-8"
          >
            <div className="absolute inset-0 bg-amber-500/20 blur-3xl rounded-full" />
            <div className="relative flex items-center justify-center gap-2 px-6 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-amber-300 text-sm tracking-wider uppercase">Welcome to the Wizarding World</span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-5xl sm:text-7xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent">
              Enchanted
            </span>
            <br />
            <span className="text-purple-100">Chronicles</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-purple-200/70 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Discover magical tales, ancient spells, and mystical creatures. 
            Your journey into the wizarding world begins here.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to={createPageUrl('AllPosts')}>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white border border-amber-500/50 shadow-lg shadow-amber-500/20 px-8"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Explore Stories
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to={createPageUrl('CreatePost')}>
              <Button 
                size="lg" 
                variant="outline"
                className="border-purple-500/50 text-purple-200 hover:bg-purple-500/20 hover:text-purple-100 px-8"
              >
                <Feather className="w-5 h-5 mr-2" />
                Write Your Tale
              </Button>
            </Link>
          </motion.div>
        </div>

        <div className="absolute top-20 left-10 opacity-20">
          <Stars className="w-8 h-8 text-amber-400 animate-pulse" />
        </div>
        <div className="absolute bottom-20 right-10 opacity-20">
          <Sparkles className="w-10 h-10 text-purple-400 animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      </section>

      {/* Featured Posts Section */}
      {featuredPosts.length > 0 && (
        <section className="py-16 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-10">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
              <h2 className="font-serif text-2xl text-amber-300 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Featured Tales
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {featuredPosts.slice(0, 2).map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <MagicalCard post={post} featured />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent Posts Section */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-serif text-2xl text-purple-100">Recent Chronicles</h2>
            <Link to={createPageUrl('AllPosts')}>
              <Button variant="ghost" className="text-purple-300 hover:text-amber-300">
                View All <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-xl bg-purple-900/20 border border-purple-700/30 p-6">
                  <Skeleton className="h-48 w-full rounded-lg bg-purple-800/30 mb-4" />
                  <Skeleton className="h-6 w-3/4 bg-purple-800/30 mb-2" />
                  <Skeleton className="h-4 w-full bg-purple-800/30" />
                </div>
              ))}
            </div>
          ) : posts?.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-purple-900/30 mb-6">
                <Feather className="w-10 h-10 text-purple-400" />
              </div>
              <h3 className="font-serif text-2xl text-purple-200 mb-3">No Tales Yet</h3>
              <p className="text-purple-400 mb-6">Be the first to enchant us with your story</p>
              <Link to={createPageUrl('CreatePost')}>
                <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600">
                  <Feather className="w-4 h-4 mr-2" />
                  Write the First Tale
                </Button>
              </Link>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <MagicalCard post={post} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 via-amber-900/30 to-purple-900/50" />
            <div className="absolute inset-0 backdrop-blur-sm" />
            <div className="absolute inset-0 rounded-2xl border border-amber-500/20" />
            
            <div className="relative p-12 text-center">
              <Feather className="w-12 h-12 text-amber-400 mx-auto mb-6" />
              <h2 className="font-serif text-3xl text-amber-100 mb-4">
                Have a Magical Tale to Share?
              </h2>
              <p className="text-purple-200/70 mb-8 max-w-xl mx-auto">
                Pick up your enchanted quill and let your words weave magic. 
                Every great wizard started with a single spell.
              </p>
              <Link to={createPageUrl('CreatePost')}>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white"
                >
                  Begin Writing
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

