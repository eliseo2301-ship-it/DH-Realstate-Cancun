import React, { useState } from 'react';
import { Property, PropertyStatus, OperationType, PropertyCategory } from '../data/types';
import { 
  X, Plus, Trash2, Edit3, Save, Download, RefreshCw, 
  CheckCircle, AlertCircle, Image as ImageIcon, Star, Upload, ArrowLeft 
} from 'lucide-react';

interface AdminPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  properties: Property[];
  onAddProperty: (newProp: Partial<Property>) => Promise<boolean>;
  onUpdateProperty: (id: string, updatedData: Partial<Property>) => Promise<boolean>;
  onUpdateStatus: (id: string, status: PropertyStatus) => Promise<boolean>;
  onDeleteProperty: (id: string) => Promise<boolean>;
  onReload: () => void;
}

export const AdminPropertyModal: React.FC<AdminPropertyModalProps> = ({
  isOpen,
  onClose,
  properties,
  onAddProperty,
  onUpdateProperty,
  onUpdateStatus,
  onDeleteProperty,
  onReload
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'list' | 'add' | 'edit'>('list');
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
  const [newPropImages, setNewPropImages] = useState<string[]>(['/assets/Logo.png']);
  const [newImageInput, setNewImageInput] = useState('');

  // Form State for Editing Property
  const [editingId, setEditingId] = useState<string>('');
  const [editTitle, setEditTitle] = useState('');
  const [editOperation, setEditOperation] = useState<'Renta' | 'Venta'>('Renta');
  const [editPropertyType, setEditPropertyType] = useState<'Casa' | 'Departamento'>('Departamento');
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editPeriod, setEditPeriod] = useState<'mensual' | 'venta'>('mensual');
  const [editCity, setEditCity] = useState('Cancún');
  const [editZone, setEditZone] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [editBedrooms, setEditBedrooms] = useState<number>(0);
  const [editBathrooms, setEditBathrooms] = useState<number>(0);
  const [editParking, setEditParking] = useState<number>(0);
  const [editFurnished, setEditFurnished] = useState<string>('Sin muebles');
  const [editHighlight, setEditHighlight] = useState('');
  const [editFeaturesText, setEditFeaturesText] = useState('');
  const [editStatus, setEditStatus] = useState<PropertyStatus>('Disponible');
  const [editImages, setEditImages] = useState<string[]>([]);
  const [editMainImage, setEditMainImage] = useState<string>('');
  const [editImageInput, setEditImageInput] = useState('');

  const showNotice = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  // Start Editing Property
  const handleStartEdit = (prop: Property) => {
    setEditingId(prop.id);
    setEditTitle(prop.title);
    setEditOperation(prop.operation);
    setEditPropertyType(prop.propertyType);
    setEditPrice(prop.price);
    setEditPeriod(prop.period || (prop.operation === 'Renta' ? 'mensual' : 'venta'));
    setEditCity(prop.location.city || 'Cancún');
    setEditZone(prop.location.zone || '');
    setEditAddress(prop.location.address || '');
    setEditBedrooms(prop.specs.bedrooms || 0);
    setEditBathrooms(prop.specs.bathrooms || 0);
    setEditParking(prop.specs.parking || 0);
    setEditFurnished(
      typeof prop.specs.furnished === 'string'
        ? prop.specs.furnished
        : prop.specs.furnished
        ? 'Amueblada'
        : 'Sin muebles'
    );
    setEditHighlight(prop.highlight || '');
    setEditFeaturesText(prop.features ? prop.features.join(', ') : '');
    setEditStatus(prop.status || 'Disponible');
    const imgs = prop.images && prop.images.length > 0 ? [...prop.images] : ['/assets/Logo.png'];
    setEditImages(imgs);
    setEditMainImage(prop.mainImage || imgs[0] || '/assets/Logo.png');
    setEditImageInput('');
    setActiveTab('edit');
  };

  // Save Edited Property
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTitle || !editPrice || !editZone) {
      showNotice('error', 'Título, Precio y Zona son obligatorios.');
      return;
    }

    setLoading(true);
    const updatedImages = editImages.length > 0 ? editImages : ['/assets/Logo.png'];
    const currentMain = editMainImage && updatedImages.includes(editMainImage) ? editMainImage : updatedImages[0];

    const updatedData: Partial<Property> = {
      title: editTitle,
      operation: editOperation,
      propertyType: editPropertyType,
      price: Number(editPrice),
      period: editOperation === 'Renta' ? 'mensual' : 'venta',
      location: {
        address: editAddress || editZone,
        city: editCity,
        state: 'Quintana Roo',
        zone: editZone
      },
      specs: {
        bedrooms: Number(editBedrooms),
        bathrooms: Number(editBathrooms),
        parking: Number(editParking),
        furnished: editFurnished === 'Sin muebles' ? false : (editFurnished as any)
      },
      features: editFeaturesText.split(',').map(s => s.trim()).filter(Boolean),
      highlight: editHighlight,
      status: editStatus,
      images: updatedImages,
      mainImage: currentMain,
      updatedAt: new Date().toISOString()
    };

    const ok = await onUpdateProperty(editingId, updatedData);
    setLoading(false);

    if (ok) {
      showNotice('success', '¡Publicación actualizada correctamente!');
      setActiveTab('list');
    } else {
      showNotice('error', 'Error al guardar los cambios de la publicación.');
    }
  };

  // Create New Property
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price || !zone) {
      showNotice('error', 'Por favor llena los campos requeridos (Título, Precio y Zona).');
      return;
    }

    setLoading(true);
    const imagesToSave = newPropImages.length > 0 ? newPropImages : ['/assets/Logo.png'];
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
      images: imagesToSave,
      mainImage: imagesToSave[0] || '/assets/Logo.png',
      status: 'Disponible'
    };

    const success = await onAddProperty(newProp);
    setLoading(false);

    if (success) {
      showNotice('success', '¡Propiedad agregada exitosamente al inventario!');
      setTitle('');
      setZone('');
      setHighlight('');
      setNewPropImages(['/assets/Logo.png']);
      setActiveTab('list');
    } else {
      showNotice('error', 'No se pudo guardar la propiedad.');
    }
  };

  // Status Change from List
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

  // Delete Property
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

  // Export JSON
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

  // Image Management Handlers for Edit
  const handleAddEditImageByUrl = () => {
    if (!editImageInput.trim()) return;
    setEditImages(prev => [...prev, editImageInput.trim()]);
    setEditImageInput('');
  };

  const handleRemoveEditImage = (indexToRemove: number) => {
    setEditImages(prev => {
      const filtered = prev.filter((_, idx) => idx !== indexToRemove);
      if (filtered.length === 0) return ['/assets/Logo.png'];
      return filtered;
    });
  };

  const handleSetMainImage = (img: string) => {
    setEditMainImage(img);
    showNotice('success', 'Foto de portada seleccionada.');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'edit' | 'new') => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          if (target === 'edit') {
            setEditImages(prev => [...prev, result]);
          } else {
            setNewPropImages(prev => [...prev, result]);
          }
        }
      };
      reader.readAsDataURL(file);
    });
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
              Modifica precios, descripciones, quita o añade fotos, o publica nuevas propiedades.
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

            {activeTab === 'edit' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500 text-slate-950 border border-amber-600 shadow-sm">
                <Edit3 className="w-3.5 h-3.5" />
                <span>Modificando: {editTitle.slice(0, 25)}...</span>
              </span>
            )}
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
            /* LIST VIEW */
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
                        className="w-16 h-12 rounded-lg object-cover bg-slate-100 shrink-0 border border-slate-200"
                      />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-caribbean-100 text-caribbean-900 uppercase">
                            {prop.operation}
                          </span>
                          <span className="text-xs text-slate-400">Ref: {prop.id}</span>
                          <span className="text-xs text-slate-400">({prop.images ? prop.images.length : 1} fotos)</span>
                        </div>
                        <h4 className="font-serif font-bold text-sm text-slate-900 line-clamp-1">{prop.title}</h4>
                        <p className="text-xs text-bronze-700 font-semibold">
                          ${prop.price.toLocaleString('es-MX')} {prop.currency} {prop.period === 'mensual' && '/ mes'}
                          <span className="text-slate-400 font-normal ml-2">({prop.location.city} - {prop.location.zone})</span>
                        </p>
                      </div>
                    </div>

                    {/* Actions: Edit, Status, Delete */}
                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                      {/* EDIT BUTTON */}
                      <button
                        onClick={() => handleStartEdit(prop)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-caribbean-800 bg-caribbean-50 hover:bg-caribbean-100 border border-caribbean-200 rounded-lg transition-colors"
                        title="Editar precio, descripción, fotos y detalles"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-caribbean-600" />
                        <span>Editar</span>
                      </button>

                      {/* STATUS DROPDOWN */}
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

                      {/* DELETE BUTTON */}
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
          ) : activeTab === 'edit' ? (
            /* EDIT VIEW (FULL EDITING OF PRICE, DESCRIPTION, PHOTOS, ETC.) */
            <form onSubmit={handleSaveEdit} className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <button
                  type="button"
                  onClick={() => setActiveTab('list')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Volver a la Lista</span>
                </button>
                <span className="text-xs text-slate-500 font-medium">ID: {editingId}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Title */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Título de la Publicación *</label>
                  <input
                    type="text"
                    required
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-bronze-500 font-medium"
                  />
                </div>

                {/* Operation */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tipo de Operación *</label>
                  <select
                    value={editOperation}
                    onChange={(e) => setEditOperation(e.target.value as 'Renta' | 'Venta')}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-bronze-500 font-medium"
                  >
                    <option value="Renta">Renta Mensual</option>
                    <option value="Venta">Venta Patrimonial</option>
                  </select>
                </div>

                {/* Property Type */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tipo de Inmueble</label>
                  <select
                    value={editPropertyType}
                    onChange={(e) => setEditPropertyType(e.target.value as 'Casa' | 'Departamento')}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-bronze-500 font-medium"
                  >
                    <option value="Departamento">Departamento</option>
                    <option value="Casa">Casa Residencial</option>
                  </select>
                </div>

                {/* Price */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Precio (MXN) * {editOperation === 'Renta' ? '(mensual)' : '(precio total de venta)'}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold">$</span>
                    <input
                      type="number"
                      required
                      value={editPrice}
                      onChange={(e) => setEditPrice(Number(e.target.value))}
                      className="w-full border border-slate-300 rounded-xl pl-8 pr-3 py-2 text-sm focus:outline-none focus:border-bronze-500 font-bold text-caribbean-900"
                    />
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Estatus de Disponibilidad</label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as PropertyStatus)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-bronze-500 font-medium"
                  >
                    <option value="Disponible">Disponible</option>
                    <option value="Apartada">Apartada</option>
                    <option value="Rentada">Rentada</option>
                    <option value="Vendida">Vendida</option>
                  </select>
                </div>

                {/* City */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Ciudad</label>
                  <select
                    value={editCity}
                    onChange={(e) => setEditCity(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-bronze-500 font-medium"
                  >
                    <option value="Cancún">Cancún</option>
                    <option value="Playa del Carmen">Playa del Carmen</option>
                    <option value="Puerto Morelos">Puerto Morelos</option>
                    <option value="Tulum">Tulum</option>
                  </select>
                </div>

                {/* Zone */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Zona o Fraccionamiento *</label>
                  <input
                    type="text"
                    required
                    value={editZone}
                    onChange={(e) => setEditZone(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-bronze-500 font-medium"
                  />
                </div>

                {/* Bedrooms & Bathrooms */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Recámaras</label>
                  <input
                    type="number"
                    value={editBedrooms}
                    onChange={(e) => setEditBedrooms(Number(e.target.value))}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-bronze-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Baños</label>
                  <input
                    type="number"
                    step="0.5"
                    value={editBathrooms}
                    onChange={(e) => setEditBathrooms(Number(e.target.value))}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-bronze-500"
                  />
                </div>

                {/* Parking & Furnished */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Estacionamiento</label>
                  <input
                    type="number"
                    value={editParking}
                    onChange={(e) => setEditParking(Number(e.target.value))}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-bronze-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Mobiliario</label>
                  <select
                    value={editFurnished}
                    onChange={(e) => setEditFurnished(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-bronze-500"
                  >
                    <option value="Amueblada">Totalmente Amueblada</option>
                    <option value="Semi-amueblada">Semi-amueblada</option>
                    <option value="Sin muebles">Sin muebles</option>
                  </select>
                </div>

                {/* Description / Highlight */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Descripción Completa / Resumen de Atractivos
                  </label>
                  <textarea
                    rows={4}
                    value={editHighlight}
                    onChange={(e) => setEditHighlight(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-bronze-500 leading-relaxed"
                  />
                </div>

                {/* Features */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Características y Amenidades (separadas por comas)
                  </label>
                  <input
                    type="text"
                    value={editFeaturesText}
                    onChange={(e) => setEditFeaturesText(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-bronze-500"
                  />
                </div>

                {/* PHOTO MANAGEMENT (AGREGAR / QUITAR FOTOS) */}
                <div className="sm:col-span-2 pt-4 border-t border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-900 uppercase">
                      Galería de Fotos ({editImages.length} fotos actuales)
                    </label>
                    <span className="text-[11px] text-slate-500">
                      Haz clic en la estrella para elegir la foto de portada
                    </span>
                  </div>

                  {/* Thumbnail Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 p-3 bg-sand-50 rounded-2xl border border-sand-200">
                    {editImages.map((img, idx) => (
                      <div key={idx} className="relative group rounded-xl overflow-hidden aspect-[4/3] bg-slate-200 border border-slate-300 shadow-sm">
                        <img src={img} alt={`Foto ${idx + 1}`} className="w-full h-full object-cover" />
                        
                        {/* Cover badge */}
                        {img === editMainImage && (
                          <div className="absolute top-1.5 left-1.5 bg-amber-500 text-slate-950 font-bold text-[9px] px-1.5 py-0.5 rounded shadow">
                            Portada
                          </div>
                        )}

                        {/* Hover Overlay Controls */}
                        <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleSetMainImage(img)}
                            className={`p-1.5 rounded-lg text-white ${
                              img === editMainImage ? 'bg-amber-500' : 'bg-slate-700 hover:bg-amber-500'
                            }`}
                            title="Establecer como foto de portada"
                          >
                            <Star className="w-4 h-4 fill-current" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveEditImage(idx)}
                            className="p-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white"
                            title="Eliminar esta foto"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add New Photos Controls */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {/* Add by File Upload */}
                    <div className="p-3 rounded-xl border border-dashed border-bronze-400 bg-white flex flex-col items-center justify-center text-center cursor-pointer hover:bg-sand-50 transition-colors">
                      <label className="cursor-pointer w-full flex flex-col items-center">
                        <Upload className="w-5 h-5 text-bronze-600 mb-1" />
                        <span className="text-xs font-bold text-slate-800">Subir fotos desde tu equipo</span>
                        <span className="text-[11px] text-slate-500">Selecciona imágenes JPG o PNG</span>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, 'edit')}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {/* Add by URL */}
                    <div className="p-3 rounded-xl border border-slate-200 bg-white flex flex-col justify-between">
                      <span className="text-xs font-bold text-slate-800 mb-1">O agregar mediante enlace / URL</span>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="https://... o /properties/..."
                          value={editImageInput}
                          onChange={(e) => setEditImageInput(e.target.value)}
                          className="flex-1 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-bronze-500"
                        />
                        <button
                          type="button"
                          onClick={handleAddEditImageByUrl}
                          className="px-3 py-1.5 bg-caribbean-900 text-white rounded-lg text-xs font-semibold hover:bg-caribbean-800"
                        >
                          Añadir
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setActiveTab('list')}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold text-sm shadow-md transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>{loading ? 'Guardando...' : 'Guardar Cambios'}</span>
                </button>
              </div>
            </form>
          ) : (
            /* ADD NEW PROPERTY VIEW */
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

                {/* New property photo upload */}
                <div className="sm:col-span-2 pt-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Fotos de la Propiedad ({newPropImages.length})
                  </label>
                  <div className="flex items-center gap-3">
                    <label className="cursor-pointer px-4 py-2 rounded-xl bg-sand-100 hover:bg-sand-200 border border-sand-300 text-xs font-bold text-slate-800 flex items-center gap-2">
                      <Upload className="w-4 h-4 text-bronze-600" />
                      <span>Subir imágenes desde equipo</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, 'new')}
                        className="hidden"
                      />
                    </label>
                    <span className="text-xs text-slate-500">o usa las fotos por defecto</span>
                  </div>
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
