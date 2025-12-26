import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { base44 } from '@/api/base44Client'
import { motion } from 'framer-motion'
import { Feather, Sparkles, Send, ImagePlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const categories = [
  "Spells & Charms",
  "Magical Creatures",
  "Potions",
  "Dark Arts Defense",
  "Wizarding World",
  "Quidditch",
  "Magical History"
]

export default function CreatePost() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: categories[0],
    author: '',
    image_url: '',
  })

  const mutation = useMutation({
    mutationFn: (data: typeof formData) => base44.entities.BlogPost.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      queryClient.invalidateQueries({ queryKey: ['allPosts'] })
      navigate('/posts')
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-900/30 border border-amber-500/30 mb-4">
            <Feather className="w-4 h-4 text-amber-400" />
            <span className="text-amber-300 text-sm">Enchanted Quill</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-purple-100 mb-4">
            Write Your <span className="text-amber-400">Tale</span>
          </h1>
          <p className="text-purple-300/70 max-w-xl mx-auto">
            Let your imagination flow and share your magical story with the wizarding world
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Title */}
          <div className="space-y-2">
            <label className="text-purple-200 text-sm font-medium flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Title of Your Tale
            </label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter a captivating title..."
              required
              className="bg-purple-900/20 border-purple-700/50"
            />
          </div>

          {/* Author */}
          <div className="space-y-2">
            <label className="text-purple-200 text-sm font-medium">Author Name</label>
            <Input
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Your wizarding name..."
              required
              className="bg-purple-900/20 border-purple-700/50"
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="text-purple-200 text-sm font-medium">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full h-10 rounded-lg border border-purple-700/50 bg-purple-900/30 px-3 py-2 text-sm text-purple-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50"
            >
              {categories.map(cat => (
                <option key={cat} value={cat} className="bg-purple-900">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Image URL */}
          <div className="space-y-2">
            <label className="text-purple-200 text-sm font-medium flex items-center gap-2">
              <ImagePlus className="w-4 h-4 text-purple-400" />
              Cover Image URL (optional)
            </label>
            <Input
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              placeholder="https://example.com/magical-image.jpg"
              className="bg-purple-900/20 border-purple-700/50"
            />
          </div>

          {/* Excerpt */}
          <div className="space-y-2">
            <label className="text-purple-200 text-sm font-medium">Brief Excerpt</label>
            <Textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              placeholder="A short, enchanting summary of your tale..."
              required
              className="bg-purple-900/20 border-purple-700/50 min-h-[80px]"
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <label className="text-purple-200 text-sm font-medium">Your Story</label>
            <Textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Begin weaving your magical tale here..."
              required
              className="bg-purple-900/20 border-purple-700/50 min-h-[300px]"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              disabled={mutation.isPending}
              size="lg"
              className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white px-8"
            >
              {mutation.isPending ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Enchanting...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Publish Tale
                </>
              )}
            </Button>
          </div>
        </motion.form>
      </div>
    </div>
  )
}

