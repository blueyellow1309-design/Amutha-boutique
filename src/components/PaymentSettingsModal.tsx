import React, { useState } from 'react';
import { X, ShieldCheck, Key, Check } from 'lucide-react';
import { DEFAULT_RAZORPAY_KEY } from '../utils/razorpay';
import { BOUTIQUE_INFO } from '../data/sarees';

interface PaymentSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentKey: string;
  onSaveKey: (newKey: string) => void;
  simulationMode: boolean;
  onToggleSimulation: (val: boolean) => void;
}

export const PaymentSettingsModal: React.FC<PaymentSettingsModalProps> = ({
  isOpen,
  onClose,
  currentKey,
  onSaveKey,
  simulationMode,
  onToggleSimulation
}) => {
  const [keyInput, setKeyInput] = useState(currentKey || DEFAULT_RAZORPAY_KEY);
  const [savedNotice, setSavedNotice] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveKey(keyInput.trim());
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-[#C79A1E]/30 animate-in fade-in zoom-in-95 duration-200">
        <div className="p-5 bg-[#141210] text-white flex items-center justify-between border-b border-[#C79A1E]/30">
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5 text-[#E3B93C]" />
            <h3 className="font-serif font-bold text-base">Razorpay Gateway Configuration</h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
            aria-label="Close settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 text-[#141210]">
          <p className="text-xs text-[#141210]/70 leading-relaxed">
            Configure dynamic Razorpay processing for {BOUTIQUE_INFO.name}. You can use your live Razorpay Key ID or test mode.
          </p>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#141210] mb-1">
                Razorpay Key ID
              </label>
              <input
                type="text"
                placeholder="rzp_test_... or rzp_live_..."
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#141210]/20 rounded-lg text-xs font-mono focus:outline-none focus:border-[#C79A1E]"
              />
              <span className="text-[10px] text-[#141210]/50 mt-1 block">
                Found in Razorpay Dashboard → Settings → API Keys
              </span>
            </div>

            <div className="p-3 bg-[#FAF5E9] rounded-xl border border-[#C79A1E]/20 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-[#141210] block">Checkout Experience</span>
                  <span className="text-[11px] text-[#141210]/60">
                    {simulationMode ? 'In-App Interactive Razorpay Simulator' : 'Direct Razorpay Standard Checkout'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onToggleSimulation(!simulationMode)}
                  className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    simulationMode ? 'bg-[#C79A1E]' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                      simulationMode ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {savedNotice && (
              <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 p-2 rounded-lg">
                <Check className="w-4 h-4" />
                <span>Razorpay key saved successfully!</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 bg-[#141210] text-[#FAF5E9] hover:bg-[#C79A1E] hover:text-[#141210] rounded-lg text-xs font-semibold transition-colors shadow-sm"
            >
              Save Configuration
            </button>
          </form>

          <div className="pt-2 border-t border-[#141210]/10 flex items-center justify-between text-[11px] text-[#141210]/60">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              PCI-DSS Compliant
            </span>
            <span>Supports UPI, Cards, NetBanking</span>
          </div>
        </div>
      </div>
    </div>
  );
};
