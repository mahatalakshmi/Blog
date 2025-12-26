import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { Feather, Sparkles, Image, Wand2, Send, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import ReactMarkdown from 'react-markdown';

const categories = [
  "Spells & Charms",
  "Magical Creatures",
  "Potions",
  "Dark Arts Defense",
  "Wizarding World",
  "Quidditch",
  "Magical History"
];

export default function CreatePost() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showPreview, setShowPreview] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    cover_image: '',
    category: '',
    author_name: '',
    featured: false,
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.BlogPost.create(data),
    onSuccess: (newPost) => {
      queryClient.invalidateQueries(['posts']);
      toast.success('Your magical tale has been published!');
      navigate(createPageUrl('BlogPost') + `?id=${newPost.id}`);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      toast.error('Please fill in the title and content');
      return;
    }
    createMutation.mutate(formData);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 mb-4">
            <Feather className="w-4 h-4 text-amber-400" />
            <span className="text-amber-300 text-sm">Create Magic</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-purple-100 mb-4">
            Write Your <span className="text-amber-400">Tale</span>
          </h1>
          <p className="text-purple-300/70">
            Let your enchanted quill weave stories that captivate the wizarding world
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          {/* Main form card */}
          <div className="relative rounded-2xl bg-gradient-to-br from-[#1a1525]/90 to-[#0d0a15]/90 border border-purple-700/30 p-8">
            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-amber-600/30 -translate-x-1 -translate-y-1 rounded-tl-xl" />
            <div className="absolute top-0 right-0 w-12 h-12 border-r-2 border-t-2 border-amber-600/30 translate-x-1 -translate-y-1 rounded-tr-xl" />

            <div className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label className="text-purple-200 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Title *
                </Label>
                <Input
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="Enter your enchanting title..."
                  className="bg-purple-900/30 border-purple-600/50 text-purple-100 placeholder:text-purple-400/50 focus:border-amber-500/50 focus:ring-amber-500/20 text-lg py-6"
                />
              </div>

              {/* Excerpt */}
              <div className="space-y-2">
                <Label className="text-purple-200">Short Excerpt</Label>
                <Textarea
                  value={formData.excerpt}
                  onChange={(e) => handleChange('excerpt', e.target.value)}
                  placeholder="A brief preview to entice readers..."
                  rows={2}
                  className="bg-purple-900/30 border-purple-600/50 text-purple-100 placeholder:text-purple-400/50 focus:border-amber-500/50 resize-none"
                />
              </div>

              {/* Two column layout */}
              <div className="grid sm:grid-cols-2 gap-6">
                {/* Category */}
                <div className="space-y-2">
                  <Label className="text-purple-200">Category</Label>
                  <Select value={formData.category} onValueChange={(val) => handleChange('category', val)}>
                    <SelectTrigger className="bg-purple-900/30 border-purple-600/50 text-purple-100 focus:ring-amber-500/20">
                      <SelectValue placeholder="Choose a category" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1525] border-purple-700/50">
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat} className="text-purple-200 focus:bg-purple-800/50 focus:text-amber-300">
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Author */}
                <div className="space-y-2">
                  <Label className="text-purple-200">Author Name</Label>
                  <Input
                    value={formData.author_name}
                    onChange={(e) => handleChange('author_name', e.target.value)}
                    placeholder="Your wizarding name..."
                    className="bg-purple-900/30 border-purple-600/50 text-purple-100 placeholder:text-purple-400/50 focus:border-amber-500/50"
                  />
                </div>
              </div>

              {/* Cover Image */}
              <div className="space-y-2">
                <Label className="text-purple-200 flex items-center gap-2">
                  <Image className="w-4 h-4 text-amber-400" />
                  Cover Image URL
                </Label>
                <Input
                  value={formData.cover_image}
                  onChange={(e) => handleChange('cover_image', e.target.value)}
                  placeholder="https://example.com/magical-image.jpg"
                  className="bg-purple-900/30 border-purple-600/50 text-purple-100 placeholder:text-purple-400/50 focus:border-amber-500/50"
                />
                {formData.cover_image && (
                  <div className="mt-3 rounded-xl overflow-hidden border border-purple-700/30">
                    <img src={formData.cover_image} alt="Preview" className="w-full h-48 object-cover" />
                  </div>
                )}
              </div>

              {/* Featured toggle */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-purple-900/20 border border-purple-700/30">
                <div>
                  <Label className="text-purple-200">Featured Tale</Label>
                  <p className="text-sm text-purple-400">Display this prominently on the home page</p>
                </div>
                <Switch
                  checked={formData.featured}
                  onCheckedChange={(checked) => handleChange('featured', checked)}
                  className="data-[state=checked]:bg-amber-600"
                />
              </div>
            </div>
          </div>

          {/* Content Editor */}
          <div className="relative rounded-2xl bg-gradient-to-br from-[#1a1525]/90 to-[#0d0a15]/90 border border-purple-700/30 p-8">
            <div className="flex items-center justify-between mb-4">
              <Label className="text-purple-200 flex items-center gap-2 text-lg">
                <Wand2 className="w-5 h-5 text-amber-400" />
                Your Story * (Markdown supported)
              </Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
                className="text-purple-300 hover:text-amber-300"
              >
                <Eye className="w-4 h-4 mr-2" />
                {showPreview ? 'Edit' : 'Preview'}
              </Button>
            </div>

            {showPreview ? (
              <div className="min-h-[400px] p-6 rounded-xl bg-purple-900/20 border border-purple-700/30">
                <div className="prose prose-invert max-w-none
                  prose-headings:font-serif prose-headings:text-amber-200
                  prose-p:text-purple-100/90
                  prose-a:text-amber-400
                  prose-strong:text-amber-300
                  prose-blockquote:border-l-amber-500/50"
                >
                  <ReactMarkdown>{formData.content || '*Your magical content will appear here...*'}</ReactMarkdown>
                </div>
              </div>
            ) : (
              <Textarea
                value={formData.content}
                onChange={(e) => handleChange('content', e.target.value)}
                placeholder="Begin your enchanting tale here... 

You can use Markdown:
# Heading 1
## Heading 2
**bold text**
*italic text*
- bullet points
> blockquotes"
                rows={16}
                className="bg-purple-900/20 border-purple-600/50 text-purple-100 placeholder:text-purple-400/40 focus:border-amber-500/50 resize-none font-mono text-sm"
              />
            )}
          </div>

          {/* Submit button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex justify-end"
          >
            <Button
              type="submit"
              disabled={createMutation.isPending}
              className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white px-8 py-6 text-lg shadow-lg shadow-amber-500/20"
            >
              {createMutation.isPending ? (
                <>
                  <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                  Casting Spell...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Publish Tale
                </>
              )}
            </Button>
          </motion.div>
        </motion.form>
      </div>
    </div>
  );
}