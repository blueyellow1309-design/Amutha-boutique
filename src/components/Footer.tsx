import React from 'react';
import { MapPin, Phone, MessageCircle, ShieldCheck } from 'lucide-react';
import { BOUTIQUE_INFO } from '../data/sarees';

interface FooterProps {
  onNavigate: (section: string) => void;
  onOpenSettings: () => void;
  onOpenWholesale: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenSettings, onOpenWholesale }) => {
  return (
    <footer className="bg-[#141210] text-[#FAF5E9] border-t border-[#C79A1E]/30 pt-12 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/10">
          {/* Brand & Address Column */}
          <div className="md:col-span-5 space-y-3">
            <h3 className="font-serif text-2xl font-bold text-white tracking-tight">
              {BOUTIQUE_INFO.name}
            </h3>
            <p className="text-xs text-[#E3B93C] font-medium tracking-wide">
              {BOUTIQUE_INFO.subBrand} · Authentic Chettinad Handloom
            </p>
            <p className="text-xs text-white/70 leading-relaxed max-w-sm">
              Dedicated to preserving the heritage weaves of Kanadukathan and Karaikudi. Every saree is woven on traditional wooden pit looms using pure combed cotton.
            </p>

            <div className="pt-2 text-xs text-white/80 space-y-1.5">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C79A1E] shrink-0 mt-0.5" />
                <span>
                  {BOUTIQUE_INFO.doorNo}, {BOUTIQUE_INFO.street}, {BOUTIQUE_INFO.town}, {BOUTIQUE_INFO.taluk}, {BOUTIQUE_INFO.district}, PIN: {BOUTIQUE_INFO.pincode}, {BOUTIQUE_INFO.state}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C79A1E] shrink-0" />
                <span>{BOUTIQUE_INFO.phone}</span>
              </div>
            </div>
          </div>

          {/* Saree Weaves Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#E3B93C]">
              Signature Weaves
            </h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li>
                <button onClick={() => onNavigate('collection')} className="hover:text-white transition-colors">
                  Korvai Kattam Sarees (₹1,500)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('collection')} className="hover:text-white transition-colors">
                  Korvai Handmade Putta (₹1,700)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('collection')} className="hover:text-white transition-colors">
                  Rettapetta Temple Weaves (₹1,400)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('collection')} className="hover:text-white transition-colors">
                  Vaira Osi Zari Stripes (₹2,100)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('collection')} className="hover:text-white transition-colors">
                  Meena Vaira Osi (₹2,100)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('collection')} className="hover:text-white transition-colors">
                  Small & Medium Border (₹1,200)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('collection')} className="hover:text-white transition-colors">
                  Rich Pallu Plain Butta (₹1,800)
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Navigation & Gateway */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#E3B93C]">
              Payment & Worldwide Wholesale
            </h4>
            <p className="text-xs text-white/70 leading-relaxed">
              <strong>100% Prepaid Orders Only (No Cash on Delivery)</strong>. Secure payment via Razorpay (UPI, RuPay, Visa, Mastercard). 
              We do <strong>Worldwide Wholesale</strong> to boutiques in USA, UK, Singapore, Malaysia, Canada & UAE.
            </p>

            <div className="pt-2 flex flex-wrap gap-2">
              <span className="px-2.5 py-1 bg-amber-900/60 text-[#E3B93C] rounded text-[11px] font-bold border border-[#E3B93C]/30">
                No Cash on Delivery
              </span>
              <span className="px-2.5 py-1 bg-white/10 rounded text-[11px] font-mono text-white/90">Razorpay Prepaid</span>
              <span className="px-2.5 py-1 bg-white/10 rounded text-[11px] font-mono text-white/90">UPI / QR</span>
              <span className="px-2.5 py-1 bg-white/10 rounded text-[11px] font-mono text-white/90">DHL / FedEx Export</span>
            </div>

            <div className="pt-3 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenWholesale}
                className="px-4 py-2 bg-[#C79A1E] hover:bg-[#E3B93C] text-[#141210] rounded-lg text-xs font-bold transition-colors shadow-sm"
              >
                Worldwide Wholesale
              </button>
              <a
                href={`https://wa.me/${BOUTIQUE_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
              <button
                onClick={onOpenSettings}
                className="text-xs text-white/50 hover:text-white transition-colors underline"
              >
                Setup
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
          <p>© {new Date().getFullYear()} {BOUTIQUE_INFO.name}. All prices in Indian Rupees (₹ INR).</p>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>256-Bit SSL Encrypted Razorpay Checkout · Kanadukathan Handlooms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
