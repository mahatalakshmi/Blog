import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, BookOpen, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import MagicalCard from '@/components/MagicalCard';

const categories = [
  "All",
  "Spells & Charms",
  "Magical Creatures",
  "Potions",
  "Dark Arts Defense",
  "Wizarding World",
  "Quidditch",
  "Magical History"
];

export default function AllPosts() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const { data: posts, isLoading } = useQuery({
    queryKey: ['allPosts'],
    queryFn: () => base44.entities.BlogPost.list('-created_date', 50),
  });

  const filteredPosts = posts?.filter(post => {
    const matchesSearch = post.title?.toLowerCase().includes(search.toLowerCase()) ||
                         post.excerpt?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }) || [];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-purple-900/30 border border-purple-500/30 mb-4">
            <BookOpen className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300 text-sm">Library of Magic</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-purple-100 mb-4">
            All <span className="text-amber-400">Chronicles</span>
          </h1>
          <p className="text-purple-300/70 max-w-xl mx-auto">
            Browse through our collection of magical tales, ancient wisdom, and mystical adventures
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-10"
        >
          {/* Search */}
          <div className="relative max-w-xl mx-auto mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
            <Input
              type="text"
              placeholder="Search for magical tales..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 py-6 bg-purple-900/20 border-purple-700/50 text-purple-100 placeholder:text-purple-400/50 rounded-xl focus:border-amber-500/50 focus:ring-amber-500/20"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "bg-gradient-to-r from-amber-600 to-amber-700 text-white border-amber-500"
                    : "border-purple-600/50 text-purple-300 hover:bg-purple-800/30 hover:text-purple-100 hover:border-purple-500"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Results count */}
        {!isLoading && (
          <div className="flex items-center gap-2 mb-6 text-purple-400 text-sm">
            <Sparkles className="w-4 h-4" />
            <span>{filteredPosts.length} magical {filteredPosts.length === 1 ? 'tale' : 'tales'} found</span>
          </div>
        )}

        {/* Posts Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded-xl bg-purple-900/20 border border-purple-700/30 p-6">
                <Skeleton className="h-48 w-full rounded-lg bg-purple-800/30 mb-4" />
                <Skeleton className="h-6 w-3/4 bg-purple-800/30 mb-2" />
                <Skeleton className="h-4 w-full bg-purple-800/30" />
              </div>
            ))}
          </div>
        ) : filteredPosts.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-purple-900/30 mb-6">
              <Search className="w-10 h-10 text-purple-400" />
            </div>
            <h3 className="font-serif text-2xl text-purple-200 mb-3">No Tales Found</h3>
            <p className="text-purple-400">Try adjusting your search or exploring different categories</p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <MagicalCard post={post} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}