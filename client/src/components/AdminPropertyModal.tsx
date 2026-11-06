import React, { useState } from 'react';
import { Property, PropertyStatus, OperationType, PropertyCategory } from '../data/types';
import { X, Plus, Trash2, Edit3, Save, Download, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';

interface AdminPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  properties: Property[];
  onAddProperty: (newProp: Partial<Property>) => Promise<boolean>;
  onUpdateStatus: (id: string, status: PropertyStatus) => Promise<boolean>;
  onDeleteProperty: (id: string) => Promise<boolean>;
  onReload: () => void;
}

export const AdminPropertyModal: React.FC<AdminPropertyModalProps> = ({
  isOpen,
  onClose,
  properties,
  onAddProperty,
  onUpdateStatus,
  onDeleteProperty,
  onReload
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'list' | 'add'>('list');
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Form State for New Property
  const [title, setTitle] = useState('');
  const [operation, setOperation] = useState<'Renta' | 'Venta'>('Renta');
  const [propertyType, setPropertyType] = useState<'Casa' | 'Departamento'>('Departamento');
  const [price, setPrice] = useState<number>(15000);
  const [city, setCity] = useState('Cancún');
  const [zone, setZone] = useState('');
  const [bedrooms, setBedrooms] = useState<number>(2);
  const [bathrooms, setBathrooms] = useState<number>(2);
  const [parking, setParking] = useState<number>(1);
  const [furnished, setFurnished] = useState<'Amueblada' | 'Semi-amueblada' | 'Sin muebles'>('Amueblada');
  const [highlight, setHighlight] = useState('');
  const [featuresText, setFeaturesText] = useState('Cocina integral, Alberca, Seguridad 24/7');
  const [imageUrl, setImageUrl] = useState('/assets/Logo.png');

  const showNotice = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price || !zone) {
      showNotice('error', 'Por favor llena los campos requeridos (Título, Precio y Zona).');
      return;
    }

    setLoading(true);
    const newProp: Partial<Property> = {
      title,
      operation,
      propertyType,
      price: Number(price),
      currency: 'MXN',
      period: operation === 'Renta' ? 'mensual' : 'venta',
      location: {
        address: zone,
        city,
        state: 'Quintana Roo',
        zone
      },
      specs: {
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
        parking: Number(parking),
        furnished: furnished === 'Sin muebles' ? false : furnished
      },
      features: featuresText.split(',').map(s => s.trim()).filter(Boolean),
      highlight: highlight || `${propertyType} en ${operation.toLowerCase()} en ${zone}, ${city}. Excelente oportunidad gestionada por D&H.`,
      featured: true,
      images: [imageUrl || '/assets/Logo.png'],
      mainImage: imageUrl || '/assets/Logo.png',
      status: 'Disponible'
    };

    const success = await onAddProperty(newProp);
    setLoading(false);

    if (success) {
      showNotice('success', '¡Propiedad agregada exitosamente al inventario!');
      // Reset form
      setTitle('');
      setZone('');
      setHighlight('');
      setActiveTab('list');
    } else {
      showNotice('error', 'No se pudo guardar la propiedad.');
    }
  };

  const handleStatusChange = async (id: string, newStatus: PropertyStatus) => {
    setLoading(true);
    const ok = await onUpdateStatus(id, newStatus);
    setLoading(false);
    if (ok) {
      showNotice('success', `Estatus actualizado a: ${newStatus}`);
    } else {
      showNotice('error', 'Error al actualizar estatus');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Seguro que deseas eliminar esta propiedad del inventario?')) {
      setLoading(true);
      const ok = await onDeleteProperty(id);
      setLoading(false);
      if (ok) {
        showNotice('success', 'Propiedad eliminada del catálogo');
      } else {
        showNotice('error', 'Error al eliminar');
      }
    }
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(properties, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `dh_properties_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showNotice('success', 'Archivo JSON de respaldo descargado.');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-bronze-300 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-caribbean-900 text-white flex items-center justify-between border-b border-caribbean-800">
          <div>
            <h2 className="font-serif text-lg font-bold flex items-center gap-2">
              <span>Panel de Gestión Semanal D&H Real Estate</span>
              <span className="text-xs font-sans font-medium px-2 py-0.5 rounded bg-bronze-500 text-slate-950">
                Alejandro & Reyna
              </span>
            </h2>
            <p className="text-xs text-caribbean-200">
              Modifica disponibilidad o agrega propiedades sin tocar código ni reiniciar el servidor.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-300 hover:text-white hover:bg-caribbean-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notification Banner */}
        {notification && (
          <div className={`py-2 px-6 text-xs font-semibold flex items-center gap-2 ${
            notification.type === 'success' ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
          }`}>
            {notification.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span>{notification.message}</span>
          </div>
        )}

        {/* Tab Switcher & Export */}
        <div className="bg-sand-50 border-b border-sand-200 px-6 py-3 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('list')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'list'
                  ? 'bg-caribbean-900 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-sand-200/60'
              }`}
            >
              Inventario Actual ({properties.length})
            </button>
            <button
              onClick={() => setActiveTab('add')}
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'add'
                  ? 'bg-bronze-500 text-slate-950 shadow-sm'
                  : 'text-slate-600 hover:bg-sand-200/60'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Publicar Nueva Propiedad</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onReload}
              className="p-1.5 rounded-lg text-slate-600 hover:bg-sand-200/80 transition-colors"
              title="Recargar datos"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={handleExportJSON}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors"
              title="Descargar copia JSON de seguridad"
            >
              <Download className="w-3.5 h-3.5 text-bronze-600" />
              <span>Exportar JSON</span>
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'list' ? (
            <div className="space-y-3">
              {properties.length === 0 ? (
                <p className="text-center text-slate-400 py-8 text-sm">No hay propiedades en el inventario.</p>
              ) : (
                properties.map((prop) => (
                  <div
                    key={prop.id}
                    className="p-4 rounded-xl border border-slate-200 hover:border-bronze-300 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={prop.mainImage || (prop.images && prop.images[0]) || '/assets/Logo.png'}
                        alt={prop.title}
                        className="w-16 h-12 rounded-lg object-cover bg-slate-100 shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-caribbean-100 text-caribbean-900 uppercase">
                            {prop.operation}
                          </span>
                          <span className="text-xs text-slate-400">Ref: {prop.id}</span>
                        </div>
                        <h4 className="font-serif font-bold text-sm text-slate-900 line-clamp-1">{prop.title}</h4>
                        <p className="text-xs text-bronze-700 font-semibold">
                          ${prop.price.toLocaleString('es-MX')} {prop.currency} {prop.period === 'mensual' && '/ mes'}
                          <span className="text-slate-400 font-normal ml-2">({prop.location.city} - {prop.location.zone})</span>
                        </p>
                      </div>
                    </div>

                    {/* Status Changer & Delete */}
                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                      <select
                        value={prop.status}
                        onChange={(e) => handleStatusChange(prop.id, e.target.value as PropertyStatus)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg border focus:outline-none cursor-pointer ${
                          prop.status === 'Disponible'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : prop.status === 'Apartada'
                            ? 'bg-amber-50 text-amber-800 border-amber-300'
                            : 'bg-slate-100 text-slate-800 border-slate-300'
                        }`}
                      >
                        <option value="Disponible">Disponible</option>
                        <option value="Apartada">Apartada</option>
                        <option value="Rentada">Rentada</option>
                        <option value="Vendida">Vendida</option>
                      </select>

                      <button
                        onClick={() => handleDelete(prop.id)}
                        className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Eliminar propiedad"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            /* Add Form */
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Título Comercial *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Depto en Renta Amueblado con Alberca en Jardines del Sur"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-bronze-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Operación *</label>
                  <select
                    value={operation}
                    onChange={(e) => setOperation(e.target.value as 'Renta' | 'Venta')}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-bronze-500"
                  >
                    <option value="Renta">Renta Mensual</option>
                    <option value="Venta">Venta Patrimonial</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tipo de Inmueble</label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value as 'Casa' | 'Departamento')}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-bronze-500"
                  >
                    <option value="Departamento">Departamento</option>
                    <option value="Casa">Casa Residencial</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Precio (MXN) *</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-bronze-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Ciudad</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-bronze-500"
                  >
                    <option value="Cancún">Cancún</option>
                    <option value="Playa del Carmen">Playa del Carmen</option>
                    <option value="Puerto Morelos">Puerto Morelos</option>
                    <option value="Tulum">Tulum</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Zona / Fraccionamiento *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Polígono Sur, Av. Huayacán, Playacar..."
                    value={zone}
                    onChange={(e) => setZone(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-bronze-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Amueblado</label>
                  <select
                    value={furnished}
                    onChange={(e) => setFurnished(e.target.value as any)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-bronze-500"
                  >
                    <option value="Amueblada">Totalmente Amueblada</option>
                    <option value="Semi-amueblada">Semi-amueblada</option>
                    <option value="Sin muebles">Sin muebles</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Recámaras</label>
                  <input
                    type="number"
                    value={bedrooms}
                    onChange={(e) => setBedrooms(Number(e.target.value))}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-bronze-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Baños</label>
                  <input
                    type="number"
                    step="0.5"
                    value={bathrooms}
                    onChange={(e) => setBathrooms(Number(e.target.value))}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-bronze-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Características (separadas por coma)
                  </label>
                  <input
                    type="text"
                    value={featuresText}
                    onChange={(e) => setFeaturesText(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-bronze-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    URL o ruta de Foto Principal
                  </label>
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="/assets/Logo.png o enlace web"
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-bronze-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Descripción / Resumen de Atractivos
                  </label>
                  <textarea
                    rows={3}
                    value={highlight}
                    onChange={(e) => setHighlight(e.target.value)}
                    placeholder="Describe los puntos clave de la propiedad, amenidades y beneficios jurídicos."
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-bronze-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setActiveTab('list')}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-bronze-500 to-bronze-600 hover:from-bronze-600 hover:to-bronze-700 text-slate-950 font-bold text-sm shadow-md transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>{loading ? 'Guardando...' : 'Guardar y Publicar'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
