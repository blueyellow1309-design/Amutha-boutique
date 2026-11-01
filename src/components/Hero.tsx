import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles, MapPin, Globe2, AlertCircle } from 'lucide-react';
import { BOUTIQUE_INFO } from '../data/sarees';

interface HeroProps {
  onExplore: () => void;
  onOpenStore: () => void;
  onOpenWholesale: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, onOpenStore, onOpenWholesale }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-14 lg:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Unboxed clean metadata kicker (no pills) */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wider text-[#C79A1E] uppercase mb-4">
              <span>Kanadukathan Looms</span>
              <span aria-hidden="true">·</span>
              <span>100% Prepaid (No COD)</span>
              <span aria-hidden="true">·</span>
              <span>Worldwide Wholesale Export</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#141210] leading-[1.15] tracking-tight">
              Woven by master looms, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B8860B] via-[#E3B93C] to-[#996515]">
                worn with grace.
              </span>
            </h1>

            <p className="mt-5 text-[#141210]/75 text-base sm:text-lg leading-relaxed max-w-xl">
              Authentic handwoven Chettinad cotton sarees from <strong>{BOUTIQUE_INFO.name}</strong>. 
              Feather-light, breathable 80s combed cotton adorned with timeless Korvai Kattam checks, 
              temple Rettapetta bands, and shimmering Vaira Osi gold needle borders.
            </p>

            {/* Price & Policy Banner */}
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-[#141210]/80">
              <span className="font-serif font-bold text-xl text-[#C79A1E]">Starting at ₹1,200</span>
              <span className="text-[#141210]/40">·</span>
              <span className="text-xs font-semibold text-amber-900 bg-amber-100/80 px-2.5 py-0.5 rounded flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 text-amber-800" />
                No Cash on Delivery (Prepaid Only)
              </span>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <button
                onClick={onExplore}
                className="px-6 py-3 bg-[#141210] text-[#FAF5E9] hover:bg-[#C79A1E] hover:text-[#141210] transition-colors rounded-lg font-medium text-sm sm:text-base flex items-center gap-2 shadow-md"
              >
                <span>Explore Saree Collection</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenWholesale}
                className="px-5 py-3 bg-[#C79A1E]/15 border border-[#C79A1E] hover:bg-[#C79A1E] text-[#141210] transition-colors rounded-lg font-semibold text-sm sm:text-base flex items-center gap-2"
              >
                <Globe2 className="w-4 h-4 text-[#996515]" />
                <span>Worldwide Wholesale</span>
              </button>

              <button
                onClick={onOpenStore}
                className="px-4 py-3 text-xs sm:text-sm font-medium text-[#141210]/75 hover:text-[#141210] flex items-center gap-1.5"
              >
                <MapPin className="w-4 h-4 text-[#C79A1E]" />
                <span>Kanadukathan Store</span>
              </button>
            </div>

            {/* Trust points */}
            <div className="mt-10 pt-6 border-t border-[#C79A1E]/20 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm text-[#141210]/70">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C79A1E] shrink-0" />
                <span>100% Prepaid · Safe Razorpay</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-[#C79A1E] shrink-0" />
                <span>Worldwide Wholesale Export</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C79A1E] shrink-0" />
                <span>Direct Pit Loom Prices</span>
              </div>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#C79A1E]/30 bg-[#F4EEDF]">
              <img
                src="/src/assets/images/hero_handloom_saree_1793512476919.jpg"
                alt="Chettinad handloom saree worn gracefully at a heritage mansion"
                className="w-full h-[400px] sm:h-[480px] lg:h-[520px] object-cover hover:scale-105 transition-transform duration-700 ease-out"
                loading="eager"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141210]/80 via-transparent to-transparent pointer-events-none" />
              
              {/* Overlay card for authenticity */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#FBF7F0]/95 backdrop-blur-sm border border-[#C79A1E]/40 text-[#141210]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-bold tracking-widest uppercase text-[#C79A1E]">Amutha Boutique Heritage</p>
                    <p className="font-serif font-semibold text-sm sm:text-base mt-0.5">Kanadukathan, Karaikudi</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] text-[#141210]/60">PIN 630103</p>
                    <p className="text-xs font-semibold text-[#141210]">Tamil Nadu, India</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
