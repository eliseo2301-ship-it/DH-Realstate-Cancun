import React from 'react';
import { COMPANY_INFO } from '../content/company';
import { Mail, Phone, MapPin, ShieldCheck, Heart } from 'lucide-react';
import { FacebookIcon } from './Icons';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-caribbean-900 text-white border-t border-caribbean-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-bronze-400 to-bronze-200">
                <img src="/assets/Logo.png" alt="D&H Real Estate Cancún" className="w-full h-full object-cover rounded-full" />
              </div>
              <div>
                <span className="font-serif text-xl font-bold tracking-tight text-white block">
                  D&H Real Estate
                </span>
                <span className="text-[11px] text-bronze-300 uppercase tracking-widest block">
                  Cancún & Riviera Maya
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Firma inmobiliaria boutique y consultoría legal especializada. Protegiendo e impulsando las mejores inversiones habitacionales y patrimoniales en el Caribe Mexicano.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={COMPANY_INFO.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-caribbean-800 hover:bg-[#1877F2] text-white flex items-center justify-center transition-colors shadow"
                aria-label="Facebook oficial D&H Real Estate"
              >
                <FacebookIcon className="w-4 h-4 fill-white" />
              </a>
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="w-9 h-9 rounded-full bg-caribbean-800 hover:bg-bronze-500 hover:text-slate-950 text-white flex items-center justify-center transition-colors shadow"
                aria-label="Enviar correo a D&H Real Estate"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="font-serif text-sm font-bold text-bronze-300 uppercase tracking-wider mb-4">
              Navegación Rápida
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><a href="#catalogo" className="hover:text-white transition-colors">Catálogo de Propiedades</a></li>
              <li><a href="#servicios" className="hover:text-white transition-colors">Servicios Inmobiliarios y Legales</a></li>
              <li><a href="#filosofia" className="hover:text-white transition-colors">Filosofía, Misión y Visión</a></li>
              <li><a href="#fundadores" className="hover:text-white transition-colors">Fundadores (Alejandro y Reyna)</a></li>
              <li><a href="#contacto" className="hover:text-white transition-colors">Atención y Citas</a></li>
            </ul>
          </div>

          {/* Col 3: Legal & Trust */}
          <div>
            <h4 className="font-serif text-sm font-bold text-bronze-300 uppercase tracking-wider mb-4">
              Certeza Jurídica
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-bronze-400 shrink-0 mt-0.5" />
                <span>Dictamen jurídico y notarial previo de inmuebles</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-bronze-400 shrink-0 mt-0.5" />
                <span>Contratos de arrendamiento y compraventa blindados</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-bronze-400 shrink-0 mt-0.5" />
                <span>Acompañamiento hasta la firma notarial y entrega de llaves</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Direct Contacts */}
          <div>
            <h4 className="font-serif text-sm font-bold text-bronze-300 uppercase tracking-wider mb-4">
              Contacto Directo
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <p>
                <strong className="text-white block font-medium">Alejandro Herrera:</strong>
                <a href="tel:9987667484" className="text-bronze-300 hover:underline">998 766 7484</a>
              </p>
              <p>
                <strong className="text-white block font-medium">Reyna Domínguez:</strong>
                <a href="tel:5522707664" className="text-bronze-300 hover:underline">55 2270 7664</a>
              </p>
              <p>
                <strong className="text-white block font-medium">Correo:</strong>
                <a href={`mailto:${COMPANY_INFO.email}`} className="text-slate-300 hover:underline">
                  {COMPANY_INFO.email}
                </a>
              </p>
              <p className="text-[11px] text-slate-400 pt-1">
                Cancún, Quintana Roo, México
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-caribbean-800 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} D&H Real Estate Cancún. Todos los derechos reservados.</p>
          <p className="flex items-center gap-1 text-[11px]">
            <span>Canal Oficial:</span>
            <a 
              href={COMPANY_INFO.facebook} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-bronze-300 hover:text-white underline font-semibold"
            >
              facebook.com/dh.realstate
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
