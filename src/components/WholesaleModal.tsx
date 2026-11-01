import React, { useState } from 'react';
import { X, Globe2, ShieldAlert, Sparkles, Send, Phone, CheckCircle2, PackageCheck } from 'lucide-react';
import { BOUTIQUE_INFO, WHOLESALE_PERKS } from '../data/sarees';
import { generateWhatsAppWholesaleUrl } from '../utils/razorpay';

interface WholesaleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WholesaleModal: React.FC<WholesaleModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [quantity, setQuantity] = useState('10 to 25 Sarees');
  const [preferredWeaves, setPreferredWeaves] = useState('Korvai Kattam & Vaira Osi');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = generateWhatsAppWholesaleUrl({
      name,
      country,
      businessName,
      quantity,
      preferredWeaves,
      notes
    });
    window.open(url, '_blank');
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#C79A1E]/30 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#141210] text-[#FAF5E9] p-6 border-b border-[#C79A1E]/40 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#E3B93C] uppercase tracking-wider mb-2">
            <Globe2 className="w-4 h-4 text-[#E3B93C]" />
            <span>International Export & B2B Supply</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Worldwide Wholesale Handloom Supply
          </h3>

          <p className="text-xs sm:text-sm text-white/70 mt-1 max-w-lg leading-relaxed">
            Direct bulk export from our master pit looms in Kanadukathan, Karaikudi to boutiques, retail stores, dance academies, and bridal events across the globe.
          </p>

          {/* Strict No Cash on Delivery Notice */}
          <div className="mt-4 p-2.5 bg-amber-900/30 border border-[#E3B93C]/40 rounded-xl flex items-center gap-2 text-xs text-[#E3B93C]">
            <ShieldAlert className="w-4 h-4 text-[#E3B93C] shrink-0" />
            <span className="font-medium">
              Important: <strong>No Cash on Delivery (COD)</strong>. All domestic and international orders are 100% prepaid via Razorpay / Direct Bank Transfer.
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto text-[#141210]">
          {/* Wholesale Perks Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {WHOLESALE_PERKS.map((perk, i) => (
              <div key={i} className="p-3 bg-[#FAF5E9] rounded-xl border border-[#C79A1E]/20 text-center">
                <span className="text-[10px] font-bold text-[#996515] uppercase tracking-wider block">
                  {perk.highlight}
                </span>
                <p className="font-serif font-bold text-xs text-[#141210] mt-1">{perk.title}</p>
                <p className="text-[10px] text-[#141210]/60 mt-0.5 leading-snug">{perk.desc}</p>
              </div>
            ))}
          </div>

          {/* Export Countries Bar */}
          <div className="p-3.5 bg-white rounded-xl border border-[#141210]/10 flex items-center justify-between flex-wrap gap-2 text-xs">
            <div className="flex items-center gap-2 text-[#141210]">
              <PackageCheck className="w-4 h-4 text-[#C79A1E]" />
              <span className="font-semibold">Top Export Destinations:</span>
            </div>
            <span className="text-[#141210]/70">
              USA · UK · Malaysia · Singapore · Canada · UAE · South Africa · Sri Lanka · Australia · Europe
            </span>
          </div>

          {/* Inquiry Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <h4 className="font-serif font-bold text-base text-[#141210]">
              Wholesale / Bulk Inquiry Form
            </h4>

            <div className="grid sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#141210] mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Ramanathan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#141210]/20 rounded-lg text-xs focus:ring-1 focus:ring-[#C79A1E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#141210] mb-1">
                  Country & City *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kuala Lumpur, Malaysia or Dallas, USA"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#141210]/20 rounded-lg text-xs focus:ring-1 focus:ring-[#C79A1E] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#141210] mb-1">
                  Boutique / Store / Business Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sivaganga Silk House / Wedding Party"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#141210]/20 rounded-lg text-xs focus:ring-1 focus:ring-[#C79A1E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#141210] mb-1">
                  Estimated Quantity (Minimum Order: 10 Sarees) *
                </label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#141210]/20 rounded-lg text-xs focus:ring-1 focus:ring-[#C79A1E] focus:outline-none"
                >
                  <option value="10 to 25 Sarees">10 – 25 Sarees (Starter Wholesale)</option>
                  <option value="25 to 50 Sarees">25 – 50 Sarees (Boutique Tier)</option>
                  <option value="50 to 100 Sarees">50 – 100 Sarees (Volume Tier)</option>
                  <option value="100+ Sarees">100+ Sarees (Bulk Container / Air Cargo)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#141210] mb-1">
                Preferred Saree Categories
              </label>
              <input
                type="text"
                placeholder="e.g. Korvai Kattam, Rettapetta, Vaira Osi, Small Border..."
                value={preferredWeaves}
                onChange={(e) => setPreferredWeaves(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#141210]/20 rounded-lg text-xs focus:ring-1 focus:ring-[#C79A1E] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#141210] mb-1">
                Special Customization Notes (Colors, Motifs, Blouse Stitching)
              </label>
              <textarea
                rows={2}
                placeholder="Specific color requests, temple border motifs, or event deadline..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#141210]/20 rounded-lg text-xs focus:ring-1 focus:ring-[#C79A1E] focus:outline-none"
              />
            </div>

            {submitted && (
              <div className="flex items-center gap-2 p-3 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Redirecting to WhatsApp for instant quotation...</span>
              </div>
            )}

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="flex-1 py-3 bg-[#141210] text-[#E3B93C] hover:bg-[#C79A1E] hover:text-[#141210] rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Wholesale Inquiry via WhatsApp</span>
              </button>

              <a
                href={`tel:${BOUTIQUE_INFO.phone}`}
                className="py-3 px-4 border border-[#141210]/20 hover:border-[#141210] text-[#141210] rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#C79A1E]" />
                <span>Call {BOUTIQUE_INFO.phone}</span>
              </a>
            </div>
          </form>
        </div>

        {/* Footer info */}
        <div className="p-4 bg-[#FAF5E9] border-t border-[#C79A1E]/30 text-center text-[11px] text-[#141210]/70 flex items-center justify-center gap-2">
          <Sparkles className="w-3 h-3 text-[#C79A1E]" />
          <span>Handcrafted on Pit Looms at 58 A SM Nagar, Kanadukathan, Karaikudi Taluk · 100% Prepaid (No COD)</span>
        </div>
      </div>
    </div>
  );
};
