import React from 'react';
import { CheckCircle, Printer, MessageCircle, ArrowRight } from 'lucide-react';
import { OrderReceipt } from '../types';
import { formatINR, generateWhatsAppOrderUrl } from '../utils/razorpay';
import { BOUTIQUE_INFO } from '../data/sarees';

interface OrderSuccessModalProps {
  receipt: OrderReceipt | null;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  receipt,
  onClose
}) => {
  if (!receipt) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsApp = () => {
    const url = generateWhatsAppOrderUrl(receipt);
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#C79A1E]/30 animate-in fade-in zoom-in-95 duration-200">
        {/* Success Banner */}
        <div className="bg-[#141210] text-[#FAF5E9] p-6 text-center border-b border-[#C79A1E]/40 relative">
          <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
            <CheckCircle className="w-8 h-8 text-emerald-400" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-white">Payment Confirmed!</h2>
          <p className="text-xs sm:text-sm text-[#E3B93C] mt-1">
            Thank you, {receipt.customer.name}. Your handloom saree order has been received.
          </p>
          <div className="mt-2 text-[11px] text-white/60">
            Razorpay Payment ID: <span className="font-mono text-emerald-300">{receipt.paymentId}</span>
          </div>
        </div>

        {/* Printable Invoice Container */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[65vh] overflow-y-auto text-[#141210]">
          {/* Boutique Header */}
          <div className="border-b border-[#C79A1E]/20 pb-4 flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <h3 className="font-serif text-xl font-bold text-[#141210]">{BOUTIQUE_INFO.name}</h3>
              <p className="text-xs text-[#996515] font-semibold">{BOUTIQUE_INFO.tagline}</p>
              <p className="text-xs text-[#141210]/70 mt-1 max-w-sm">
                {BOUTIQUE_INFO.doorNo}, {BOUTIQUE_INFO.street}, {BOUTIQUE_INFO.town}, {BOUTIQUE_INFO.taluk}, {BOUTIQUE_INFO.district}, PIN: {BOUTIQUE_INFO.pincode}, {BOUTIQUE_INFO.state}
              </p>
              <p className="text-xs text-[#141210]/70">Phone: {BOUTIQUE_INFO.phone}</p>
            </div>
            <div className="text-left sm:text-right">
              <span className="inline-block px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[11px] font-bold rounded">
                STATUS: {receipt.status}
              </span>
              <p className="text-xs text-[#141210]/60 mt-1">Order: #{receipt.orderId}</p>
              <p className="text-xs text-[#141210]/60">{receipt.date}</p>
            </div>
          </div>

          {/* Delivery To Details */}
          <div className="bg-[#FAF5E9] p-4 rounded-xl border border-[#C79A1E]/20 text-xs">
            <h4 className="font-bold text-[#141210] uppercase tracking-wide text-[11px] mb-1">
              Dispatch & Delivery Address:
            </h4>
            <p className="font-semibold text-sm">{receipt.customer.name}</p>
            <p className="text-[#141210]/80 mt-0.5">{receipt.customer.streetAddress}</p>
            <p className="text-[#141210]/80">
              {receipt.customer.city}, {receipt.customer.state} - {receipt.customer.pincode}
            </p>
            <p className="text-[#141210]/80 mt-1">Phone: {receipt.customer.phone}</p>
            {receipt.customer.notes && (
              <p className="mt-2 text-[11px] text-[#996515] italic">
                Special Request: {receipt.customer.notes}
              </p>
            )}
          </div>

          {/* Itemized Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-[#141210]/15 text-[#141210]/60 font-semibold uppercase text-[10px]">
                  <th className="pb-2">Saree Details</th>
                  <th className="pb-2 text-center">Qty</th>
                  <th className="pb-2 text-right">Unit Price</th>
                  <th className="pb-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#C79A1E]/10">
                {receipt.items.map((item, idx) => (
                  <tr key={idx} className="py-2.5">
                    <td className="py-2.5">
                      <p className="font-bold text-[#141210]">{item.saree.name}</p>
                      <p className="text-[11px] text-[#141210]/60">{item.saree.category} · {item.saree.colorName}</p>
                    </td>
                    <td className="py-2.5 text-center font-mono tabular-nums">{item.quantity}</td>
                    <td className="py-2.5 text-right font-mono tabular-nums">{formatINR(item.saree.price)}</td>
                    <td className="py-2.5 text-right font-bold font-mono tabular-nums">
                      {formatINR(item.saree.price * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary Breakdown */}
          <div className="border-t border-[#141210]/15 pt-3 space-y-1 text-xs text-right">
            <div className="flex justify-between">
              <span className="text-[#141210]/60">Subtotal</span>
              <span className="font-mono tabular-nums">{formatINR(receipt.subtotal)}</span>
            </div>
            {receipt.discount > 0 && (
              <div className="flex justify-between text-emerald-700 font-medium">
                <span>Handloom Discount</span>
                <span className="font-mono tabular-nums">-{formatINR(receipt.discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-[#141210]/60">Shipping</span>
              <span className="text-emerald-700 font-medium">FREE</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-[#C79A1E]/20 text-sm font-bold">
              <span>Amount Paid via Razorpay</span>
              <span className="font-serif text-lg text-[#141210] font-mono tabular-nums">
                {formatINR(receipt.total)}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-4 sm:p-5 bg-[#FAF5E9] border-t border-[#C79A1E]/30 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 bg-white border border-[#141210]/20 hover:border-[#141210] text-[#141210] rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Invoice</span>
            </button>
            <button
              onClick={handleWhatsApp}
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Send WhatsApp Dispatch Notice</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#141210] text-[#FAF5E9] hover:bg-[#C79A1E] hover:text-[#141210] rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
