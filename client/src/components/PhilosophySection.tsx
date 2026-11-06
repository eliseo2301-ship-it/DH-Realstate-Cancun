import React from 'react';
import { COMPANY_INFO } from '../content/company';
import { ShieldCheck, UserCheck, Compass, Scale, Sparkles, Award } from 'lucide-react';
import { GoldParticles } from './GoldParticles';

export const PhilosophySection: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    ShieldCheck: <ShieldCheck className="w-6 h-6 text-bronze-500" />,
    UserCheck: <UserCheck className="w-6 h-6 text-caribbean-500" />,
    Compass: <Compass className="w-6 h-6 text-bronze-500" />,
    Scale: <Scale className="w-6 h-6 text-caribbean-500" />,
  };

  return (
    <section id="filosofia" className="py-20 lg:py-28 bg-sand-50 relative overflow-hidden">
      {/* Centered Section Background Watermark (Balanced & Centered on All Screens) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none">
        <div className="w-[320px] sm:w-[500px] md:w-[700px] aspect-square rounded-full opacity-[0.035] transform scale-105">
          <img 
            src="/assets/Logo.png" 
            alt="D&H Watermark" 
            className="w-full h-full object-contain mx-auto" 
          />
        </div>
      </div>

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

        {/* Philosophy Highlight Quote Card (Centered Logo Watermark + Interactive Moving Gold Particles) */}
        <div className="bg-gradient-to-br from-caribbean-900 via-caribbean-950 to-[#061222] text-white rounded-3xl p-6 sm:p-10 lg:p-14 shadow-luxury border border-bronze-400/40 relative mb-16 overflow-hidden">
          {/* Interactive Floating Gold Particles Canvas */}
          <GoldParticles count={38} className="absolute inset-0 pointer-events-none" />

          {/* Centered Medallion Watermark INSIDE the Card */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none z-0">
            <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-[420px] md:h-[420px] rounded-full opacity-[0.09] transform scale-110 blur-[0.3px]">
              <img 
                src="/assets/Logo.png" 
                alt="D&H Sello Oficial" 
                className="w-full h-full object-contain mx-auto" 
              />
            </div>
            {/* Subtle radial golden glow behind centered watermark */}
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-bronze-400/10 blur-3xl pointer-events-none" />
          </div>

          {/* Content (Mobile Optimized & Centered) */}
          <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
            {/* Quote Mark */}
            <div className="w-12 h-12 rounded-full bg-bronze-500/20 border border-bronze-400/30 flex items-center justify-center mb-6">
              <span className="text-bronze-300 font-serif text-3xl leading-none select-none">“</span>
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
            <div className="inline-flex items-center gap-3.5 px-4 py-2 rounded-2xl bg-caribbean-950/80 border border-bronze-400/40 shadow-md backdrop-blur-sm">
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full p-0.5 bg-gradient-to-tr from-bronze-400 to-amber-200 shrink-0 shadow">
                <img 
                  src="/assets/Logo.png" 
                  alt="D&H Real Estate" 
                  className="w-full h-full object-cover rounded-full" 
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
