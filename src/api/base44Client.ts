// Mock data for blog posts
const mockPosts = [
  {
    id: '1',
    title: 'The Ancient Art of Wand Making',
    excerpt: 'Discover the secrets behind crafting the perfect magical wand, from selecting the wood to choosing the core.',
    content: `The art of wand making has been passed down through generations of skilled craftsmen. Each wand is unique, responding only to its true master.

The process begins with selecting the perfect wood - elder for wisdom, holly for protection, or willow for healing. The core is equally important: phoenix feather for power, unicorn hair for consistency, or dragon heartstring for potency.

A true wandmaker must possess not only skill but intuition, for it is the wand that chooses the wizard...`,
    category: 'Spells & Charms',
    featured: true,
    image_url: 'https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=800',
    author: 'Garrick Ollivander',
    created_date: '2024-12-20',
    reading_time: 8
  },
  {
    id: '2',
    title: 'Caring for Your Hippogriff',
    excerpt: 'A comprehensive guide to the proper care and handling of these majestic magical creatures.',
    content: `Hippogriffs are proud creatures that require respect and proper etiquette. When approaching, always bow first and wait for acknowledgment.

Their diet consists mainly of ferrets, but they also enjoy the occasional fish. Regular grooming of their feathers is essential for their well-being and flight capabilities.

Remember: never insult a hippogriff. These creatures have long memories and sharp talons...`,
    category: 'Magical Creatures',
    featured: true,
    image_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800',
    author: 'Rubeus Hagrid',
    created_date: '2024-12-18',
    reading_time: 6
  },
  {
    id: '3',
    title: 'Brewing the Perfect Polyjuice Potion',
    excerpt: 'Master the complex art of transformation potions with this detailed guide.',
    content: `The Polyjuice Potion is one of the most complex brews in the wizarding world. It takes a full month to prepare and requires rare ingredients.

Key ingredients include lacewing flies, leeches, powdered bicorn horn, and knotgrass. The final ingredient - a bit of the person you wish to become - is added just before drinking.

Warning: This potion is not meant for animal transformations. The consequences can be... hairy.`,
    category: 'Potions',
    featured: false,
    image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
    author: 'Horace Slughorn',
    created_date: '2024-12-15',
    reading_time: 12
  },
  {
    id: '4',
    title: 'Defense Against Dark Curses',
    excerpt: 'Learn essential defensive spells to protect yourself from the darkest magic.',
    content: `In these uncertain times, knowing how to defend yourself is crucial. The Patronus Charm, while difficult, is your best defense against Dementors.

Focus on your happiest memory - the stronger the memory, the more powerful your Patronus. With practice, you may even produce a corporeal form.

Other essential spells include Protego for blocking jinxes, Expelliarmus for disarming opponents, and Stupefy for incapacitating threats.`,
    category: 'Dark Arts Defense',
    featured: false,
    image_url: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800',
    author: 'Remus Lupin',
    created_date: '2024-12-12',
    reading_time: 10
  },
  {
    id: '5',
    title: 'A History of the Triwizard Tournament',
    excerpt: 'Explore the legendary competition that has united magical schools for centuries.',
    content: `The Triwizard Tournament was established approximately 700 years ago as a friendly competition between Hogwarts, Beauxbatons, and Durmstrang.

The tournament consists of three dangerous tasks designed to test magical ability, intelligence, and courage. Champions are chosen by the Goblet of Fire, an impartial judge that selects the most worthy competitor from each school.

Due to the high death toll, the tournament was discontinued for many years...`,
    category: 'Wizarding World',
    featured: false,
    image_url: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=800',
    author: 'Bathilda Bagshot',
    created_date: '2024-12-10',
    reading_time: 15
  },
  {
    id: '6',
    title: 'Quidditch Through the Ages',
    excerpt: 'From ancient broomstick games to modern professional leagues.',
    content: `Quidditch has evolved dramatically since its humble beginnings in the marshes of Queerditch. The sport has spread to every corner of the magical world.

Modern Quidditch features seven players: three Chasers, two Beaters, one Keeper, and one Seeker. The game ends only when the Golden Snitch is caught, awarding 150 points to the successful team.

Professional leagues now span the globe, with the Quidditch World Cup being the premier international event...`,
    category: 'Quidditch',
    featured: false,
    image_url: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800',
    author: 'Kennilworthy Whisp',
    created_date: '2024-12-08',
    reading_time: 9
  }
]

// Mock API client
export const base44 = {
  entities: {
    BlogPost: {
      list: async (_sortBy?: string, _limit?: number) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500))
        return mockPosts
      },
      get: async (id: string) => {
        await new Promise(resolve => setTimeout(resolve, 300))
        return mockPosts.find(post => post.id === id) || null
      },
      create: async (data: Partial<typeof mockPosts[0]>) => {
        await new Promise(resolve => setTimeout(resolve, 500))
        const newPost = {
          id: String(mockPosts.length + 1),
          created_date: new Date().toISOString().split('T')[0],
          reading_time: 5,
          featured: false,
          ...data
        }
        mockPosts.push(newPost as typeof mockPosts[0])
        return newPost
      }
    }
  }
}

