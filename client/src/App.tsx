import React, { useState, useEffect, useMemo } from 'react';
import initialProperties from './data/properties.json';
import { Property, PropertyFilterState, PropertyStatus } from './data/types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PropertyFilters } from './components/PropertyFilters';
import { PropertyCard } from './components/PropertyCard';
import { PropertyModal } from './components/PropertyModal';
import { PhilosophySection } from './components/PhilosophySection';
import { FoundersSection } from './components/FoundersSection';
import { ServicesSection } from './components/ServicesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminPropertyModal } from './components/AdminPropertyModal';
import { MessageCircle, Sparkles, Building2 } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'dh_properties_active_v2';

// Load from localStorage first to preserve all user deletions and edits
const loadSavedProperties = (): Property[] => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error loading custom properties from localStorage:', e);
  }
  return initialProperties as Property[];
};

export function App() {
  const [properties, setProperties] = useState<Property[]>(loadSavedProperties);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Filters State
  const initialFilterState: PropertyFilterState = {
    operation: 'Todos',
    propertyType: 'Todos',
    city: '',
    minPrice: 0,
    maxPrice: 0,
    bedrooms: '',
    searchQuery: '',
  };
  const [filters, setFilters] = useState<PropertyFilterState>(initialFilterState);

  // Safe updater that always syncs state and localStorage
  const updateAndPersistProperties = (newProps: Property[]) => {
    setProperties(newProps);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newProps));
    } catch (e) {
      console.error('Error saving to localStorage:', e);
    }
  };

  // Fetch from API if running, only updating if no custom user deletions exist
  const fetchProperties = async () => {
    try {
      const res = await fetch('/api/properties');
      if (res.ok) {
        const data = await res.json();
        if (data.data && Array.isArray(data.data) && data.data.length > 0) {
          // If the user already has custom local edits, keep them!
          const hasLocalCustom = localStorage.getItem(LOCAL_STORAGE_KEY);
          if (!hasLocalCustom) {
            updateAndPersistProperties(data.data);
          }
        }
      }
    } catch {
      // Backend not running (static mode) - fallback is already loaded
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  // Filtered properties memoization
  const filteredProperties = useMemo(() => {
    return properties.filter((prop) => {
      if (filters.operation !== 'Todos' && prop.operation !== filters.operation) {
        return false;
      }
      if (filters.propertyType !== 'Todos' && prop.propertyType !== filters.propertyType) {
        return false;
      }
      if (filters.city && !prop.location.city.toLowerCase().includes(filters.city.toLowerCase())) {
        return false;
      }
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matchTitle = prop.title.toLowerCase().includes(q);
        const matchZone = prop.location.zone.toLowerCase().includes(q);
        const matchCity = prop.location.city.toLowerCase().includes(q);
        const matchHighlight = prop.highlight.toLowerCase().includes(q);
        if (!matchTitle && !matchZone && !matchCity && !matchHighlight) {
          return false;
        }
      }
      return true;
    });
  }, [properties, filters]);

  // Admin Actions
  const handleAddProperty = async (newPropData: Partial<Property>): Promise<boolean> => {
    try {
      const res = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPropData),
      });

      if (res.ok) {
        const json = await res.json();
        const updated = [json.data, ...properties];
        updateAndPersistProperties(updated);
        return true;
      }
    } catch {
      // Offline fallback
    }

    const fallbackCreated: Property = {
      ...(newPropData as any),
      id: 'prop-' + Date.now().toString(36),
      status: 'Disponible',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updated = [fallbackCreated, ...properties];
    updateAndPersistProperties(updated);
    return true;
  };

  const handleUpdateProperty = async (id: string, updatedData: Partial<Property>): Promise<boolean> => {
    try {
      const res = await fetch(`/api/properties/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      if (res.ok) {
        const json = await res.json();
        const updated = properties.map((p) => (p.id === id ? { ...p, ...json.data } : p));
        updateAndPersistProperties(updated);
        return true;
      }
    } catch {
      // Offline fallback
    }

    const updated = properties.map((p) => (p.id === id ? { ...p, ...updatedData } : p));
    updateAndPersistProperties(updated);
    return true;
  };

  const handleUpdateStatus = async (id: string, status: PropertyStatus): Promise<boolean> => {
    try {
      const res = await fetch(`/api/properties/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        const updated = properties.map((p) => (p.id === id ? { ...p, status } : p));
        updateAndPersistProperties(updated);
        return true;
      }
    } catch {
      // Offline
    }

    const updated = properties.map((p) => (p.id === id ? { ...p, status } : p));
    updateAndPersistProperties(updated);
    return true;
  };

  const handleDeleteProperty = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/properties/${id}`, { method: 'DELETE' });
      if (res.ok) {
        const updated = properties.filter((p) => p.id !== id);
        updateAndPersistProperties(updated);
        return true;
      }
    } catch {
      // Offline
    }

    const updated = properties.filter((p) => p.id !== id);
    updateAndPersistProperties(updated);
    return true;
  };

  const handleResetFilters = () => {
    setFilters(initialFilterState);
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('catalogo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-sand-50 selection:bg-bronze-200 selection:text-slate-950 font-sans">
      {/* Navigation with Enhanced Interactive Logo */}
      <Navbar onOpenAdmin={() => setIsAdminOpen(true)} propertyCount={properties.length} />

      {/* Hero with interactive search */}
      <Hero filters={filters} setFilters={setFilters} onSearch={scrollToCatalog} />

      {/* Main Catalog Section */}
      <main id="catalogo" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1">
        <PropertyFilters
          filters={filters}
          setFilters={setFilters}
          totalCount={properties.length}
          filteredCount={filteredProperties.length}
          onReset={handleResetFilters}
        />

        {filteredProperties.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300 p-8">
            <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="font-serif text-xl font-bold text-slate-800 mb-1">
              No se encontraron propiedades con estos filtros
            </h3>
            <p className="text-xs text-slate-500 mb-6 max-w-md mx-auto">
              Intenta cambiar los términos de búsqueda o restablecer los filtros para ver todas las opciones disponibles.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 rounded-xl bg-caribbean-900 text-white text-xs font-semibold hover:bg-caribbean-800 transition-colors"
            >
              Ver Todas las Propiedades
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((prop) => (
              <PropertyCard
                key={prop.id}
                property={prop}
                onSelect={(p) => setSelectedProperty(p)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Services Portfolio */}
      <ServicesSection />

      {/* Philosophy, Mission & Vision */}
      <PhilosophySection />

      {/* Founders Profile (Alejandro & Reyna) */}
      <FoundersSection />

      {/* Contact & Map Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <PropertyModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
      />

      <AdminPropertyModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        properties={properties}
        onAddProperty={handleAddProperty}
        onUpdateProperty={handleUpdateProperty}
        onUpdateStatus={handleUpdateStatus}
        onDeleteProperty={handleDeleteProperty}
        onReload={fetchProperties}
      />

      {/* Floating WhatsApp Quick Action Button */}
      <a
        href="https://wa.me/529987667484?text=Hola%20D%26H%20Real%20Estate%20Canc%C3%BAn%2C%20deseo%20asesor%C3%ADa%20personalizada"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center border-2 border-white"
        aria-label="Abrir WhatsApp con D&H Real Estate"
        title="Chatear con Alejandro Herrera y Reyna Domínguez"
      >
        <MessageCircle className="w-7 h-7 fill-white" />
      </a>
    </div>
  );
}

export default App;
