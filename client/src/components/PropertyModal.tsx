import React, { useState } from 'react';
import { Property } from '../data/types';
import { X, ChevronLeft, ChevronRight, Bed, Bath, Car, MapPin, CheckCircle2, ShieldCheck, MessageCircle, Phone, Mail, Share2 } from 'lucide-react';

interface PropertyModalProps {
  property: Property | null;
  onClose: () => void;
}

export const PropertyModal: React.FC<PropertyModalProps> = ({ property, onClose }) => {
  if (!property) return null;

  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const images = property.images && property.images.length > 0 ? property.images : ['/assets/Logo.png'];

  const nextPhoto = () => {
    setActivePhotoIndex((prev) => (prev + 1) % images.length);
  };

  const prevPhoto = () => {
    setActivePhotoIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: property.currency || 'MXN',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Mira esta propiedad en D&H Real Estate Cancún: ${property.title}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('¡Enlace copiado al portapapeles!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 lg:p-6 animate-fadeIn">
      <div 
        className="relative bg-white w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl border border-bronze-300/40 my-8 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header with Title and Close Button */}
        <div className="px-6 py-4 bg-caribbean-900 text-white flex items-center justify-between border-b border-caribbean-800">
          <div className="flex items-center gap-2">
            <span className="bg-bronze-500 text-slate-950 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase">
              {property.operation}
            </span>
            <span className="text-xs text-caribbean-200">Ref: {property.id}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-full text-slate-300 hover:text-white hover:bg-caribbean-800 transition-colors"
              title="Compartir propiedad"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-300 hover:text-white hover:bg-caribbean-800 transition-colors"
              title="Cerrar ventana"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Main Gallery Area */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-900 group">
              <img
                src={images[activePhotoIndex]}
                alt={`${property.title} - Foto ${activePhotoIndex + 1}`}
                className="w-full h-full object-contain"
              />

              {/* Navigation Controls */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevPhoto}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white transition-all backdrop-blur-sm"
                    aria-label="Foto anterior"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextPhoto}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white transition-all backdrop-blur-sm"
                    aria-label="Siguiente foto"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Photo Counter */}
              <div className="absolute bottom-3 right-3 bg-slate-950/80 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                Foto {activePhotoIndex + 1} de {images.length}
              </div>
            </div>

            {/* Thumbnail Strip */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActivePhotoIndex(idx)}
                    className={`relative w-20 h-14 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                      idx === activePhotoIndex
                        ? 'border-bronze-500 scale-95 shadow'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Pricing and Location Headline */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-1.5 text-slate-500 text-sm mb-1.5">
                <MapPin className="w-4 h-4 text-bronze-600" />
                <span>{property.location.address}, {property.location.zone}, {property.location.city}, {property.location.state}</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                {property.title}
              </h2>
            </div>

            <div className="text-left md:text-right shrink-0">
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold block">Inversión</span>
              <div className="font-sans text-3xl font-black text-caribbean-900">
                {formatPrice(property.price)}
                {property.period === 'mensual' && <span className="text-sm font-normal text-slate-600"> / mes</span>}
              </div>
            </div>
          </div>

          {/* Key Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-xl bg-sand-50 border border-sand-200 text-center">
              <Bed className="w-5 h-5 mx-auto text-bronze-600 mb-1" />
              <p className="text-xs text-slate-500">Recámaras</p>
              <p className="text-lg font-bold text-slate-900">{property.specs.bedrooms}</p>
            </div>

            <div className="p-4 rounded-xl bg-sand-50 border border-sand-200 text-center">
              <Bath className="w-5 h-5 mx-auto text-bronze-600 mb-1" />
              <p className="text-xs text-slate-500">Baños</p>
              <p className="text-lg font-bold text-slate-900">{property.specs.bathrooms}</p>
            </div>

            <div className="p-4 rounded-xl bg-sand-50 border border-sand-200 text-center">
              <Car className="w-5 h-5 mx-auto text-bronze-600 mb-1" />
              <p className="text-xs text-slate-500">Estacionamiento</p>
              <p className="text-lg font-bold text-slate-900">{property.specs.parking}</p>
            </div>

            <div className="p-4 rounded-xl bg-sand-50 border border-sand-200 text-center">
              <ShieldCheck className="w-5 h-5 mx-auto text-bronze-600 mb-1" />
              <p className="text-xs text-slate-500">Estatus Legal</p>
              <p className="text-sm font-bold text-emerald-700">Dictamen Verificado</p>
            </div>
          </div>

          {/* Description & Features */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
            <div className="lg:col-span-2 space-y-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-slate-900 mb-2">Descripción de la Propiedad</h3>
                <p className="text-sm text-slate-700 leading-relaxed bg-sand-50/50 p-4 rounded-xl border border-sand-200/60">
                  {property.highlight}
                </p>
              </div>

              <div>
                <h3 className="font-serif text-lg font-bold text-slate-900 mb-3">Características y Amenidades</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {property.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-caribbean-500 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Direct Contact Sidebar */}
            <div className="bg-gradient-to-br from-caribbean-900 to-caribbean-950 text-white p-5 rounded-2xl border border-bronze-400/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden p-0.5 bg-bronze-400">
                    <img src="/assets/Logo.png" alt="D&H" className="w-full h-full object-cover rounded-full" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-bold text-white">D&H Real Estate</h4>
                    <p className="text-[11px] text-bronze-300">Asesoría Directa</p>
                  </div>
                </div>

                <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                  Agenda una visita privada o solicita el expediente legal completo de esta propiedad directamente con nuestros socios fundadores.
                </p>

                {/* Direct Founders Contact Buttons */}
                <div className="space-y-2.5">
                  <a
                    href={`https://wa.me/529987667484?text=${encodeURIComponent(
                      `Hola Alejandro, me interesa agendar cita o informes sobre: "${property.title}" (Ref: ${property.id}).`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-bronze-500/20 hover:bg-bronze-500/30 border border-bronze-400/40 text-xs font-semibold text-bronze-200 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-emerald-400" />
                      <span>Alejandro Herrera</span>
                    </div>
                    <span className="text-[10px] text-slate-400">998 766 7484</span>
                  </a>

                  <a
                    href={`https://wa.me/525522707664?text=${encodeURIComponent(
                      `Hola Reyna, deseo consultar el expediente jurídico e informes de: "${property.title}" (Ref: ${property.id}).`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-caribbean-800/80 hover:bg-caribbean-800 border border-caribbean-700 text-xs font-semibold text-white transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-emerald-400" />
                      <span>Reyna Domínguez</span>
                    </div>
                    <span className="text-[10px] text-slate-400">55 2270 7664</span>
                  </a>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-caribbean-800 text-[11px] text-slate-400 text-center">
                <p>Correo oficial: <span className="text-slate-200">dh.realstate.cun@gmail.com</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
