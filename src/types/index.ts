export interface Saree {
  id: string;
  name: string;
  category: SareeCategory;
  price: number;
  altPrice?: number; // for options like pure zari edition
  description: string;
  weaveDetail: string;
  colorName: string;
  colorHex: string;
  borderType: string;
  image: string;
  featured?: boolean;
  inStock: boolean;
  fabric: string;
  blousePiece: string;
}

export type SareeCategory = 
  | 'Small Border'
  | 'Medium Border'
  | 'Rettapetta'
  | 'Korvai Kattam'
  | 'Korvai Kattam Handmade Putta'
  | 'Plain Handmade Butta'
  | 'Vaira Osi'
  | 'Meena Vaira Osi'
  | 'Rich Pallu Plain Butta';

export interface CartItem {
  saree: Saree;
  quantity: number;
  selectedColor?: string;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  email: string;
  streetAddress: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  notes?: string;
}

export interface OrderReceipt {
  orderId: string;
  paymentId: string;
  razorpaySignature?: string;
  paymentMethod: 'razorpay' | 'whatsapp_direct' | 'bank_transfer';
  customer: CustomerDetails;
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  date: string;
  status: 'PAID' | 'CONFIRMED' | 'PENDING';
}

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}
