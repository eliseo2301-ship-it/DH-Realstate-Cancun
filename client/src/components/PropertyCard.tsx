import React from 'react';
import { Property } from '../data/types';
import { MapPin, Bed, Bath, Car, Maximize2, MessageCircle, Eye, ShieldCheck } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  onSelect: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, onSelect }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: property.currency || 'MXN',
      maximumFractionDigits: 0
    }).format(price);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Disponible':
        return <span className="bg-emerald-600/90 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">Disponible</span>;
      case 'Apartada':
        return <span className="bg-amber-600/90 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">Apartada</span>;
      case 'Rentada':
        return <span className="bg-slate-700/90 text-slate-200 text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">Rentada</span>;
      case 'Vendida':
        return <span className="bg-rose-700/90 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">Vendida</span>;
      default:
        return null;
    }
  };

  const defaultAdvisor = property.advisors && property.advisors[0] ? property.advisors[0] : { phone: '9987667484' };
  const whatsappUrl = `https://wa.me/52${defaultAdvisor.phone}?text=${encodeURIComponent(
    `Hola, me interesa solicitar informes y agendar una visita para la propiedad: "${property.title}" (Ref: ${property.id}).`
  )}`;

  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 hover:border-bronze-400/60 shadow-luxury hover:shadow-luxury-hover transition-all duration-300 flex flex-col justify-between">
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 cursor-pointer" onClick={() => onSelect(property)}>
        <img
          src={property.mainImage || (property.images && property.images[0]) || '/assets/Logo.png'}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Floating Tags */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className="bg-caribbean-900/85 text-bronze-200 border border-bronze-400/40 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
            {property.operation}
          </span>
          {property.specs.furnished && (
            <span className="bg-bronze-500/90 text-slate-950 font-semibold text-[11px] px-2.5 py-1 rounded-full backdrop-blur-sm">
              {typeof property.specs.furnished === 'string' ? property.specs.furnished : 'Amueblada'}
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3 z-10">
          {getStatusBadge(property.status)}
        </div>

        {/* Hover quick overlay with photo count */}
        <div className="absolute bottom-3 right-3 z-10 bg-slate-900/75 text-white text-xs px-2.5 py-1 rounded-lg backdrop-blur-sm flex items-center gap-1.5">
          <Eye className="w-3.5 h-3.5 text-caribbean-300" />
          <span>{property.images ? property.images.length : 1} fotos</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-2">
            <MapPin className="w-3.5 h-3.5 text-bronze-600 shrink-0" />
            <span className="truncate">{property.location.zone}, {property.location.city}</span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onSelect(property)} 
            className="font-serif text-lg font-bold text-slate-900 hover:text-bronze-700 transition-colors line-clamp-2 cursor-pointer mb-2.5"
            title={property.title}
          >
            {property.title}
          </h3>

          {/* Price */}
          <div className="mb-4 flex items-baseline gap-1.5">
            <span className="font-sans text-2xl font-extrabold text-caribbean-900">
              {formatPrice(property.price)}
            </span>
            {property.period === 'mensual' && (
              <span className="text-xs text-slate-500 font-medium">/ mes</span>
            )}
          </div>

          {/* Key Specs Pills */}
          <div className="grid grid-cols-3 gap-2 py-3 px-3 rounded-xl bg-sand-50 border border-sand-200/80 mb-4 text-slate-700 text-xs">
            <div className="flex items-center gap-1.5">
              <Bed className="w-4 h-4 text-bronze-500 shrink-0" />
              <span>{property.specs.bedrooms} Rec.</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="w-4 h-4 text-bronze-500 shrink-0" />
              <span>{property.specs.bathrooms} Baños</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Car className="w-4 h-4 text-bronze-500 shrink-0" />
              <span>{property.specs.parking} Est.</span>
            </div>
          </div>

          {/* Highlight snippet */}
          <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
            {property.highlight}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
          <button
            onClick={() => onSelect(property)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 bg-caribbean-900 hover:bg-caribbean-800 text-white font-medium text-xs py-2.5 px-3 rounded-xl transition-colors duration-200"
          >
            <Maximize2 className="w-3.5 h-3.5 text-caribbean-300" />
            <span>Ver Ficha Completa</span>
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center p-2.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors"
            title="Preguntar por WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
        </div>
      </div>
    </article>
  );
};
