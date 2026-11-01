import React, { useState } from 'react';
import { X, ShoppingBag, Zap, ShieldCheck, Check, Sparkles, MessageCircle } from 'lucide-react';
import { Saree } from '../types';
import { formatINR } from '../utils/razorpay';
import { BOUTIQUE_INFO } from '../data/sarees';

interface ProductDetailModalProps {
  saree: Saree | null;
  onClose: () => void;
  onAddToCart: (saree: Saree, quantity: number) => void;
  onInstantBuy: (saree: Saree, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  saree,
  onClose,
  onAddToCart,
  onInstantBuy
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<'standard' | 'pure_zari'>('standard');

  if (!saree) return null;

  const currentPrice = selectedVariant === 'pure_zari' && saree.altPrice ? saree.altPrice : saree.price;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-[#C79A1E]/30 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 border border-black/10 flex items-center justify-center text-[#141210] hover:bg-[#141210] hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid md:grid-cols-2">
          {/* Left Column: Image & Authenticity seal */}
          <div className="relative bg-[#FAF5E9] h-[340px] md:h-full min-h-[380px]">
            <img
              src={saree.image}
              alt={saree.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-[#141210]/90 backdrop-blur-sm text-[#FAF5E9] p-3 rounded-xl border border-[#C79A1E]/40 text-xs">
              <div className="flex items-center gap-2 text-[#E3B93C] font-semibold uppercase tracking-wider text-[10px]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Handcrafted in Kanadukathan</span>
              </div>
              <p className="mt-1 text-white/80 text-[11px]">
                Woven on traditional pit-looms by Karaikudi handloom masters with 100% natural dyed cotton yarn.
              </p>
            </div>
          </div>

          {/* Right Column: Saree Details & Contiguous Purchase Module */}
          <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              {/* Unboxed Metadata */}
              <div className="flex items-center gap-2 text-xs text-[#141210]/60 font-medium mb-1">
                <span className="text-[#996515] font-semibold">{saree.category}</span>
                <span aria-hidden="true">·</span>
                <span>{saree.borderType}</span>
              </div>

              <h2 className="font-serif text-2xl font-bold text-[#141210] leading-snug">
                {saree.name}
              </h2>

              {/* Price display */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="font-serif text-3xl font-bold text-[#141210] tabular-nums">
                  {formatINR(currentPrice)}
                </span>
                <span className="text-xs text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                  Inclusive of all taxes
                </span>
              </div>

              {/* Variant selector if altPrice exists (e.g. Rich Pallu Cotton vs Pure Zari Bridal) */}
              {saree.altPrice && (
                <div className="mt-4 p-3 bg-[#FAF5E9] rounded-xl border border-[#C79A1E]/30">
                  <p className="text-xs font-semibold text-[#141210] mb-2">Select Weave Finish:</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedVariant('standard')}
                      className={`p-2 rounded-lg text-left text-xs border transition-colors ${
                        selectedVariant === 'standard'
                          ? 'border-[#141210] bg-white font-semibold text-[#141210]'
                          : 'border-black/10 bg-white/60 text-[#141210]/70'
                      }`}
                    >
                      <span>Handloom Cotton</span>
                      <span className="block font-bold mt-0.5">{formatINR(saree.price)}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedVariant('pure_zari')}
                      className={`p-2 rounded-lg text-left text-xs border transition-colors ${
                        selectedVariant === 'pure_zari'
                          ? 'border-[#141210] bg-white font-semibold text-[#141210]'
                          : 'border-black/10 bg-white/60 text-[#141210]/70'
                      }`}
                    >
                      <span>Royal Pure Zari</span>
                      <span className="block font-bold mt-0.5 text-[#C79A1E]">{formatINR(saree.altPrice)}</span>
                    </button>
                  </div>
                </div>
              )}

              <p className="mt-4 text-xs sm:text-sm text-[#141210]/75 leading-relaxed">
                {saree.description}
              </p>

              {/* Fabric Specs Grid */}
              <div className="mt-5 space-y-2.5 text-xs text-[#141210]/80 bg-[#FAF5E9]/70 p-4 rounded-xl border border-[#C79A1E]/20">
                <div className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#C79A1E] mt-0.5 shrink-0" />
                  <div>
                    <strong>Fabric Composition:</strong> {saree.fabric}
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#C79A1E] mt-0.5 shrink-0" />
                  <div>
                    <strong>Weave Structure:</strong> {saree.weaveDetail}
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#C79A1E] mt-0.5 shrink-0" />
                  <div>
                    <strong>Blouse Piece:</strong> {saree.blousePiece}
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#C79A1E] mt-0.5 shrink-0" />
                  <div>
                    <strong>Dimensions:</strong> 6.2 Metres total length (5.4m Saree + 0.8m Blouse)
                  </div>
                </div>
              </div>

              {/* Quantity selector */}
              <div className="mt-5 flex items-center justify-between">
                <span className="text-xs font-medium text-[#141210]">Quantity:</span>
                <div className="flex items-center border border-[#141210]/20 rounded-lg overflow-hidden bg-white">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1 text-sm font-semibold hover:bg-[#FAF5E9] transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 text-xs font-semibold tabular-nums">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                    className="px-3 py-1 text-sm font-semibold hover:bg-[#FAF5E9] transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-6 pt-4 border-t border-[#C79A1E]/20 space-y-2.5">
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => {
                    onAddToCart(saree, quantity);
                    onClose();
                  }}
                  className="py-3 px-4 border border-[#141210] text-[#141210] hover:bg-[#FAF5E9] text-xs sm:text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <ShoppingBag className="w-4 h-4 text-[#C79A1E]" />
                  <span>Add to Bag</span>
                </button>

                <button
                  onClick={() => {
                    onInstantBuy(saree, quantity);
                    onClose();
                  }}
                  className="py-3 px-4 bg-[#141210] text-[#E3B93C] hover:bg-[#C79A1E] hover:text-[#141210] text-xs sm:text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <Zap className="w-4 h-4 fill-[#E3B93C]" />
                  <span>Razorpay Checkout</span>
                </button>
              </div>

              <a
                href={`https://wa.me/${BOUTIQUE_INFO.whatsappNumber}?text=${encodeURIComponent(
                  `Namaste Amutha Boutique! I would like to enquire about ${saree.name} (${saree.category}) priced at ${formatINR(
                    currentPrice
                  )}. Please confirm availability at your Kanadukathan boutique.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 hover:bg-emerald-100 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Chat with Weaver / Order via WhatsApp</span>
              </a>

              <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-[#141210]/70 pt-2 border-t border-[#C79A1E]/15">
                <span className="flex items-center gap-1 font-semibold text-amber-900 bg-amber-100/90 px-2 py-0.5 rounded">
                  No Cash on Delivery (100% Prepaid)
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Razorpay Secure
                </span>
                <span>·</span>
                <span>Worldwide Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
