import { CartItem, CustomerDetails, OrderReceipt } from '../types';
import { BOUTIQUE_INFO } from '../data/sarees';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any;
  }
}

export const DEFAULT_RAZORPAY_KEY = "rzp_test_AmuthaBoutiqueDemo";

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

export function generateOrderId(): string {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(1000 + Math.random() * 9000);
  return `ORD-KK-${timestamp}-${random}`;
}

export function generatePaymentId(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let random = '';
  for (let i = 0; i < 14; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `pay_${random}`;
}

export interface LaunchRazorpayParams {
  keyId?: string;
  items: CartItem[];
  customer: CustomerDetails;
  totalAmount: number;
  discount: number;
  onSuccess: (receipt: OrderReceipt) => void;
  onDismiss?: () => void;
  onError?: (err: string) => void;
}

export function launchRazorpayCheckout({
  keyId = DEFAULT_RAZORPAY_KEY,
  items,
  customer,
  totalAmount,
  discount,
  onSuccess,
  onDismiss,
  onError
}: LaunchRazorpayParams) {
  const amountPaise = totalAmount * 100;
  const orderId = generateOrderId();

  if (typeof window !== 'undefined' && window.Razorpay) {
    try {
      const options = {
        key: keyId,
        amount: amountPaise,
        currency: 'INR',
        name: BOUTIQUE_INFO.name,
        description: `Order ${orderId} · Pure Chettinad Handloom`,
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=160&h=160&fit=crop&q=80',
        prefill: {
          name: customer.name,
          email: customer.email || 'customer@example.com',
          contact: customer.phone.replace(/[^0-9]/g, '')
        },
        notes: {
          store_address: BOUTIQUE_INFO.fullAddress,
          delivery_city: customer.city,
          order_id: orderId,
          total_items: items.reduce((sum, item) => sum + item.quantity, 0)
        },
        theme: {
          color: '#C79A1E'
        },
        modal: {
          ondismiss: function () {
            if (onDismiss) onDismiss();
          }
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        handler: function (response: any) {
          const receipt: OrderReceipt = {
            orderId,
            paymentId: response.razorpay_payment_id || generatePaymentId(),
            razorpaySignature: response.razorpay_signature,
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
          onSuccess(receipt);
        }
      };

      const rzpInstance = new window.Razorpay(options);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      rzpInstance.on('payment.failed', function (err: any) {
        if (onError) {
          onError(err?.error?.description || 'Payment was unsuccessful. Please retry or contact us.');
        }
      });
      rzpInstance.open();
      return true;
    } catch {
      // Fallback to internal Razorpay simulator modal
      return false;
    }
  }
  return false;
}

export function generateWhatsAppOrderUrl(receiptOrItems: { customer: CustomerDetails; items: CartItem[]; total: number; orderId?: string; paymentId?: string; status?: string }): string {
  const { customer, items, total, orderId, paymentId, status } = receiptOrItems;
  
  const itemList = items
    .map((item, idx) => `${idx + 1}. ${item.saree.name} [${item.saree.category}] (Qty: ${item.quantity}) - ₹${item.saree.price * item.quantity}`)
    .join('\n');

  const text = `🪡 *AMUTHA BOUTIQUE - NEW SAREE ORDER*
*Store:* ${BOUTIQUE_INFO.doorNo}, ${BOUTIQUE_INFO.street}, ${BOUTIQUE_INFO.town}, ${BOUTIQUE_INFO.taluk}, ${BOUTIQUE_INFO.district} - ${BOUTIQUE_INFO.pincode}

${orderId ? `*Order ID:* ${orderId}` : ''}
${paymentId ? `*Razorpay Payment ID:* ${paymentId} (${status || 'PAID'})` : '*Payment Policy:* 100% Prepaid Order (No Cash on Delivery / COD)'}

*Customer Details:*
• Name: ${customer.name}
• Phone: ${customer.phone}
• Delivery Address: ${customer.streetAddress}, ${customer.city}, ${customer.district}, ${customer.state} - ${customer.pincode}
${customer.notes ? `• Special Notes: ${customer.notes}` : ''}

*Order Items:*
${itemList}

*Total Payable:* ₹${total.toLocaleString('en-IN')}
*Shipping:* 100% Prepaid Express Handloom Dispatch (No COD)

Please confirm dispatch timeline and provide tracking details. Thank you!`;

  return `https://wa.me/${BOUTIQUE_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export function generateWhatsAppWholesaleUrl(details: { name: string; country: string; businessName?: string; quantity: string; preferredWeaves: string; notes?: string }): string {
  const text = `🌍 *AMUTHA BOUTIQUE - WORLDWIDE WHOLESALE INQUIRY*
*Store:* Kanadukathan, Karaikudi Taluk, Sivaganga - 630103, Tamil Nadu

*Boutique / Buyer Information:*
• Name: ${details.name}
• Country & City: ${details.country}
${details.businessName ? `• Business / Boutique: ${details.businessName}` : ''}
• Estimated Order Quantity: ${details.quantity} (MOQ: 10 Sarees)
• Weaves of Interest: ${details.preferredWeaves}
${details.notes ? `• Requirements / Custom Colors: ${details.notes}` : ''}

*Shipping:* Worldwide International Export via DHL / FedEx (100% Prepaid, No COD)

Please send your wholesale catalog, volume price tier, and international shipping rates.`;

  return `https://wa.me/${BOUTIQUE_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
