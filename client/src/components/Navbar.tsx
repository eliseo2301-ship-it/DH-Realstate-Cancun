import React, { useState } from 'react';
import { COMPANY_INFO } from '../content/company';
import { Phone, MessageCircle, Menu, X, PlusCircle, ShieldCheck, Sparkles, Award } from 'lucide-react';
import { MedallionModal } from './MedallionModal';

interface NavbarProps {
  onOpenAdmin: () => void;
  propertyCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin, propertyCount }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [medallionModalOpen, setMedallionModalOpen] = useState(false);

  const navLinks = [
    { label: 'Propiedades', href: '#catalogo' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Filosofía & Misión', href: '#filosofia' },
    { label: 'Fundadores', href: '#fundadores' },
    { label: 'Contacto', href: '#contacto' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-caribbean-900/95 backdrop-blur-md border-b border-bronze-400/30 text-white shadow-xl">
        {/* Top Banner */}
        <div className="bg-gradient-to-r from-bronze-600 via-bronze-400 to-bronze-600 text-slate-900 text-xs font-semibold py-1.5 px-4 text-center tracking-wider uppercase flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-slate-900" />
          <span>Boutique Inmobiliaria & Asesoría Jurídica Especializada en Cancún y Riviera Maya</span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-24">
            {/* Logo & Brand (Interactive & Luxury Styled) */}
            <div className="flex items-center gap-3.5 sm:gap-4">
              {/* Interactive Medallion Button */}
              <button
                onClick={() => setMedallionModalOpen(true)}
                className="relative group focus:outline-none"
                title="Haz clic para ver el Sello Oficial D&H en alta resolución"
                aria-label="Ver Sello Oficial D&H Real Estate"
              >
                {/* Ambient Halo Glow */}
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-bronze-400 via-amber-300 to-caribbean-400 opacity-60 blur-sm group-hover:opacity-100 group-hover:blur-md transition-all duration-500 animate-pulse" />
                
                {/* Metallic Bezel Coin Frame (Golden Contour - Zero White) */}
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full p-1 bg-gradient-to-br from-[#F5D0A9] via-[#C59268] to-[#603813] shadow-[0_0_24px_rgba(212,175,55,0.55)] ring-1 ring-amber-300/80 transform group-hover:scale-108 group-hover:rotate-3 transition-all duration-300">
                  <div className="w-full h-full rounded-full overflow-hidden bg-caribbean-950 ring-1 ring-amber-300/60 relative flex items-center justify-center p-0.5">
                    <img 
                      src="/assets/Logo.png" 
                      alt="D&H Real Estate Cancún" 
                      className="w-full h-full object-contain rounded-full transform group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Metallic Shimmer Light Sweep on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/35 to-transparent opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out pointer-events-none" />
                  </div>
                </div>

                {/* Floating Micro Badge */}
                <span className="absolute -bottom-1 -right-1 bg-caribbean-950 border border-bronze-400 text-bronze-300 rounded-full p-0.5 shadow">
                  <Sparkles className="w-2.5 h-2.5" />
                </span>
              </button>

              {/* Brand Typography */}
              <a href="#" className="flex flex-col group/brand">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-amber-100 to-bronze-300 bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(197,146,104,0.3)]">
                    D&H
                  </span>
                  <span className="text-[10px] sm:text-xs tracking-[0.2em] font-bold text-bronze-200 uppercase px-2.5 py-0.5 rounded-full bg-gradient-to-r from-bronze-950/70 to-caribbean-950/70 border border-bronze-400/50 shadow-inner backdrop-blur-xs">
                    REAL ESTATE
                  </span>
                </div>
                <span className="text-[11px] sm:text-xs tracking-[0.22em] text-caribbean-300 uppercase font-semibold flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-caribbean-400 shadow-[0_0_6px_#00b4d8] animate-pulse inline-block" />
                  CANCÚN & RIVIERA MAYA
                </span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-slate-200 hover:text-bronze-300 transition-colors duration-200 py-1"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Quick Admin Toggle */}
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 text-xs text-caribbean-200 hover:text-white bg-caribbean-800/80 hover:bg-caribbean-800 border border-caribbean-700 px-3.5 py-2.5 rounded-xl transition-all shadow-sm"
                title="Panel de actualización semanal de inventario"
              >
                <PlusCircle className="w-4 h-4 text-bronze-300" />
                <span>Gestión Semanal</span>
                <span className="ml-1 px-1.5 py-0.2 bg-bronze-500/20 text-bronze-300 rounded text-[10px] font-bold">
                  {propertyCount}
                </span>
              </button>

              {/* Direct WhatsApp Call */}
              <a
                href={`https://wa.me/529987667484?text=${encodeURIComponent('Hola Alejandro y Reyna, visito dhrealstate.com y deseo informes sobre propiedades disponibles.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-bronze-500 to-bronze-400 hover:from-bronze-600 hover:to-bronze-500 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950" />
                <span>WhatsApp Directo</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl text-slate-200 hover:text-white hover:bg-caribbean-800 focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-caribbean-900 border-b border-caribbean-800 px-4 pt-3 pb-6 space-y-3">
            <div className="grid gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-caribbean-800 hover:text-bronze-300"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-caribbean-800 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium bg-caribbean-800 text-caribbean-200 rounded-lg border border-caribbean-700"
              >
                <PlusCircle className="w-4 h-4 text-bronze-300" />
                <span>Panel de Gestión de Propiedades ({propertyCount})</span>
              </button>

              <a
                href={`https://wa.me/529987667484?text=${encodeURIComponent('Hola Alejandro y Reyna, me gustaría recibir atención personalizada con D&H Real Estate.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold bg-gradient-to-r from-bronze-500 to-bronze-400 text-slate-950 rounded-lg shadow"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Contactar a Alejandro Herrera</span>
              </a>

              <a
                href={`https://wa.me/525522707664?text=${encodeURIComponent('Hola Reyna, me comunico para una consulta inmobiliaria y legal.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold bg-caribbean-700 text-white rounded-lg"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Contactar a Reyna Domínguez</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Interactive Medallion Showcase Modal */}
      <MedallionModal isOpen={medallionModalOpen} onClose={() => setMedallionModalOpen(false)} />
    </>
  );
};
