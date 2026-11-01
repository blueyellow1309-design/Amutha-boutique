import React from 'react';
import { MapPin, Phone, MessageCircle, Clock, Navigation, ExternalLink } from 'lucide-react';
import { BOUTIQUE_INFO } from '../data/sarees';

export const StoreLocation: React.FC = () => {
  const mapQuery = encodeURIComponent(`${BOUTIQUE_INFO.name}, ${BOUTIQUE_INFO.fullAddress}`);
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

  return (
    <section id="location" className="py-16 bg-[#F4EEDF] border-t border-[#C79A1E]/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left Text / Info */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <p className="text-xs font-semibold tracking-widest text-[#996515] uppercase">
                Visit Our Physical Boutique
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#141210] mt-1">
                {BOUTIQUE_INFO.name} in <span className="italic font-medium text-[#C79A1E]">Kanadukathan</span>
              </h2>
              <p className="text-[#141210]/75 text-sm sm:text-base mt-2 leading-relaxed">
                Step into our boutique to touch, feel, and drape authentic Chettinad handlooms fresh off the pit looms. Located in historic Kanadukathan, Karaikudi Taluk.
              </p>
            </div>

            {/* Address Box */}
            <div className="bg-white p-6 rounded-2xl border border-[#C79A1E]/30 shadow-sm space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full bg-[#FAF5E9] text-[#C79A1E] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-[#141210]">Store Address</h4>
                  <p className="text-sm text-[#141210]/80 mt-1 leading-relaxed">
                    <strong>{BOUTIQUE_INFO.doorNo}, {BOUTIQUE_INFO.street}</strong><br />
                    {BOUTIQUE_INFO.town}, {BOUTIQUE_INFO.taluk}<br />
                    {BOUTIQUE_INFO.district}, PIN Code: <strong>{BOUTIQUE_INFO.pincode}</strong><br />
                    {BOUTIQUE_INFO.state}, India
                  </p>
                  <p className="text-xs text-[#996515] mt-1.5 font-medium">
                    Landmark: {BOUTIQUE_INFO.landmark}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#C79A1E]/15 grid sm:grid-cols-2 gap-3 text-xs text-[#141210]/80">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#C79A1E] shrink-0" />
                  <span>{BOUTIQUE_INFO.operatingHours}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#C79A1E] shrink-0" />
                  <span>{BOUTIQUE_INFO.phone}</span>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-[#141210] text-[#FAF5E9] hover:bg-[#C79A1E] hover:text-[#141210] rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Google Maps Directions</span>
                <ExternalLink className="w-3 h-3 ml-1 opacity-70" />
              </a>

              <a
                href={`https://wa.me/${BOUTIQUE_INFO.whatsappNumber}?text=${encodeURIComponent(
                  `Namaste Amutha Boutique! I am visiting Kanadukathan and would like directions to your store at 58 A SM Nagar.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Message on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Visual Store Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#141210] text-[#FAF5E9] rounded-2xl p-6 sm:p-8 border border-[#C79A1E]/40 shadow-xl space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] text-[#E3B93C] uppercase tracking-widest font-bold">Chettinad Destination</span>
                  <h3 className="font-serif text-xl font-bold mt-0.5">Kanadukathan Heritage Hub</h3>
                </div>
                <span className="text-xs bg-[#C79A1E]/20 text-[#E3B93C] px-2.5 py-1 rounded font-mono">
                  PIN 630103
                </span>
              </div>

              <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                Kanadukathan is the cultural epicenter of the Chettinad region, celebrated for palatial mansions, hand-crafted Athangudi tiles, and world-renowned Korvai cotton looms. 
              </p>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10 flex justify-between">
                  <span className="text-white/60">Distance from Karaikudi Junction:</span>
                  <span className="font-semibold text-white">12 km (~20 mins)</span>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10 flex justify-between">
                  <span className="text-white/60">Distance from Madurai Airport:</span>
                  <span className="font-semibold text-white">95 km (~1.5 hours)</span>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10 flex justify-between">
                  <span className="text-white/60">Distance from Trichy Airport:</span>
                  <span className="font-semibold text-white">85 km (~1.4 hours)</span>
                </div>
              </div>

              <div className="pt-2 text-center text-[11px] text-[#E3B93C]">
                Free home trial & custom border weaving available on request.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
