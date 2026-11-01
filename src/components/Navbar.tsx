import React from 'react';
import { ShoppingBag, Sparkles, Globe2 } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  activeSection: string;
  onNavigate: (section: string) => void;
  onOpenSettings: () => void;
  onOpenWholesale: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  activeSection,
  onNavigate,
  onOpenSettings,
  onOpenWholesale
}) => {
  return (
    <>
      {/* Top Heritage Ribbon */}
      <div className="bg-[#141210] text-[#E3B93C] text-[11px] tracking-wider uppercase font-medium py-1.5 px-4 border-b border-[#C79A1E]/30 flex flex-wrap items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <Sparkles className="w-3 h-3 text-[#E3B93C]" />
          <span>Chettinad Handlooms · 100% Prepaid (No COD) · Worldwide Wholesale Supply</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-white/80">
          <button
            onClick={onOpenWholesale}
            className="hover:text-[#E3B93C] transition-colors flex items-center gap-1 font-semibold text-[#E3B93C]"
          >
            <Globe2 className="w-3 h-3" />
            <span>Worldwide Wholesale Export</span>
          </button>
          <span>·</span>
          <a
            href="tel:+919345998758"
            className="hover:text-[#E3B93C] transition-colors"
          >
            Call: +91 93459 98758
          </a>
        </div>
      </div>

      {/* Main Header complying with Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-[#FBF7F0]/95 backdrop-blur-md border-b border-[#C79A1E]/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Brand wordmark */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-left group whitespace-nowrap shrink-0 focus:outline-none"
          >
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#141210]">
              Amutha <span className="text-[#C79A1E] font-medium italic">Boutique</span>
            </span>
          </button>

          {/* Zone 2: 4-5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#141210]/75">
            <button
              onClick={() => onNavigate('home')}
              className={`hover:text-[#C79A1E] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activeSection === 'home' ? 'border-[#C79A1E] text-[#141210] font-semibold' : 'border-transparent'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('collection')}
              className={`hover:text-[#C79A1E] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activeSection === 'collection' ? 'border-[#C79A1E] text-[#141210] font-semibold' : 'border-transparent'
              }`}
            >
              Collection
            </button>
            <button
              onClick={() => onNavigate('heritage')}
              className={`hover:text-[#C79A1E] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activeSection === 'heritage' ? 'border-[#C79A1E] text-[#141210] font-semibold' : 'border-transparent'
              }`}
            >
              Heritage
            </button>
            <button
              onClick={() => onNavigate('location')}
              className={`hover:text-[#C79A1E] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activeSection === 'location' ? 'border-[#C79A1E] text-[#141210] font-semibold' : 'border-transparent'
              }`}
            >
              Kanadukathan Store
            </button>
            <button
              onClick={onOpenWholesale}
              className="hover:text-[#C79A1E] text-[#996515] font-semibold transition-colors whitespace-nowrap shrink-0 py-1 flex items-center gap-1"
            >
              <Globe2 className="w-3.5 h-3.5 text-[#C79A1E]" />
              <span>Wholesale Worldwide</span>
            </button>
            <button
              onClick={onOpenSettings}
              className="text-xs text-[#141210]/60 hover:text-[#C79A1E] transition-colors whitespace-nowrap shrink-0"
              title="Razorpay Gateway Settings"
            >
              Payment Setup
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2.5 px-4 py-2 bg-[#141210] text-[#FAF5E9] hover:bg-[#C79A1E] hover:text-[#141210] transition-colors rounded-lg font-medium text-sm whitespace-nowrap shrink-0 shadow-sm"
              aria-label="View shopping bag"
            >
              <ShoppingBag className="w-4 h-4 text-[#E3B93C]" />
              <span className="hidden sm:inline">Shopping Bag</span>
              <span className="bg-[#C79A1E] text-[#141210] font-bold text-xs px-2 py-0.5 rounded-full tabular-nums">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
