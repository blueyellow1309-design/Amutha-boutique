import React, { useState, useMemo } from 'react';
import { Search, ShoppingBag, Eye, Zap, MessageCircle } from 'lucide-react';
import { Saree, SareeCategory } from '../types';
import { CATEGORIES, SAREES_DATA, BOUTIQUE_INFO } from '../data/sarees';
import { formatINR } from '../utils/razorpay';

interface CatalogProps {
  onSelectSaree: (saree: Saree) => void;
  onAddToCart: (saree: Saree) => void;
  onInstantBuy: (saree: Saree) => void;
}

export const Catalog: React.FC<CatalogProps> = ({
  onSelectSaree,
  onAddToCart,
  onInstantBuy
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredSarees = useMemo(() => {
    return SAREES_DATA.filter((saree) => {
      const matchCategory = selectedCategory === 'All' || saree.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchQuery =
        !query ||
        saree.name.toLowerCase().includes(query) ||
        saree.category.toLowerCase().includes(query) ||
        saree.description.toLowerCase().includes(query) ||
        saree.colorName.toLowerCase().includes(query);
      return matchCategory && matchQuery;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="collection" className="py-12 bg-[#F6EFE2]/60 border-t border-[#C79A1E]/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-semibold tracking-widest text-[#C79A1E] uppercase">
            Kanadukathan Handloom Weaves
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#141210] mt-2">
            Chettinad Cotton <span className="italic font-medium text-[#C79A1E]">Collection</span>
          </h2>
          <p className="text-[#141210]/70 text-sm sm:text-base mt-2">
            Every saree is hand-woven by artisan families in Sivaganga district. Pure combed cotton, featherweight drape, and authentic zari borders.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="space-y-4 mb-8">
          {/* Search Box */}
          <div className="max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-[#141210]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by weave, color, or motif (e.g. Korvai, Vaira Osi)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#141210]/20 rounded-lg text-sm text-[#141210] placeholder:text-[#141210]/40 focus:outline-none focus:ring-2 focus:ring-[#C79A1E]/50 focus:border-[#C79A1E]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#141210]/50 hover:text-[#141210]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs (Segmented functional buttons) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none justify-start md:justify-center px-1">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors ${
                selectedCategory === 'All'
                  ? 'bg-[#141210] text-[#E3B93C]'
                  : 'bg-white/80 border border-[#141210]/15 text-[#141210]/80 hover:border-[#C79A1E]'
              }`}
            >
              All Weaves ({SAREES_DATA.length})
            </button>
            {CATEGORIES.map((cat) => {
              const count = SAREES_DATA.filter((s) => s.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors ${
                    selectedCategory === cat
                      ? 'bg-[#141210] text-[#E3B93C]'
                      : 'bg-white/80 border border-[#141210]/15 text-[#141210]/80 hover:border-[#C79A1E]'
                  }`}
                >
                  {cat} {count > 0 && `(${count})`}
                </button>
              );
            })}
          </div>
        </div>

        {/* Count and policy indicator */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#141210]/70 mb-6 px-1 gap-2 border-b border-[#C79A1E]/15 pb-3">
          <span>Showing {filteredSarees.length} handloom saree{filteredSarees.length !== 1 ? 's' : ''}</span>
          <div className="flex items-center gap-3 text-[11px]">
            <span className="font-semibold text-amber-900 bg-amber-100/90 px-2 py-0.5 rounded">
              No Cash on Delivery (100% Prepaid Only)
            </span>
            <span className="text-[#996515] font-medium hidden md:inline">
              Worldwide Wholesale Export (MOQ: 10 Sarees)
            </span>
          </div>
        </div>

        {/* Sarees Grid */}
        {filteredSarees.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#C79A1E]/30 p-8">
            <p className="font-serif text-lg font-semibold text-[#141210]">No sarees match your filter</p>
            <p className="text-sm text-[#141210]/60 mt-1">Try selecting a different category or clearing search terms.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-[#141210] text-[#FAF5E9] rounded-lg text-xs font-medium hover:bg-[#C79A1E] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSarees.map((saree) => (
              <article
                key={saree.id}
                className="bg-white rounded-xl overflow-hidden border border-[#C79A1E]/25 shadow-sm hover:shadow-md transition-shadow flex flex-col group"
              >
                {/* Saree Image Container */}
                <div className="relative h-64 sm:h-72 overflow-hidden bg-[#FBF7F0]">
                  <img
                    src={saree.image}
                    alt={saree.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141210]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <button
                      onClick={() => onSelectSaree(saree)}
                      className="w-full py-2 bg-[#FAF5E9] text-[#141210] text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 shadow-sm hover:bg-[#E3B93C] transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Weave & Fabric Specs</span>
                    </button>
                  </div>

                  {/* Corner indicator */}
                  <div className="absolute top-3 left-3 bg-[#141210]/85 text-[#E3B93C] text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded">
                    Chettinad Loom
                  </div>
                </div>

                {/* Saree Content */}
                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    {/* Unboxed Metadata (Rule §1.A: No pills) */}
                    <div className="flex items-center gap-2 text-xs text-[#141210]/60 font-medium mb-1.5">
                      <span className="text-[#996515] font-semibold">{saree.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="truncate">{saree.borderType}</span>
                    </div>

                    <h3
                      onClick={() => onSelectSaree(saree)}
                      className="font-serif text-lg font-bold text-[#141210] hover:text-[#C79A1E] transition-colors cursor-pointer leading-snug line-clamp-1"
                    >
                      {saree.name}
                    </h3>

                    <p className="text-xs text-[#141210]/70 mt-2 line-clamp-2 leading-relaxed">
                      {saree.description}
                    </p>

                    {/* Color and fabric highlight */}
                    <div className="mt-3 flex items-center gap-2 text-xs text-[#141210]/80">
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: saree.colorHex }}
                        title={saree.colorName}
                      />
                      <span className="truncate">{saree.colorName}</span>
                    </div>
                  </div>

                  {/* Price & Action Row */}
                  <div className="mt-5 pt-4 border-t border-[#C79A1E]/15">
                    <div className="flex items-baseline justify-between mb-3">
                      <div>
                        <span className="text-xs text-[#141210]/50 block">Price in INR</span>
                        <span className="font-serif text-2xl font-bold text-[#141210] tabular-nums">
                          {formatINR(saree.price)}
                        </span>
                        {saree.altPrice && (
                          <span className="block text-[11px] text-[#C79A1E] font-medium">
                            Pure Zari option: {formatINR(saree.altPrice)}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-[#141210]/60">Free Tamil Nadu & All-India Shipping</span>
                    </div>

                    {/* Action buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onAddToCart(saree)}
                        className="py-2 px-3 border border-[#141210]/20 hover:border-[#141210] hover:bg-[#FAF5E9] text-[#141210] text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-[#C79A1E]" />
                        <span>Add to Bag</span>
                      </button>

                      <button
                        onClick={() => onInstantBuy(saree)}
                        className="py-2 px-3 bg-[#141210] text-[#E3B93C] hover:bg-[#C79A1E] hover:text-[#141210] text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                      >
                        <Zap className="w-3.5 h-3.5 fill-[#E3B93C]" />
                        <span>Razorpay Buy</span>
                      </button>
                    </div>

                    {/* Quick WhatsApp order link */}
                    <a
                      href={`https://wa.me/${BOUTIQUE_INFO.whatsappNumber}?text=${encodeURIComponent(
                        `Hello Amutha Boutique, I want to order the "${saree.name}" (${formatINR(saree.price)}) from your Kanadukathan store.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2.5 flex items-center justify-center gap-1.5 text-[11px] text-[#141210]/60 hover:text-emerald-700 transition-colors py-1"
                    >
                      <MessageCircle className="w-3 h-3 text-emerald-600" />
                      <span>Order directly on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
