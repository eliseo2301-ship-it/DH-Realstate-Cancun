import React, { useState } from 'react';
import { COMPANY_INFO } from '../content/company';
import { Phone, MessageCircle, Menu, X, PlusCircle, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onOpenAdmin: () => void;
  propertyCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin, propertyCount }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Propiedades', href: '#catalogo' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Filosofía & Misión', href: '#filosofia' },
    { label: 'Fundadores', href: '#fundadores' },
    { label: 'Contacto', href: '#contacto' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-caribbean-900/95 backdrop-blur-md border-b border-bronze-400/30 text-white shadow-xl">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-bronze-600 via-bronze-400 to-bronze-600 text-slate-900 text-xs font-semibold py-1.5 px-4 text-center tracking-wider uppercase flex items-center justify-center gap-2">
        <ShieldCheck className="w-4 h-4 text-slate-900" />
        <span>Boutique Inmobiliaria & Asesoría Jurídica Especializada en Cancún y Riviera Maya</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <a href="#" className="flex items-center gap-3.5 group">
            <div className="relative w-12 h-12 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-bronze-400 to-bronze-200 shadow-medallion transition-transform duration-300 group-hover:scale-105">
              <img 
                src="/assets/Logo.png" 
                alt="D&H Real Estate Cancún" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-1.5">
                D&H <span className="font-sans text-xs tracking-widest font-normal text-bronze-300 uppercase px-2 py-0.5 rounded border border-bronze-400/40">Real Estate</span>
              </span>
              <span className="text-[11px] tracking-wider text-caribbean-200 uppercase font-medium">
                Cancún & Riviera Maya
              </span>
            </div>
          </a>

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
              className="inline-flex items-center gap-1.5 text-xs text-caribbean-200 hover:text-white bg-caribbean-800/80 hover:bg-caribbean-800 border border-caribbean-700 px-3 py-2 rounded-lg transition-all"
              title="Panel de actualización semanal de inventario"
            >
              <PlusCircle className="w-3.5 h-3.5 text-bronze-300" />
              <span>Gestión Semanal</span>
            </button>

            {/* Direct WhatsApp Call */}
            <a
              href={`https://wa.me/529987667484?text=${encodeURIComponent('Hola Alejandro y Reyna, visito dhrealstate.com y deseo informes sobre propiedades disponibles.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-bronze-500 to-bronze-400 hover:from-bronze-600 hover:to-bronze-500 text-slate-950 font-semibold px-4 py-2 rounded-lg text-sm shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950" />
              <span>WhatsApp Directo</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-200 hover:text-white hover:bg-caribbean-800 focus:outline-none"
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
              <span>Panel de Gestión de Propiedades</span>
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
  );
};
