import React from 'react';
import { PropertyFilterState, OperationType, PropertyCategory } from '../data/types';
import { Filter, RotateCcw, Home, Building2, MapPin } from 'lucide-react';

interface PropertyFiltersProps {
  filters: PropertyFilterState;
  setFilters: React.Dispatch<React.SetStateAction<PropertyFilterState>>;
  totalCount: number;
  filteredCount: number;
  onReset: () => void;
}

export const PropertyFilters: React.FC<PropertyFiltersProps> = ({
  filters,
  setFilters,
  totalCount,
  filteredCount,
  onReset
}) => {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/90 shadow-sm mb-8 space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-bronze-100 text-bronze-800">
            <Filter className="w-5 h-5" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-serif text-lg font-bold text-slate-900">Catálogo de Propiedades</h3>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-bronze-50 text-bronze-800 border border-bronze-200/80">
                Rentas y Ventas de menor a mayor precio
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Mostrando <span className="font-bold text-caribbean-900">{filteredCount}</span> de {totalCount} propiedades disponibles en inventario
            </p>
          </div>
        </div>

        <button
          onClick={onReset}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-bronze-700 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Restablecer Filtros</span>
        </button>
      </div>

      {/* Filter Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Operation */}
        <div>
          <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
            Tipo de Operación
          </label>
          <select
            value={filters.operation}
            onChange={(e) => setFilters(prev => ({ ...prev, operation: e.target.value as OperationType }))}
            className="w-full bg-sand-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-bronze-500"
          >
            <option value="Todos">Todas las Operaciones</option>
            <option value="Renta">Renta Mensual</option>
            <option value="Venta">Venta Patrimonial</option>
          </select>
        </div>

        {/* Property Type */}
        <div>
          <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
            Tipo de Inmueble
          </label>
          <select
            value={filters.propertyType}
            onChange={(e) => setFilters(prev => ({ ...prev, propertyType: e.target.value as PropertyCategory }))}
            className="w-full bg-sand-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-bronze-500"
          >
            <option value="Todos">Todos los Inmuebles</option>
            <option value="Casa">Casas Residenciales</option>
            <option value="Departamento">Departamentos</option>
          </select>
        </div>

        {/* City / Location */}
        <div>
          <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
            Destino / Ciudad
          </label>
          <select
            value={filters.city}
            onChange={(e) => setFilters(prev => ({ ...prev, city: e.target.value }))}
            className="w-full bg-sand-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-bronze-500"
          >
            <option value="">Todas las Ciudades</option>
            <option value="Cancún">Cancún</option>
            <option value="Playa del Carmen">Playa del Carmen</option>
          </select>
        </div>

        {/* Search Query */}
        <div>
          <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
            Búsqueda por Zona o Nombre
          </label>
          <input
            type="text"
            placeholder="Ej: Jardines del Sur, Punta Estrella..."
            value={filters.searchQuery}
            onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
            className="w-full bg-sand-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-bronze-500"
          />
        </div>
      </div>
    </div>
  );
};
