import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { ArrowLeft, Clock, User, Tag, Sparkles, Share2, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import ReactMarkdown from 'react-markdown';

const categoryIcons = {
  "Spells & Charms": "✨",
  "Magical Creatures": "🐉",
  "Potions": "🧪",
  "Dark Arts Defense": "🛡️",
  "Wizarding World": "🏰",
  "Quidditch": "🧹",
  "Magical History": "📜",
};

export default function BlogPost() {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');

  const { data: post, isLoading } = useQuery({
    queryKey: ['post', postId],
    queryFn: async () => {
      const posts = await base44.entities.BlogPost.filter({ id: postId });
      return posts[0];
    },
    enabled: !!postId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-80 w-full rounded-2xl bg-purple-800/30 mb-8" />
          <Skeleton className="h-12 w-3/4 bg-purple-800/30 mb-4" />
          <Skeleton className="h-6 w-1/2 bg-purple-800/30 mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full bg-purple-800/30" />
            <Skeleton className="h-4 w-full bg-purple-800/30" />
            <Skeleton className="h-4 w-3/4 bg-purple-800/30" />
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-purple-900/30 mb-6">
            <BookOpen className="w-10 h-10 text-purple-400" />
          </div>
          <h2 className="font-serif text-2xl text-purple-200 mb-4">Tale Not Found</h2>
          <p className="text-purple-400 mb-6">This magical story seems to have vanished into thin air</p>
          <Link to={createPageUrl('Home')}>
            <Button className="bg-gradient-to-r from-purple-600 to-purple-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return Home
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6">
      <article className="max-w-4xl mx-auto">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link to={createPageUrl('AllPosts')}>
            <Button variant="ghost" className="text-purple-300 hover:text-amber-300 -ml-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Chronicles
            </Button>
          </Link>
        </motion.div>

        {/* Cover Image */}
        {post.cover_image && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative rounded-2xl overflow-hidden mb-10"
          >
            <img 
              src={post.cover_image} 
              alt={post.title}
              className="w-full h-80 sm:h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a15] via-transparent to-transparent" />
            
            {/* Category badge on image */}
            {post.category && (
              <div className="absolute bottom-6 left-6 px-4 py-2 bg-purple-900/60 backdrop-blur-sm rounded-full border border-purple-500/30">
                <span className="text-sm text-purple-200">
                  {categoryIcons[post.category]} {post.category}
                </span>
              </div>
            )}
          </motion.div>
        )}

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-10"
        >
          {post.featured && (
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 rounded-full border border-amber-500/30 mb-4">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span className="text-xs font-medium text-amber-300">Featured Tale</span>
            </div>
          )}
          
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-amber-100 mb-6 leading-tight">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-xl text-purple-200/70 mb-6 italic">
              {post.excerpt}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-6 text-sm text-purple-400">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-600 to-purple-600 flex items-center justify-center text-white font-bold">
                {post.author_name?.[0] || 'A'}
              </div>
              <div>
                <p className="text-purple-200 font-medium">{post.author_name || 'Anonymous Wizard'}</p>
                <p className="text-xs text-purple-400/70">Author</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{format(new Date(post.created_date), 'MMMM d, yyyy')}</span>
            </div>

            {!post.cover_image && post.category && (
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                <span>{post.category}</span>
              </div>
            )}
          </div>
        </motion.header>

        {/* Decorative divider */}
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
          <Sparkles className="w-5 h-5 text-amber-500/50" />
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative"
        >
          {/* Parchment-style content container */}
          <div className="relative rounded-2xl bg-gradient-to-br from-[#1a1525]/80 to-[#0d0a15]/80 border border-amber-900/20 p-8 sm:p-12">
            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-amber-600/20 -translate-x-2 -translate-y-2 rounded-tl-xl" />
            <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-amber-600/20 translate-x-2 -translate-y-2 rounded-tr-xl" />
            <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-amber-600/20 -translate-x-2 translate-y-2 rounded-bl-xl" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-amber-600/20 translate-x-2 translate-y-2 rounded-br-xl" />

            <div className="prose prose-lg prose-invert max-w-none
              prose-headings:font-serif prose-headings:text-amber-200
              prose-p:text-purple-100/90 prose-p:leading-relaxed
              prose-a:text-amber-400 prose-a:no-underline hover:prose-a:text-amber-300
              prose-strong:text-amber-300
              prose-blockquote:border-l-amber-500/50 prose-blockquote:bg-purple-900/20 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
              prose-code:bg-purple-900/50 prose-code:text-amber-300 prose-code:px-2 prose-code:py-1 prose-code:rounded
              prose-pre:bg-purple-950/50 prose-pre:border prose-pre:border-purple-700/30
              prose-ul:text-purple-100/90 prose-ol:text-purple-100/90
              prose-li:marker:text-amber-500"
            >
              <ReactMarkdown>
                {post.content}
              </ReactMarkdown>
            </div>
          </div>
        </motion.div>

        {/* Share section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 flex justify-center"
        >
          <Button
            variant="outline"
            className="border-purple-600/50 text-purple-300 hover:bg-purple-800/30 hover:text-purple-100"
            onClick={() => navigator.share?.({ title: post.title, url: window.location.href })}
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share this Tale
          </Button>
        </motion.div>

        {/* Decorative end flourish */}
        <div className="flex items-center justify-center gap-2 mt-16">
          <div className="w-2 h-2 rounded-full bg-amber-500/30" />
          <div className="w-3 h-3 rounded-full bg-amber-500/50" />
          <div className="w-2 h-2 rounded-full bg-amber-500/30" />
        </div>
      </article>
    </div>
  );
}