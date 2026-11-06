import React from 'react';
import { X, Award, ShieldCheck, Sparkles } from 'lucide-react';

interface MedallionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MedallionModal: React.FC<MedallionModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative bg-gradient-to-b from-caribbean-900 to-caribbean-950 border border-bronze-400/50 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-center shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-300 hover:text-white hover:bg-caribbean-800 transition-colors"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* High-Res Interactive Coin Display with Golden Contour (Zero White Ring) */}
        <div className="relative mx-auto w-48 h-48 sm:w-56 sm:h-56 rounded-full p-2 bg-gradient-to-br from-[#F5D0A9] via-[#C59268] to-[#603813] shadow-[0_0_45px_rgba(212,175,55,0.65)] ring-2 ring-amber-300/80 transform hover:scale-105 transition-transform duration-500">
          <div className="w-full h-full rounded-full overflow-hidden bg-caribbean-950 ring-2 ring-amber-300/70 flex items-center justify-center p-1">
            <img 
              src="/assets/Logo.png" 
              alt="D&H Real Estate Cancún - Sello Oficial Dorado" 
              className="w-full h-full object-contain rounded-full drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
            />
          </div>
        </div>

        {/* Narrative */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-bronze-500/20 text-bronze-300 border border-bronze-400/40 text-xs font-bold uppercase tracking-widest mb-3">
            <Award className="w-3.5 h-3.5 text-amber-300" />
            <span>Sello Oficial de Garantía Fiduciaria</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
            D&H Real Estate Cancún
          </h3>
          <p className="text-sm text-bronze-200 font-medium mb-3">
            Domínguez & Herrera • Asesoría Inmobiliaria y Jurídica Integral
          </p>
          <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
            Diseñado en cobre cepillado, oro y azul caribeño como símbolo de la solidez legal y la frescura patrimonial en Cancún y la Riviera Maya.
          </p>
        </div>

        <div className="pt-4 border-t border-caribbean-800 flex items-center justify-center gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-bronze-500 to-bronze-400 text-slate-950 font-bold text-xs uppercase tracking-wider hover:from-bronze-600 hover:to-bronze-500 transition-all shadow"
          >
            Cerrar Visor
          </button>
        </div>
      </div>
    </div>
  );
};
