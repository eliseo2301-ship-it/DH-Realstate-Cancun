import React from 'react';
import { COMPANY_INFO } from '../content/company';
import { Phone, MessageCircle, Mail, ShieldCheck, Scale, QrCode } from 'lucide-react';

export const FoundersSection: React.FC = () => {
  return (
    <section id="fundadores" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-caribbean-50 border border-caribbean-200 text-caribbean-800 text-xs font-semibold uppercase tracking-widest mb-4">
            <Scale className="w-3.5 h-3.5 text-caribbean-600" />
            <span>Liderazgo y Respaldo Fiduciario</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-6">
            Nuestros Fundadores
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Alejandro Herrera y Reyna Domínguez combinan la pasión por el corretaje de alto nivel con la formación jurídica indispensable para salvaguardar tu patrimonio en Quintana Roo.
          </p>
        </div>

        {/* Founders Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {COMPANY_INFO.founders.map((founder, index) => (
            <div 
              key={index}
              className="bg-sand-50 rounded-3xl overflow-hidden border border-bronze-300/40 shadow-luxury hover:shadow-luxury-hover transition-all duration-300 flex flex-col justify-between"
            >
              {/* Card Header & Real Business Card Preview */}
              <div>
                <div className="p-4 sm:p-6 bg-slate-900 border-b border-bronze-400/20">
                  <div className="relative rounded-xl overflow-hidden shadow-md border border-bronze-400/40 group">
                    <img 
                      src={founder.cardImage} 
                      alt={`Tarjeta de presentación - ${founder.name}`} 
                      className="w-full h-auto object-cover transform group-hover:scale-102 transition-transform duration-300"
                    />
                    <div className="absolute bottom-2 right-2 bg-slate-950/80 text-[10px] text-bronze-200 px-2 py-0.5 rounded backdrop-blur-sm flex items-center gap-1">
                      <QrCode className="w-3 h-3" />
                      <span>Tarjeta Oficial D&H</span>
                    </div>
                  </div>
                </div>

                {/* Profile Details */}
                <div className="p-6 sm:p-8 space-y-4">
                  <div>
                    <span className="text-xs font-bold text-bronze-700 uppercase tracking-widest block mb-1">
                      {founder.role}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                      {founder.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-caribbean-700 mt-1">
                      {founder.specialty}
                    </p>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {founder.bio}
                  </p>

                  <div className="pt-2 flex items-center gap-2 text-xs text-slate-500">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Asesoría personalizada y seguimiento legal directo en Cancún</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 sm:p-8 pt-0 flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/52${founder.phone}?text=${encodeURIComponent(founder.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold py-3 px-4 rounded-xl text-xs sm:text-sm shadow transition-all duration-200"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>WhatsApp: {founder.phoneDisplay}</span>
                </a>

                <a
                  href={`tel:${founder.phone}`}
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-800 font-semibold py-3 px-4 rounded-xl text-xs sm:text-sm border border-slate-300 transition-colors"
                >
                  <Phone className="w-4 h-4 text-bronze-600" />
                  <span>Llamar</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
