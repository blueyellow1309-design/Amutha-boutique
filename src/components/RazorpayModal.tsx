import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, QrCode, CreditCard, Building2, Smartphone, Loader2 } from 'lucide-react';
import { CartItem, CustomerDetails, OrderReceipt } from '../types';
import { formatINR, generateOrderId, generatePaymentId } from '../utils/razorpay';
import { BOUTIQUE_INFO } from '../data/sarees';

interface RazorpayModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  customer: CustomerDetails;
  totalAmount: number;
  discount: number;
  onPaymentSuccess: (receipt: OrderReceipt) => void;
  keyId?: string;
}

export const RazorpayModal: React.FC<RazorpayModalProps> = ({
  isOpen,
  onClose,
  items,
  customer,
  totalAmount,
  discount,
  onPaymentSuccess
}) => {
  const [activeTab, setActiveTab] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState(`${customer.phone.replace(/[^0-9]/g, '').slice(-10) || '9345998758'}@okhdfcbank`);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedBank, setSelectedBank] = useState('SBI');

  if (!isOpen) return null;

  const orderId = generateOrderId();

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const paymentId = generatePaymentId();
      const receipt: OrderReceipt = {
        orderId,
        paymentId,
        razorpaySignature: `rzp_sig_${Math.random().toString(36).substring(2, 15)}`,
        paymentMethod: 'razorpay',
        customer,
        items,
        subtotal: totalAmount + discount,
        discount,
        total: totalAmount,
        date: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        status: 'PAID'
      };
      onPaymentSuccess(receipt);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-[#0C2340] text-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-sky-500/20 animate-in fade-in zoom-in-95 duration-200">
        {/* Razorpay Authentic Blue Header */}
        <div className="bg-[#021329] p-5 border-b border-sky-900/40 relative">
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            aria-label="Close Razorpay checkout"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#C79A1E] text-[#141210] font-bold flex items-center justify-center font-serif text-lg">
              AB
            </div>
            <div>
              <h3 className="font-semibold text-base text-white">{BOUTIQUE_INFO.name}</h3>
              <p className="text-[11px] text-slate-300">Kanadukathan, Karaikudi · Handloom Sarees</p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-sky-900/40 flex justify-between items-baseline">
            <span className="text-xs text-slate-400">Amount Payable</span>
            <span className="text-2xl font-bold font-mono tracking-tight text-[#E3B93C]">
              {formatINR(totalAmount)}
            </span>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
            <span>Order #{orderId}</span>
            <span className="text-sky-300 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Razorpay Secured
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="grid grid-cols-3 bg-[#0A1A2E] text-xs font-medium border-b border-sky-900/40">
          <button
            type="button"
            onClick={() => setActiveTab('upi')}
            className={`py-3 px-2 flex items-center justify-center gap-1.5 transition-colors border-b-2 ${
              activeTab === 'upi'
                ? 'border-[#C79A1E] text-white bg-sky-900/30'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 text-[#E3B93C]" />
            <span>UPI / QR</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('card')}
            className={`py-3 px-2 flex items-center justify-center gap-1.5 transition-colors border-b-2 ${
              activeTab === 'card'
                ? 'border-[#C79A1E] text-white bg-sky-900/30'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5 text-[#E3B93C]" />
            <span>Cards</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('netbanking')}
            className={`py-3 px-2 flex items-center justify-center gap-1.5 transition-colors border-b-2 ${
              activeTab === 'netbanking'
                ? 'border-[#C79A1E] text-white bg-sky-900/30'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-[#E3B93C]" />
            <span>NetBanking</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 bg-[#081729]">
          {activeTab === 'upi' && (
            <div className="space-y-4">
              {/* QR Code section */}
              <div className="p-4 bg-[#0E2238] rounded-xl border border-sky-800/40 text-center space-y-2">
                <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#E3B93C]">
                  <QrCode className="w-4 h-4" />
                  <span>Scan to pay with any UPI App</span>
                </div>
                
                {/* Visual QR Code Display */}
                <div className="w-32 h-32 mx-auto bg-white p-2 rounded-lg flex items-center justify-center shadow-md">
                  <div className="w-full h-full border-2 border-black/10 rounded flex flex-col items-center justify-center text-slate-800">
                    <QrCode className="w-20 h-20 text-[#0C2340]" />
                    <span className="text-[8px] font-bold tracking-tight text-slate-500">BHIM · GPAY · PHONEPE</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-300">
                  Google Pay · PhonePe · Paytm · CRED · BHIM
                </p>
              </div>

              {/* UPI ID Input */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Or enter UPI ID / VPA
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="mobile@upi"
                    className="flex-1 px-3 py-2 bg-[#05111F] border border-sky-800/50 rounded-lg text-xs text-white focus:outline-none focus:border-[#C79A1E]"
                  />
                  <button
                    type="button"
                    onClick={handleSimulatePayment}
                    disabled={isProcessing}
                    className="px-3 py-2 bg-[#C79A1E] text-[#141210] font-semibold text-xs rounded-lg hover:bg-[#E3B93C] transition-colors"
                  >
                    Verify & Pay
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'card' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="4111 2222 3333 4444"
                  defaultValue="4532 •••• •••• 8821"
                  className="w-full px-3 py-2 bg-[#05111F] border border-sky-800/50 rounded-lg text-xs text-white font-mono"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Expiry (MM/YY)
                  </label>
                  <input
                    type="text"
                    defaultValue="12/28"
                    placeholder="MM/YY"
                    className="w-full px-3 py-2 bg-[#05111F] border border-sky-800/50 rounded-lg text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    CVV
                  </label>
                  <input
                    type="password"
                    defaultValue="•••"
                    maxLength={4}
                    className="w-full px-3 py-2 bg-[#05111F] border border-sky-800/50 rounded-lg text-xs text-white font-mono"
                  />
                </div>
              </div>
              <p className="text-[11px] text-slate-400">
                RuPay, Visa, MasterCard, Maestro and American Express accepted.
              </p>
            </div>
          )}

          {activeTab === 'netbanking' && (
            <div className="space-y-3">
              <label className="block text-xs font-medium text-slate-300">
                Select Your Bank
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {['SBI', 'HDFC', 'ICICI', 'Axis', 'IOB', 'Canara'].map((bank) => (
                  <button
                    key={bank}
                    type="button"
                    onClick={() => setSelectedBank(bank)}
                    className={`py-2 px-1 rounded-lg border text-center transition-colors ${
                      selectedBank === bank
                        ? 'border-[#C79A1E] bg-[#C79A1E]/20 text-[#E3B93C] font-bold'
                        : 'border-sky-900/60 bg-[#05111F] text-slate-300 hover:border-sky-700'
                    }`}
                  >
                    {bank}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Customer summary */}
          <div className="p-3 bg-[#061423] rounded-lg border border-sky-900/50 text-xs text-slate-300 space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-400">Customer:</span>
              <span className="font-semibold text-white">{customer.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Delivery to:</span>
              <span className="text-slate-200 truncate max-w-[200px]">{customer.city}, {customer.state}</span>
            </div>
          </div>
        </div>

        {/* Razorpay Action Button */}
        <div className="p-5 bg-[#021329] border-t border-sky-900/50 space-y-2">
          <button
            type="button"
            onClick={handleSimulatePayment}
            disabled={isProcessing}
            className="w-full py-3 bg-[#C79A1E] text-[#141210] hover:bg-[#E3B93C] font-semibold text-sm rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg disabled:opacity-60"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#141210]" />
                <span>Authorizing Razorpay Gateway...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 text-[#141210]" />
                <span>Complete Payment of {formatINR(totalAmount)}</span>
              </>
            )}
          </button>

          <p className="text-[10px] text-center text-slate-400">
            Powered by Razorpay Payments India Pvt Ltd · Kanadukathan Handloom Direct
          </p>
        </div>
      </div>
    </div>
  );
};
