import React, { useState } from 'react';
import { COMPANY_INFO } from '../content/company';
import { ShieldCheck, UserCheck, Compass, Scale, Sparkles, Award } from 'lucide-react';
import { GoldParticles } from './GoldParticles';
import { MedallionModal } from './MedallionModal';

export const PhilosophySection: React.FC = () => {
  const [medallionModalOpen, setMedallionModalOpen] = useState(false);

  const iconMap: Record<string, React.ReactNode> = {
    ShieldCheck: <ShieldCheck className="w-6 h-6 text-bronze-500" />,
    UserCheck: <UserCheck className="w-6 h-6 text-caribbean-500" />,
    Compass: <Compass className="w-6 h-6 text-bronze-500" />,
    Scale: <Scale className="w-6 h-6 text-caribbean-500" />,
  };

  return (
    <section id="filosofia" className="py-20 lg:py-28 bg-sand-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-bronze-100 border border-bronze-300 text-bronze-800 text-xs font-semibold uppercase tracking-widest mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>Nuestra Razón de Ser</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-4 sm:mb-6">
            Filosofía, Misión y Visión
          </h2>
          <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed px-2">
            Una propuesta inmobiliaria boutique concebida para brindar paz mental y rentabilidad en cada rincón del Caribe Mexicano.
          </p>
        </div>

        {/* Philosophy Highlight Quote Card (ONLY Golden Circle Visible - White Box Removed via Circular Clip-Path) */}
        <div className="bg-gradient-to-br from-caribbean-900 via-caribbean-950 to-[#061222] text-white rounded-3xl p-6 sm:p-10 lg:p-14 shadow-luxury border border-bronze-400/40 relative mb-16 overflow-hidden">
          {/* Interactive Floating Gold Particles Canvas */}
          <GoldParticles count={38} className="absolute inset-0 pointer-events-none" />

          {/* Centered Golden Watermark with high contrast & transparency */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
            <div className="w-72 h-72 sm:w-96 sm:h-96 md:w-[480px] md:h-[480px] aspect-square rounded-full overflow-hidden opacity-25 sm:opacity-20 transform scale-105 filter brightness-115 contrast-125">
              <img 
                src="/assets/Logo.png" 
                alt="D&H Sello Oficial Fondo" 
                className="w-full h-full object-contain rounded-full" 
              />
            </div>
            {/* Soft ambient golden glow around the circular medal */}
            <div className="absolute w-80 h-80 sm:w-[420px] sm:h-[420px] md:w-[500px] md:h-[500px] rounded-full bg-gradient-to-r from-amber-500/15 via-bronze-400/20 to-caribbean-400/15 blur-3xl pointer-events-none" />
          </div>

          {/* Content (Centered & Mobile Optimized) */}
          <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
            {/* Interactive Sello Oficial Medallion (Prominently visible on Mobile and Desktop) */}
            <div className="mb-6 relative group">
              <button
                type="button"
                onClick={() => setMedallionModalOpen(true)}
                className="relative focus:outline-none transition-transform duration-300 transform group-hover:scale-110 active:scale-95"
                title="Toca para ver el Sello Oficial D&H en alta resolución"
                aria-label="Ver Sello Oficial D&H Real Estate"
              >
                {/* Golden ambient halo pulse */}
                <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-amber-400 via-bronze-400 to-caribbean-400 opacity-70 blur-md group-hover:opacity-100 transition-all duration-500 animate-pulse pointer-events-none" />

                {/* Royal Golden Bezel Frame (Gold Contour - Zero White) */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1.5 bg-gradient-to-br from-[#F5D0A9] via-[#C59268] to-[#603813] shadow-[0_0_30px_rgba(212,175,55,0.6)] ring-2 ring-amber-300/80">
                  <div className="w-full h-full rounded-full overflow-hidden bg-caribbean-950 ring-1 ring-amber-300/70 flex items-center justify-center p-1 relative">
                    <img 
                      src="/assets/Logo.png" 
                      alt="D&H Sello Oficial Interactivo" 
                      className="w-full h-full object-contain rounded-full drop-shadow-md" 
                    />
                    {/* Metallic Light Sweep */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-all duration-1000 pointer-events-none" />
                  </div>
                </div>

                {/* Micro Sparkle Badge */}
                <span className="absolute -bottom-1 -right-1 bg-caribbean-950 border border-amber-300 text-amber-300 rounded-full p-1 shadow-lg">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                </span>
              </button>
            </div>

            {/* Main Philosophy Quote */}
            <blockquote className="font-serif text-xl sm:text-2xl lg:text-3xl font-medium text-white italic leading-relaxed sm:leading-snug mb-6 max-w-3xl">
              {COMPANY_INFO.philosophy.quote}
            </blockquote>

            {/* Philosophy Narrative */}
            <p className="text-xs sm:text-sm lg:text-base text-slate-300 leading-relaxed max-w-2xl mb-8">
              {COMPANY_INFO.philosophy.description}
            </p>

            {/* Centered Founders Credential Badge */}
            <div className="inline-flex items-center gap-3.5 px-4 py-2 rounded-2xl bg-caribbean-950/80 border border-bronze-400/50 shadow-md backdrop-blur-sm">
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full p-0.5 bg-gradient-to-tr from-[#F5D0A9] via-[#C59268] to-[#603813] ring-1 ring-amber-300/80 shrink-0 shadow overflow-hidden flex items-center justify-center">
                <img 
                  src="/assets/Logo.png" 
                  alt="D&H Real Estate" 
                  className="w-full h-full object-contain rounded-full" 
                />
              </div>
              <div className="text-left">
                <p className="text-xs sm:text-sm font-bold text-white tracking-wide">
                  D&H Real Estate Cancún
                </p>
                <p className="text-[11px] sm:text-xs text-bronze-300 font-medium">
                  Alejandro Herrera & Reyna Domínguez
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Modal for Sello Oficial */}
          <MedallionModal isOpen={medallionModalOpen} onClose={() => setMedallionModalOpen(false)} />
        </div>

        {/* Mission & Vision Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16">
          {/* Mission */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm relative group hover:border-bronze-400 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-bronze-50 border border-bronze-200 flex items-center justify-center mb-5 text-bronze-700">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 mb-3">
              {COMPANY_INFO.mission.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {COMPANY_INFO.mission.description}
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm relative group hover:border-caribbean-400 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-caribbean-50 border border-caribbean-200 flex items-center justify-center mb-5 text-caribbean-700">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 mb-3">
              {COMPANY_INFO.vision.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {COMPANY_INFO.vision.description}
            </p>
          </div>
        </div>

        {/* Values 4-Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {COMPANY_INFO.values.map((val, idx) => (
            <div key={idx} className="bg-white/90 backdrop-blur-sm p-5 sm:p-6 rounded-2xl border border-sand-200/80 shadow-sm hover:shadow-md transition-shadow">
              <div className="p-3 w-fit rounded-xl bg-sand-100 mb-4">
                {iconMap[val.icon] || <ShieldCheck className="w-6 h-6 text-bronze-500" />}
              </div>
              <h4 className="font-serif text-base font-bold text-slate-900 mb-2">{val.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
