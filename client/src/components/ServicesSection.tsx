import React from 'react';
import { COMPANY_INFO } from '../content/company';
import { KeyRound, Building, FileCheck2, TrendingUp, ArrowRight } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const icons = [
    <KeyRound className="w-6 h-6 text-bronze-600" />,
    <Building className="w-6 h-6 text-caribbean-600" />,
    <FileCheck2 className="w-6 h-6 text-emerald-600" />,
    <TrendingUp className="w-6 h-6 text-bronze-600" />
  ];

  return (
    <section id="servicios" className="py-20 lg:py-28 bg-sand-100/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-bronze-700 uppercase tracking-widest block mb-2">
            Portafolio de Soluciones
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-6">
            Servicios Inmobiliarios y Jurídicos
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Cubrimos cada requerimiento técnico, comercial y notarial para garantizar una experiencia sin fricciones ni sorpresas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COMPANY_INFO.services.map((svc, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-luxury hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-sand-50 border border-sand-200 flex items-center justify-center mb-5">
                  {icons[i]}
                </div>
                <span className="text-[11px] font-bold text-bronze-600 uppercase tracking-wider block mb-2">
                  {svc.tag}
                </span>
                <h3 className="font-serif text-lg font-bold text-slate-900 mb-2.5">
                  {svc.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  {svc.description}
                </p>
              </div>

              <a
                href={`https://wa.me/529987667484?text=${encodeURIComponent(`Hola Alejandro y Reyna, deseo solicitar informes sobre el servicio: ${svc.title}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-caribbean-700 hover:text-caribbean-900 pt-3 border-t border-slate-100"
              >
                <span>Solicitar Asesoría</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
