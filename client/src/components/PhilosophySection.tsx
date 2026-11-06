import React from 'react';
import { COMPANY_INFO } from '../content/company';
import { ShieldCheck, UserCheck, Compass, Scale, Sparkles, Award } from 'lucide-react';

export const PhilosophySection: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    ShieldCheck: <ShieldCheck className="w-6 h-6 text-bronze-500" />,
    UserCheck: <UserCheck className="w-6 h-6 text-caribbean-500" />,
    Compass: <Compass className="w-6 h-6 text-bronze-500" />,
    Scale: <Scale className="w-6 h-6 text-caribbean-500" />,
  };

  return (
    <section id="filosofia" className="py-20 lg:py-28 bg-sand-50 relative overflow-hidden">
      {/* Decorative background watermark */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none translate-x-1/3">
        <img src="/assets/Logo.png" alt="D&H Watermark" className="w-[800px] h-[800px] object-contain" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-bronze-100 border border-bronze-300 text-bronze-800 text-xs font-semibold uppercase tracking-widest mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>Nuestra Razón de Ser</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-6">
            Filosofía, Misión y Visión
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Una propuesta inmobiliaria boutique concebida para brindar paz mental y rentabilidad en cada rincón del Caribe Mexicano.
          </p>
        </div>

        {/* Philosophy Highlight Quote Card */}
        <div className="bg-gradient-to-br from-caribbean-900 to-caribbean-950 text-white rounded-3xl p-8 sm:p-12 shadow-luxury border border-bronze-400/40 relative mb-16 overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-bronze-400/10 blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl">
            <span className="text-bronze-300 font-serif text-5xl leading-none select-none">“</span>
            <blockquote className="font-serif text-xl sm:text-2xl lg:text-3xl font-medium text-white italic leading-relaxed mb-6">
              {COMPANY_INFO.philosophy.quote}
            </blockquote>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              {COMPANY_INFO.philosophy.description}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-bronze-400 p-0.5">
                <img src="/assets/Logo.png" alt="D&H" className="w-full h-full object-cover rounded-full" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">D&H Real Estate Cancún</p>
                <p className="text-xs text-bronze-300">Alejandro Herrera & Reyna Domínguez</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Mission */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200/90 shadow-sm relative group hover:border-bronze-400 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-bronze-50 border border-bronze-200 flex items-center justify-center mb-5 text-bronze-700">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-slate-900 mb-3">{COMPANY_INFO.mission.title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {COMPANY_INFO.mission.description}
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200/90 shadow-sm relative group hover:border-caribbean-400 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-caribbean-50 border border-caribbean-200 flex items-center justify-center mb-5 text-caribbean-700">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-slate-900 mb-3">{COMPANY_INFO.vision.title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {COMPANY_INFO.vision.description}
            </p>
          </div>
        </div>

        {/* Values 4-Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {COMPANY_INFO.values.map((val, idx) => (
            <div key={idx} className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-sand-200/80 shadow-sm hover:shadow-md transition-shadow">
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
