import { useState } from 'react';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import DirectoryHero from './components/DirectoryHero';
import DirectoryFilters from './components/DirectoryFilters';
import DirectoryGrid from './components/DirectoryGrid';
import type { App } from './types';

// Mock data for apps
const mockApps: App[] = [
  {
    id: 1,
    name: "UX Pilot",
    description: "Advanced AI conversational assistant that helps streamline customer support and automate responses with natural language processing.",
    category: "AI Tools",
    rating: 4.9,
    reviews: 2847,
    pricing: "Freemium",
    featured: true,
    tags: ["AI", "Customer Support", "Automation"],
    logo: "https://readdy.ai/api/search-image?query=modern%20AI%20assistant%20logo%20with%20blue%20and%20white%20colors%2C%20clean%20minimalist%20design%2C%20technology%20focused%20branding&width=80&height=80&seq=1&orientation=squarish"
  },
  {
    id: 2,
    name: "Midjourney",
    description: "AI-powered image generation tool that creates stunning artwork and designs from text prompts with incredible detail and creativity.",
    category: "Design",
    rating: 4.7,
    reviews: 5632,
    pricing: "Paid",
    featured: true,
    tags: ["AI", "Image Generation", "Creative"],
    logo: "https://readdy.ai/api/search-image?query=creative%20design%20tool%20logo%20with%20purple%20and%20pink%20gradient%20colors%2C%20artistic%20and%20modern%20branding%20for%20image%20generation&width=80&height=80&seq=2&orientation=squarish"
  },
  {
    id: 3,
    name: "Notion AI",
    description: "Smart workspace with AI features that enhances productivity through intelligent note-taking, task management, and content creation.",
    category: "Productivity",
    rating: 4.5,
    reviews: 8921,
    pricing: "Freemium",
    featured: false,
    tags: ["Productivity", "AI", "Workspace"],
    logo: "https://readdy.ai/api/search-image?query=productivity%20workspace%20logo%20with%20clean%20black%20and%20white%20design%2C%20minimalist%20office%20tool%20branding&width=80&height=80&seq=3&orientation=squarish"
  },
  {
    id: 4,
    name: "ChatGPT Plus",
    description: "Enhanced conversational AI platform offering advanced language capabilities, faster responses, and priority access to new features.",
    category: "AI Tools",
    rating: 4.8,
    reviews: 12456,
    pricing: "Paid",
    featured: true,
    tags: ["AI", "Conversation", "Language"],
    logo: "https://readdy.ai/api/search-image?query=conversational%20AI%20logo%20with%20green%20and%20teal%20colors%2C%20modern%20chat%20interface%20branding%2C%20technology%20focused&width=80&height=80&seq=4&orientation=squarish"
  },
  {
    id: 5,
    name: "Figma AI",
    description: "Design collaboration platform with AI assistance for creating user interfaces, prototypes, and design systems efficiently.",
    category: "Design",
    rating: 4.6,
    reviews: 6789,
    pricing: "Freemium",
    featured: false,
    tags: ["Design", "Collaboration", "UI/UX"],
    logo: "https://readdy.ai/api/search-image?query=design%20collaboration%20tool%20logo%20with%20orange%20and%20red%20gradient%2C%20creative%20interface%20design%20branding&width=80&height=80&seq=5&orientation=squarish"
  },
  {
    id: 6,
    name: "Zapier",
    description: "Automation platform that connects different apps and services to create powerful workflows without coding knowledge required.",
    category: "Automation",
    rating: 4.4,
    reviews: 4321,
    pricing: "Freemium",
    featured: false,
    tags: ["Automation", "Integration", "Workflow"],
    logo: "https://readdy.ai/api/search-image?query=automation%20workflow%20logo%20with%20blue%20and%20orange%20colors%2C%20connection%20and%20integration%20focused%20branding&width=80&height=80&seq=6&orientation=squarish"
  },
  {
    id: 7,
    name: "Canva Pro",
    description: "Professional design platform with AI-powered features for creating graphics, presentations, social media content, and marketing materials.",
    category: "Design",
    rating: 4.3,
    reviews: 9876,
    pricing: "Freemium",
    featured: false,
    tags: ["Design", "Graphics", "Marketing"],
    logo: "https://readdy.ai/api/search-image?query=graphic%20design%20platform%20logo%20with%20colorful%20rainbow%20gradient%2C%20creative%20and%20vibrant%20branding%20for%20design%20tools&width=80&height=80&seq=7&orientation=squarish"
  },
  {
    id: 8,
    name: "Slack AI",
    description: "Team communication platform enhanced with AI capabilities for smart message summarization, automated responses, and workflow optimization.",
    category: "Communication",
    rating: 4.2,
    reviews: 7654,
    pricing: "Freemium",
    featured: false,
    tags: ["Communication", "Team", "AI"],
    logo: "https://readdy.ai/api/search-image?query=team%20communication%20logo%20with%20purple%20and%20white%20colors%2C%20modern%20messaging%20app%20branding%2C%20professional%20design&width=80&height=80&seq=8&orientation=squarish"
  },
  {
    id: 9,
    name: "Grammarly",
    description: "AI-powered writing assistant that helps improve grammar, style, tone, and clarity in all your written communications.",
    category: "Writing",
    rating: 4.1,
    reviews: 11234,
    pricing: "Freemium",
    featured: false,
    tags: ["Writing", "AI", "Grammar"],
    logo: "https://readdy.ai/api/search-image?query=writing%20assistant%20logo%20with%20green%20and%20white%20colors%2C%20clean%20educational%20tool%20branding%2C%20text%20focused%20design&width=80&height=80&seq=9&orientation=squarish"
  },
  {
    id: 10,
    name: "Loom",
    description: "Video messaging platform that enables quick screen recording and sharing for better communication and collaboration.",
    category: "Communication",
    rating: 4.0,
    reviews: 3456,
    pricing: "Freemium",
    featured: false,
    tags: ["Video", "Recording", "Communication"],
    logo: "https://readdy.ai/api/search-image?query=video%20recording%20platform%20logo%20with%20purple%20and%20pink%20gradient%2C%20modern%20video%20tool%20branding%2C%20communication%20focused&width=80&height=80&seq=10&orientation=squarish"
  },
  {
    id: 11,
    name: "Airtable",
    description: "Flexible database platform that combines the simplicity of a spreadsheet with the power of a database for project management.",
    category: "Productivity",
    rating: 4.4,
    reviews: 5678,
    pricing: "Freemium",
    featured: false,
    tags: ["Database", "Productivity", "Organization"],
    logo: "https://readdy.ai/api/search-image?query=database%20management%20logo%20with%20blue%20and%20yellow%20colors%2C%20organized%20data%20tool%20branding%2C%20professional%20design&width=80&height=80&seq=11&orientation=squarish"
  },
  {
    id: 12,
    name: "Calendly",
    description: "Scheduling automation tool that eliminates back-and-forth emails by letting people book time with you based on your availability.",
    category: "Automation",
    rating: 4.3,
    reviews: 4567,
    pricing: "Freemium",
    featured: false,
    tags: ["Scheduling", "Automation", "Calendar"],
    logo: "https://readdy.ai/api/search-image?query=scheduling%20calendar%20logo%20with%20blue%20and%20white%20colors%2C%20clean%20appointment%20booking%20tool%20branding&width=80&height=80&seq=12&orientation=squarish"
  }
];

export default function DirectoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPricing, setSelectedPricing] = useState('All');
  const [sortBy, setSortBy] = useState('rating');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter and sort apps
  const filteredApps = mockApps
    .filter(app => {
      const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           app.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           app.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || app.category === selectedCategory;
      const matchesPricing = selectedPricing === 'All' || app.pricing === selectedPricing;
      
      return matchesSearch && matchesCategory && matchesPricing;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'reviews':
          return b.reviews - a.reviews;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'featured':
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        default:
          return 0;
      }
    });

  const categories = ['All', ...Array.from(new Set(mockApps.map(app => app.category)))];
  const pricingOptions = ['All', 'Free', 'Freemium', 'Paid'];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="overflow-x-hidden">
        <DirectoryHero />
        
        <DirectoryFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedPricing={selectedPricing}
          setSelectedPricing={setSelectedPricing}
          sortBy={sortBy}
          setSortBy={setSortBy}
          viewMode={viewMode}
          setViewMode={setViewMode}
          categories={categories}
          pricingOptions={pricingOptions}
          totalResults={filteredApps.length}
        />
        
        <DirectoryGrid
          apps={filteredApps}
          viewMode={viewMode}
        />
      </main>
      
      <Footer />
    </div>
  );
}