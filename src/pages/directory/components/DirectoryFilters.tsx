interface DirectoryFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedPricing: string;
  setSelectedPricing: (pricing: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  categories: string[];
  pricingOptions: string[];
  totalResults: number;
}

export default function DirectoryFilters({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedPricing,
  setSelectedPricing,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  categories,
  pricingOptions,
  totalResults
}: DirectoryFiltersProps) {
  return (
    <section className="py-6 sm:py-8 bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Bar */}
        <div className="mb-5 sm:mb-6">
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <i className="ri-search-line text-gray-400 text-lg"></i>
            </div>
            <input
              type="text"
              placeholder="Search apps, categories, or features..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 sm:pl-12 pr-4 py-3 sm:py-4 text-base sm:text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1F2853] focus:border-transparent outline-none transition-all duration-300 font-poppins"
            />
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
          {/* Filter Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex gap-3 sm:gap-4 items-stretch lg:items-center w-full lg:w-auto">
            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-8 text-sm font-medium text-gray-700 hover:border-gray-400 focus:ring-2 focus:ring-[#1F2853] focus:border-transparent outline-none transition-all duration-300 cursor-pointer font-poppins"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'All' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <i className="ri-arrow-down-s-line text-gray-400"></i>
              </div>
            </div>

            {/* Pricing Filter */}
            <div className="relative">
              <select
                value={selectedPricing}
                onChange={(e) => setSelectedPricing(e.target.value)}
                className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-8 text-sm font-medium text-gray-700 hover:border-gray-400 focus:ring-2 focus:ring-[#1F2853] focus:border-transparent outline-none transition-all duration-300 cursor-pointer font-poppins"
              >
                {pricingOptions.map(pricing => (
                  <option key={pricing} value={pricing}>
                    {pricing === 'All' ? 'All Pricing' : pricing}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <i className="ri-arrow-down-s-line text-gray-400"></i>
              </div>
            </div>

            {/* Sort By */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-8 text-sm font-medium text-gray-700 hover:border-gray-400 focus:ring-2 focus:ring-[#1F2853] focus:border-transparent outline-none transition-all duration-300 cursor-pointer font-poppins"
              >
                <option value="rating">Sort by Rating</option>
                <option value="reviews">Sort by Reviews</option>
                <option value="name">Sort by Name</option>
                <option value="featured">Sort by Featured</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <i className="ri-arrow-down-s-line text-gray-400"></i>
              </div>
            </div>
          </div>

          {/* View Controls and Results */}
          <div className="flex items-center justify-between lg:justify-start gap-3 sm:gap-4 w-full lg:w-auto">
            <span className="text-sm text-gray-600 font-medium font-poppins whitespace-nowrap">
              {totalResults} results
            </span>
            
            {/* View Mode Toggle */}
            <div className="flex bg-white border border-gray-300 rounded-lg overflow-hidden shrink-0">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 text-sm font-medium transition-colors cursor-pointer font-poppins ${
                  viewMode === 'grid'
                    ? 'bg-[#1F2853] text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-grid-line"></i>
                </div>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 text-sm font-medium transition-colors cursor-pointer font-poppins ${
                  viewMode === 'list'
                    ? 'bg-[#1F2853] text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-list-unordered"></i>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}