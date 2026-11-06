import React from 'react';
import { Search, Shield, MapPin, Building, Key, Sparkles, CheckCircle2 } from 'lucide-react';
import { PropertyFilterState, OperationType } from '../data/types';

interface HeroProps {
  filters: PropertyFilterState;
  setFilters: React.Dispatch<React.SetStateAction<PropertyFilterState>>;
  onSearch: () => void;
}

export const Hero: React.FC<HeroProps> = ({ filters, setFilters, onSearch }) => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-caribbean-900 text-white">
      {/* Background with luxury tropical gradient & ambient overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30 transform scale-105 transition-transform duration-1000"
          style={{
            backgroundImage: "url('/properties/depto-palma-del-mar-contoy/photo-1.jpeg')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-caribbean-900/90 via-caribbean-900/75 to-caribbean-900" />
        
        {/* Subtle decorative radiant rings representing luxury medallion */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-bronze-400/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-caribbean-400/10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center flex flex-col items-center">
        {/* Prestige Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-bronze-400/15 border border-bronze-400/40 text-bronze-200 text-xs sm:text-sm font-medium mb-6 backdrop-blur-sm">
          <Sparkles className="w-4 h-4 text-bronze-300" />
          <span>Firma Inmobiliaria Boutique • Cancún & Riviera Maya</span>
        </div>

        {/* Hero Title */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-4xl leading-tight sm:leading-none mb-6">
          Tu patrimonio en el Caribe, con <span className="gold-gradient-text italic">absoluta certeza jurídica</span> y exclusividad.
        </h1>

        {/* Narrative */}
        <p className="max-w-2xl text-slate-300 text-base sm:text-lg mb-10 font-normal leading-relaxed">
          Fundada y liderada por <strong className="text-white font-semibold">Alejandro Herrera</strong> y <strong className="text-white font-semibold">Reyna Domínguez</strong>. 
          Asesores inmobiliarios y abogados especialistas dedicados a proteger y hacer florecer tu inversión en Quintana Roo.
        </p>

        {/* Search & Filter Bar */}
        <div className="w-full max-w-4xl glass-card-dark p-4 sm:p-6 rounded-2xl shadow-luxury-hover border border-bronze-400/30">
          {/* Operation Selector */}
          <div className="flex items-center justify-center gap-2 mb-4">
            {(['Todos', 'Renta', 'Venta'] as OperationType[]).map((op) => (
              <button
                key={op}
                onClick={() => setFilters(prev => ({ ...prev, operation: op }))}
                className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  filters.operation === op
                    ? 'bg-gradient-to-r from-bronze-500 to-bronze-400 text-slate-950 shadow-md'
                    : 'bg-caribbean-800/60 text-slate-300 hover:bg-caribbean-800 hover:text-white border border-caribbean-700/60'
                }`}
              >
                {op === 'Todos' ? 'Todas las Operaciones' : op === 'Renta' ? 'Propiedades en Renta' : 'Propiedades en Venta'}
              </button>
            ))}
          </div>

          {/* Quick Input Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Search keyword */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-caribbean-300" />
              <input
                type="text"
                placeholder="Buscar por zona o nombre..."
                value={filters.searchQuery}
                onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                className="w-full bg-caribbean-950/80 border border-caribbean-700/80 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-bronze-400 transition-colors"
              />
            </div>

            {/* City selection */}
            <div className="relative">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-caribbean-300" />
              <select
                value={filters.city}
                onChange={(e) => setFilters(prev => ({ ...prev, city: e.target.value }))}
                className="w-full bg-caribbean-950/80 border border-caribbean-700/80 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-bronze-400 appearance-none cursor-pointer"
              >
                <option value="">Todas las Ciudades</option>
                <option value="Cancún">Cancún</option>
                <option value="Playa del Carmen">Playa del Carmen</option>
                <option value="Riviera Maya">Riviera Maya</option>
              </select>
            </div>

            {/* Submit Action */}
            <button
              onClick={onSearch}
              className="w-full bg-gradient-to-r from-bronze-400 via-bronze-500 to-bronze-600 hover:from-bronze-500 hover:to-bronze-700 text-slate-950 font-bold py-3 px-6 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-bronze-500/20 transition-all duration-300 transform active:scale-[0.98]"
            >
              <Search className="w-4 h-4 text-slate-950" />
              <span>Explorar Catálogo</span>
            </button>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-left max-w-4xl w-full">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-caribbean-950/40 border border-caribbean-800/40">
            <Shield className="w-6 h-6 text-bronze-300 shrink-0" />
            <div>
              <p className="text-xs font-semibold text-white">Blindaje Jurídico</p>
              <p className="text-[11px] text-slate-400">Revisión notarial y legal</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-caribbean-950/40 border border-caribbean-800/40">
            <CheckCircle2 className="w-6 h-6 text-caribbean-300 shrink-0" />
            <div>
              <p className="text-xs font-semibold text-white">Inventario Verificado</p>
              <p className="text-[11px] text-slate-400">Fotos y datos 100% reales</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-caribbean-950/40 border border-caribbean-800/40">
            <Building className="w-6 h-6 text-bronze-300 shrink-0" />
            <div>
              <p className="text-xs font-semibold text-white">Zonas de Alta Plusvalía</p>
              <p className="text-[11px] text-slate-400">Cancún y Riviera Maya</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-caribbean-950/40 border border-caribbean-800/40">
            <Key className="w-6 h-6 text-caribbean-300 shrink-0" />
            <div>
              <p className="text-xs font-semibold text-white">Trato Directo</p>
              <p className="text-[11px] text-slate-400">Con Alejandro y Reyna</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
