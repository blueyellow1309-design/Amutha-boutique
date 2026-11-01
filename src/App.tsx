import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Catalog } from './components/Catalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { RazorpayModal } from './components/RazorpayModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { HeritageStory } from './components/HeritageStory';
import { StoreLocation } from './components/StoreLocation';
import { PaymentSettingsModal } from './components/PaymentSettingsModal';
import { WholesaleModal } from './components/WholesaleModal';
import { Footer } from './components/Footer';
import { Saree, CartItem, CustomerDetails, OrderReceipt } from './types';
import { launchRazorpayCheckout, DEFAULT_RAZORPAY_KEY } from './utils/razorpay';
import { SAREES_DATA, BOUTIQUE_INFO } from './data/sarees';
import { Check } from 'lucide-react';

export default function App() {
  // Navigation
  const [activeSection, setActiveSection] = useState<'home' | 'collection' | 'heritage' | 'location'>('home');

  // Cart
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('amutha_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals
  const [selectedSaree, setSelectedSaree] = useState<Saree | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isRazorpayModalOpen, setIsRazorpayModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isWholesaleOpen, setIsWholesaleOpen] = useState(false);
  const [completedReceipt, setCompletedReceipt] = useState<OrderReceipt | null>(null);

  // Razorpay Gateway Configurations
  const [razorpayKeyId, setRazorpayKeyId] = useState<string>(() => {
    return localStorage.getItem('amutha_rzp_key') || DEFAULT_RAZORPAY_KEY;
  });
  const [simulationMode, setSimulationMode] = useState<boolean>(true);

  // Pending checkout state
  const [checkoutCustomer, setCheckoutCustomer] = useState<CustomerDetails>({
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
  const [checkoutDiscount, setCheckoutDiscount] = useState<number>(0);
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('amutha_cart', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleAddToCart = (saree: Saree, quantity: number = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.saree.id === saree.id);
      if (existing) {
        return prev.map((i) =>
          i.saree.id === saree.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { saree, quantity }];
    });
    showToast(`Added "${saree.name}" to shopping bag!`);
  };

  const handleUpdateQuantity = (sareeId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.saree.id === sareeId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (sareeId: string) => {
    setCartItems((prev) => prev.filter((item) => item.saree.id !== sareeId));
    showToast('Item removed from shopping bag');
  };

  // Instant Buy for a single saree from the catalog
  const handleInstantBuy = (saree: Saree, quantity: number = 1) => {
    const singleItem: CartItem = { saree, quantity };
    setCheckoutItems([singleItem]);
    setCheckoutDiscount(0);
    setIsCartOpen(true);
  };

  // Proceed to Razorpay from CartDrawer
  const handleProceedToRazorpay = (customer: CustomerDetails, discount: number) => {
    const activeItems = checkoutItems.length > 0 ? checkoutItems : cartItems;
    if (activeItems.length === 0) return;

    setCheckoutCustomer(customer);
    setCheckoutDiscount(discount);
    const subtotal = activeItems.reduce((acc, i) => acc + i.saree.price * i.quantity, 0);
    const total = Math.max(0, subtotal - discount);

    // If simulation mode is forced, open the internal Razorpay checkout modal
    if (simulationMode) {
      setIsCartOpen(false);
      setIsRazorpayModalOpen(true);
      return;
    }

    // Try Standard window.Razorpay checkout
    const launched = launchRazorpayCheckout({
      keyId: razorpayKeyId,
      items: activeItems,
      customer,
      totalAmount: total,
      discount,
      onSuccess: (receipt) => {
        setIsCartOpen(false);
        setCompletedReceipt(receipt);
        // Clear purchased items
        setCartItems([]);
        setCheckoutItems([]);
      },
      onDismiss: () => {
        showToast('Payment window closed');
      },
      onError: (err) => {
        showToast(`Razorpay error: ${err}`);
        // Fallback to internal simulator
        setIsRazorpayModalOpen(true);
      }
    });

    if (!launched) {
      // Fallback to modal simulator
      setIsCartOpen(false);
      setIsRazorpayModalOpen(true);
    }
  };

  // Payment Success handler from internal Razorpay modal
  const handlePaymentSuccess = (receipt: OrderReceipt) => {
    setCompletedReceipt(receipt);
    setCartItems([]);
    setCheckoutItems([]);
    showToast('Payment verified successfully via Razorpay!');
  };

  const handleSaveRazorpayKey = (newKey: string) => {
    setRazorpayKeyId(newKey);
    localStorage.setItem('amutha_rzp_key', newKey);
  };

  const scrollToSection = (section: string) => {
    setActiveSection(section as any);
    if (section === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(section === 'collection' ? 'collection' : section);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FBF7F0] text-[#1E1B18] flex flex-col font-sans selection:bg-[#E3B93C]/30">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#141210] text-[#FAF5E9] px-4 py-3 rounded-xl shadow-xl border border-[#C79A1E]/40 text-xs font-semibold flex items-center gap-2 animate-in slide-in-from-bottom duration-200">
          <Check className="w-4 h-4 text-[#E3B93C]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => {
          setCheckoutItems([]); // default to all cart items
          setIsCartOpen(true);
        }}
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenWholesale={() => setIsWholesaleOpen(true)}
      />

      {/* Main Content Areas */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExplore={() => scrollToSection('collection')}
          onOpenStore={() => scrollToSection('location')}
          onOpenWholesale={() => setIsWholesaleOpen(true)}
        />

        {/* Catalog Section with all user-specified sarees and prices */}
        <Catalog
          onSelectSaree={(saree) => setSelectedSaree(saree)}
          onAddToCart={(saree) => handleAddToCart(saree, 1)}
          onInstantBuy={(saree) => handleInstantBuy(saree, 1)}
        />

        {/* Heritage Weaving Story */}
        <HeritageStory />

        {/* Kanadukathan Physical Store Location Card */}
        <StoreLocation />
      </main>

      {/* Saree Details Modal */}
      <ProductDetailModal
        saree={selectedSaree}
        onClose={() => setSelectedSaree(null)}
        onAddToCart={(saree, qty) => handleAddToCart(saree, qty)}
        onInstantBuy={(saree, qty) => handleInstantBuy(saree, qty)}
      />

      {/* Shopping Cart & Shipping Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => {
          setIsCartOpen(false);
          setCheckoutItems([]);
        }}
        items={checkoutItems.length > 0 ? checkoutItems : cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToRazorpay={handleProceedToRazorpay}
        onOpenWholesale={() => setIsWholesaleOpen(true)}
      />

      {/* Interactive Razorpay Checkout Modal (supports UPI, QR, Cards & NetBanking) */}
      <RazorpayModal
        isOpen={isRazorpayModalOpen}
        onClose={() => setIsRazorpayModalOpen(false)}
        items={checkoutItems.length > 0 ? checkoutItems : cartItems}
        customer={checkoutCustomer}
        totalAmount={
          Math.max(
            0,
            (checkoutItems.length > 0 ? checkoutItems : cartItems).reduce(
              (sum, item) => sum + item.saree.price * item.quantity,
              0
            ) - checkoutDiscount
          )
        }
        discount={checkoutDiscount}
        onPaymentSuccess={handlePaymentSuccess}
        keyId={razorpayKeyId}
      />

      {/* Verified Order Receipt & WhatsApp Sync Modal */}
      <OrderSuccessModal
        receipt={completedReceipt}
        onClose={() => setCompletedReceipt(null)}
      />

      {/* Worldwide Wholesale Export Modal */}
      <WholesaleModal
        isOpen={isWholesaleOpen}
        onClose={() => setIsWholesaleOpen(false)}
      />

      {/* Payment Gateway Settings Drawer */}
      <PaymentSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        currentKey={razorpayKeyId}
        onSaveKey={handleSaveRazorpayKey}
        simulationMode={simulationMode}
        onToggleSimulation={setSimulationMode}
      />

      {/* Footer */}
      <Footer
        onNavigate={scrollToSection}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenWholesale={() => setIsWholesaleOpen(true)}
      />
    </div>
  );
}
