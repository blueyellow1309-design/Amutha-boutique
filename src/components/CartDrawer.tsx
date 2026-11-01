import React, { useState } from 'react';
import { X, Trash2, ShieldCheck, ArrowRight, Sparkles, MessageCircle, CreditCard, Tag, AlertCircle, Globe2 } from 'lucide-react';
import { CartItem, CustomerDetails } from '../types';
import { formatINR, generateWhatsAppOrderUrl } from '../utils/razorpay';
import { BOUTIQUE_INFO } from '../data/sarees';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (sareeId: string, delta: number) => void;
  onRemoveItem: (sareeId: string) => void;
  onProceedToRazorpay: (customer: CustomerDetails, discount: number) => void;
  onOpenWholesale?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToRazorpay,
  onOpenWholesale
}) => {
  const [step, setStep] = useState<'cart' | 'checkout'>('cart');
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState('');

  // Customer form details
  const [customer, setCustomer] = useState<CustomerDetails>({
    name: '',
    phone: '',
    email: '',
    streetAddress: '',
    city: '',
    district: '',
    state: 'Tamil Nadu',
    pincode: '',
    notes: ''
  });

  const [formError, setFormError] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.saree.price * item.quantity, 0);
  const total = Math.max(0, subtotal - appliedDiscount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'CHETTINAD10') {
      const disc = Math.round(subtotal * 0.1);
      setAppliedDiscount(disc);
      setCouponMessage(`Promo CHETTINAD10 applied: 10% off (-${formatINR(disc)})`);
    } else if (code === 'WELCOME500' && subtotal >= 2500) {
      setAppliedDiscount(500);
      setCouponMessage(`Promo WELCOME500 applied: Flat ₹500 off!`);
    } else {
      setAppliedDiscount(0);
      setCouponMessage('Invalid coupon code. Try CHETTINAD10.');
    }
  };

  const handleStartCheckout = () => {
    if (items.length === 0) return;
    setStep('checkout');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.name.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!customer.phone.trim() || customer.phone.replace(/[^0-9]/g, '').length < 8) {
      setFormError('Please enter a valid phone number for shipping alerts.');
      return;
    }
    if (!customer.streetAddress.trim()) {
      setFormError('Please provide your delivery street address.');
      return;
    }
    if (!customer.city.trim()) {
      setFormError('Please provide your city / town.');
      return;
    }

    setFormError('');
    onProceedToRazorpay(customer, appliedDiscount);
  };

  const handleWhatsAppCheckout = () => {
    if (!customer.name.trim() || !customer.phone.trim() || !customer.city.trim()) {
      setFormError('Please fill in your name, phone, and city before sending via WhatsApp.');
      return;
    }
    const url = generateWhatsAppOrderUrl({
      customer,
      items,
      total
    });
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end">
      <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#C79A1E]/30 bg-[#FBF7F0] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-serif text-lg font-bold text-[#141210]">
              {step === 'cart' ? 'Shopping Bag' : 'Shipping & Razorpay Payment'}
            </span>
            <span className="text-xs text-[#141210]/60">
              ({items.reduce((acc, i) => acc + i.quantity, 0)} item{items.length !== 1 ? 's' : ''})
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-black/10 flex items-center justify-center text-[#141210] hover:bg-[#141210] hover:text-white transition-colors"
            aria-label="Close cart"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {items.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#FAF5E9] flex items-center justify-center text-[#C79A1E]">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#141210]">Your bag is empty</h3>
              <p className="text-xs text-[#141210]/60 max-w-xs mx-auto">
                Explore our authentic Chettinad Korvai and Vaira Osi handloom cotton sarees starting at ₹1,200.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2.5 bg-[#141210] text-[#FAF5E9] rounded-lg text-xs font-semibold hover:bg-[#C79A1E] transition-colors"
              >
                Browse Sarees
              </button>
            </div>
          ) : step === 'cart' ? (
            <>
              {/* Itemized List */}
              <div className="divide-y divide-[#C79A1E]/15">
                {items.map((item) => (
                  <div key={item.saree.id} className="py-4 flex gap-3.5 items-start">
                    <img
                      src={item.saree.image}
                      alt={item.saree.name}
                      className="w-20 h-24 object-cover rounded-lg border border-[#C79A1E]/30 bg-[#FAF5E9] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-[11px] text-[#996515] uppercase font-semibold">
                            {item.saree.category}
                          </p>
                          <h4 className="text-sm font-bold text-[#141210] truncate mt-0.5">
                            {item.saree.name}
                          </h4>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.saree.id)}
                          className="text-[#141210]/40 hover:text-red-600 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-xs text-[#141210]/60 mt-1">
                        Colour: {item.saree.colorName}
                      </p>

                      <div className="mt-3 flex items-center justify-between">
                        {/* Stepper */}
                        <div className="flex items-center border border-[#141210]/20 rounded-md bg-white">
                          <button
                            onClick={() => onUpdateQuantity(item.saree.id, -1)}
                            className="px-2.5 py-0.5 text-xs font-bold hover:bg-[#FAF5E9]"
                          >
                            -
                          </button>
                          <span className="px-3 py-0.5 text-xs font-semibold tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.saree.id, 1)}
                            className="px-2.5 py-0.5 text-xs font-bold hover:bg-[#FAF5E9]"
                          >
                            +
                          </button>
                        </div>

                        <span className="font-serif font-bold text-sm sm:text-base text-[#141210] tabular-nums">
                          {formatINR(item.saree.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon / Promo Box */}
              <div className="p-3 bg-[#FAF5E9] rounded-xl border border-[#C79A1E]/30">
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-[#C79A1E] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Coupon: CHETTINAD10"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 bg-white border border-[#141210]/20 rounded-lg text-xs uppercase font-medium focus:outline-none focus:border-[#C79A1E]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-[#141210] text-[#FAF5E9] hover:bg-[#C79A1E] rounded-lg text-xs font-semibold transition-colors"
                  >
                    Apply
                  </button>
                </form>
                {couponMessage && (
                  <p className="text-[11px] text-[#996515] font-medium mt-1.5 px-1">
                    {couponMessage}
                  </p>
                )}
              </div>

              {/* No Cash on Delivery Notice */}
              <div className="p-3 bg-amber-50 border border-amber-200/80 rounded-xl text-xs text-amber-950 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-amber-900 block">100% Prepaid Orders Only · No COD</span>
                  <span className="text-[11px] text-amber-800 leading-snug block mt-0.5">
                    We do not offer Cash on Delivery. To preserve the pristine condition of delicate handloom weaves, all sarees are dispatched after prepaid authorization.
                  </span>
                </div>
              </div>

              {/* Worldwide Wholesale Export banner */}
              <div className="p-3 bg-[#141210] text-[#FAF5E9] rounded-xl flex items-center justify-between text-xs border border-[#C79A1E]/30">
                <div className="space-y-0.5">
                  <span className="font-semibold text-[#E3B93C] flex items-center gap-1.5">
                    <Globe2 className="w-3.5 h-3.5" />
                    Worldwide Wholesale Supply
                  </span>
                  <span className="text-[11px] text-white/70 block">
                    Ordering 10+ Sarees? We export worldwide via DHL / FedEx.
                  </span>
                </div>
                {onOpenWholesale && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenWholesale();
                    }}
                    className="px-2.5 py-1 bg-[#C79A1E] hover:bg-[#E3B93C] text-[#141210] rounded-md font-semibold text-[11px] shrink-0 transition-colors"
                  >
                    Wholesale
                  </button>
                )}
              </div>
            </>
          ) : (
            /* Step 2: Shipping & Details */
            <form id="shipping-form" onSubmit={handleFormSubmit} className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-[#141210] uppercase tracking-wider">
                  Delivery & Contact Information
                </p>
                <button
                  type="button"
                  onClick={() => setStep('cart')}
                  className="text-xs text-[#C79A1E] hover:underline"
                >
                  ← Edit Items
                </button>
              </div>

              {formError && (
                <div className="p-2.5 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">
                  {formError}
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-[#141210] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Meenakshi Sundaram"
                  value={customer.name}
                  onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#141210]/20 rounded-lg text-xs focus:ring-1 focus:ring-[#C79A1E] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#141210] mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#141210]/20 rounded-lg text-xs focus:ring-1 focus:ring-[#C79A1E] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#141210] mb-1">
                    Email (for invoice)
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={customer.email}
                    onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#141210]/20 rounded-lg text-xs focus:ring-1 focus:ring-[#C79A1E] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#141210] mb-1">
                  Door No & Street Address *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Flat/Door No, Street or Building Name"
                  value={customer.streetAddress}
                  onChange={(e) => setCustomer({ ...customer, streetAddress: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#141210]/20 rounded-lg text-xs focus:ring-1 focus:ring-[#C79A1E] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-medium text-[#141210] mb-1">
                    City / Town *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Karaikudi"
                    value={customer.city}
                    onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                    className="w-full px-2.5 py-2 bg-white border border-[#141210]/20 rounded-lg text-xs focus:ring-1 focus:ring-[#C79A1E] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#141210] mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    value={customer.state}
                    onChange={(e) => setCustomer({ ...customer, state: e.target.value })}
                    className="w-full px-2.5 py-2 bg-white border border-[#141210]/20 rounded-lg text-xs focus:ring-1 focus:ring-[#C79A1E] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#141210] mb-1">
                    PIN Code
                  </label>
                  <input
                    type="text"
                    placeholder="630103"
                    value={customer.pincode}
                    onChange={(e) => setCustomer({ ...customer, pincode: e.target.value })}
                    className="w-full px-2.5 py-2 bg-white border border-[#141210]/20 rounded-lg text-xs focus:ring-1 focus:ring-[#C79A1E] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#141210] mb-1">
                  Notes (blouse stitching, gift packing, delivery timing)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Blouse stitching request, express gift packaging..."
                  value={customer.notes}
                  onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#141210]/20 rounded-lg text-xs focus:ring-1 focus:ring-[#C79A1E] focus:outline-none"
                />
              </div>

              {/* Verified boutique source badge */}
              <div className="p-3 bg-[#FAF5E9] rounded-xl border border-[#C79A1E]/30 text-xs text-[#141210]/80">
                <span className="font-semibold block text-[#996515]">Shipped directly from our Kanadukathan store:</span>
                <span className="text-[11px] text-[#141210]/70">{BOUTIQUE_INFO.fullAddress}</span>
              </div>
            </form>
          )}
        </div>

        {/* Footer with Calculations and Primary CTAs */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-[#C79A1E]/30 bg-[#FBF7F0] space-y-3">
            {/* Calculation rows */}
            <div className="space-y-1.5 text-xs text-[#141210]/80">
              <div className="flex justify-between">
                <span>Subtotal ({items.reduce((acc, i) => acc + i.quantity, 0)} items)</span>
                <span className="tabular-nums">{formatINR(subtotal)}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Coupon Discount</span>
                  <span className="tabular-nums">-{formatINR(appliedDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Handloom Shipping</span>
                <span className="text-emerald-700 font-medium">FREE (Across India)</span>
              </div>
              <div className="pt-2 border-t border-[#C79A1E]/20 flex justify-between items-baseline">
                <span className="font-serif text-base font-bold text-[#141210]">Total Payable</span>
                <span className="font-serif text-2xl font-bold text-[#141210] tabular-nums">
                  {formatINR(total)}
                </span>
              </div>
            </div>

            {/* CTAs */}
            {step === 'cart' ? (
              <button
                onClick={handleStartCheckout}
                className="w-full py-3 bg-[#141210] text-[#FAF5E9] hover:bg-[#C79A1E] hover:text-[#141210] text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors shadow-md"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="space-y-2">
                <button
                  type="submit"
                  form="shipping-form"
                  className="w-full py-3 bg-[#141210] text-[#E3B93C] hover:bg-[#C79A1E] hover:text-[#141210] text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors shadow-md"
                >
                  <CreditCard className="w-4 h-4 text-[#E3B93C]" />
                  <span>Pay {formatINR(total)} via Razorpay (UPI/Cards)</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppCheckout}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Order to Amutha Boutique via WhatsApp</span>
                </button>
              </div>
            )}

            <div className="flex items-center justify-center gap-2 text-[11px] text-[#141210]/50 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Razorpay 256-bit SSL · Instant Digital Tax Receipt</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
