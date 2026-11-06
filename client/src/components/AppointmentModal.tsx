import React, { useState } from 'react';
import { Property, Appointment } from '../data/types';
import { 
  Calendar, Clock, User, Phone, Mail, MapPin, 
  CheckCircle2, MessageCircle, Download, ExternalLink, X, ShieldCheck 
} from 'lucide-react';

interface AppointmentModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({ property, isOpen, onClose }) => {
  if (!isOpen || !property) return null;

  const todayStr = new Date().toISOString().split('T')[0];

  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [date, setDate] = useState(todayStr);
  const [time, setTime] = useState('11:00');
  const [advisor, setAdvisor] = useState<'Alejandro Herrera' | 'Reyna Domínguez'>('Alejandro Herrera');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const advisorData = {
    'Alejandro Herrera': {
      phone: '9987667484',
      email: 'dh.realstate.cun@gmail.com',
      role: 'Asesor Inmobiliario Jurídico'
    },
    'Reyna Domínguez': {
      phone: '5522707664',
      email: 'dh.realstate.cun@gmail.com',
      role: 'Asesora Inmobiliaria & Abogada'
    }
  };

  const selectedAdvisor = advisorData[advisor];

  // Helper to format ISO strings for Calendar (YYYYMMDDTHHmmssZ)
  const getCalendarDates = () => {
    try {
      const [year, month, day] = date.split('-').map(Number);
      const [hour, minute] = time.split(':').map(Number);
      const startDate = new Date(year, month - 1, day, hour, minute);
      const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hr duration

      const formatCal = (d: Date) => d.toISOString().replace(/-|:|\.\d+/g, '');
      return {
        start: formatCal(startDate),
        end: formatCal(endDate),
        formattedDisplay: `${day}/${month}/${year} a las ${time} hrs`
      };
    } catch {
      return { start: '', end: '', formattedDisplay: `${date} ${time}` };
    }
  };

  const calDates = getCalendarDates();

  // Google Calendar URL
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    `Cita D&H: ${property.title}`
  )}&dates=${calDates.start}/${calDates.end}&details=${encodeURIComponent(
    `Visita guiada a la propiedad: ${property.title}\nCliente: ${clientName}\nTeléfono/WhatsApp: ${clientPhone}\nCorreo: ${clientEmail || 'No especificado'}\nAsesor D&H: ${advisor} (Tel: ${selectedAdvisor.phone})\nNotas: ${notes || 'Sin notas adicionales'}`
  )}&location=${encodeURIComponent(
    `${property.location.address}, ${property.location.zone}, ${property.location.city}, Quintana Roo`
  )}&add=${encodeURIComponent(`dh.realstate.cun@gmail.com,${clientEmail || ''}`)}`;

  // Download iCalendar (.ics) file for Outlook, iPhone, Android
  const handleDownloadICS = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//D&H Real Estate Cancun//Appointments//ES',
      'CALSCALE:GREGORIAN',
      'METHOD:REQUEST',
      'BEGIN:VEVENT',
      `UID:dh-appt-${Date.now()}@dhrealstate.com`,
      `DTSTAMP:${calDates.start || '20261106T000000Z'}`,
      `DTSTART:${calDates.start}`,
      `DTEND:${calDates.end}`,
      `SUMMARY:Cita D&H: ${property.title}`,
      `DESCRIPTION:Visita guiada con ${clientName} (Tel: ${clientPhone}). Asesor D&H: ${advisor} (${selectedAdvisor.phone}). Notas: ${notes}`,
      `LOCATION:${property.location.address}, ${property.location.zone}, ${property.location.city}`,
      'STATUS:CONFIRMED',
      'BEGIN:VALARM',
      'TRIGGER:-PT30M',
      'ACTION:DISPLAY',
      'DESCRIPTION:Recordatorio de Cita D&H Real Estate',
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Cita_DH_${property.id}_${date}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // WhatsApp Alert Message
  const whatsappAlertText = `🗓️ *NUEVA CITA AGENDADA - D&H REAL ESTATE CANCÚN*\n\n` +
    `🏡 *Propiedad:* ${property.title}\n` +
    `📍 *Ubicación:* ${property.location.zone}, ${property.location.city}\n` +
    `👤 *Cliente:* ${clientName}\n` +
    `📱 *Celular/WhatsApp:* ${clientPhone}\n` +
    `✉️ *Correo:* ${clientEmail || 'No proporcionado'}\n` +
    `📅 *Fecha:* ${date}\n` +
    `⏰ *Hora:* ${time} hrs\n` +
    `🤝 *Asesor Asignado:* ${advisor}\n` +
    `💬 *Notas del Cliente:* ${notes || 'Sin notas adicionales'}\n\n` +
    `Por favor confirmar la visita en agenda de Google/Outlook.`;

  const whatsappUrl = `https://wa.me/52${selectedAdvisor.phone}?text=${encodeURIComponent(whatsappAlertText)}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone || !date || !time) {
      alert('Por favor completa todos los campos requeridos (Nombre, Celular, Fecha y Hora).');
      return;
    }

    setLoading(true);

    const apptData: Appointment = {
      propertyId: property.id,
      propertyTitle: property.title,
      propertyAddress: `${property.location.address}, ${property.location.city}`,
      clientName,
      clientPhone,
      clientEmail,
      date,
      time,
      advisorName: advisor,
      advisorPhone: selectedAdvisor.phone,
      notes,
      createdAt: new Date().toISOString()
    };

    try {
      await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apptData)
      });
    } catch {
      // Offline fallback
    }

    setLoading(false);
    setSubmitted(true);

    // Auto open WhatsApp alert in background / new tab
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-white w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl border border-bronze-300 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-caribbean-900 via-caribbean-950 to-caribbean-900 text-white flex items-center justify-between border-b border-caribbean-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-bronze-500/20 border border-bronze-400/40 text-bronze-300">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold">Agendar Cita / Visita Guiada</h3>
              <p className="text-[11px] text-caribbean-200">Sincronización directa con agenda y WhatsApp</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-300 hover:text-white hover:bg-caribbean-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Property Preview Bar */}
        <div className="bg-sand-50 border-b border-sand-200 px-6 py-3 flex items-center gap-3">
          <img
            src={property.mainImage || (property.images && property.images[0]) || '/assets/Logo.png'}
            alt={property.title}
            className="w-14 h-11 rounded-lg object-cover bg-slate-100 border border-sand-300 shrink-0"
          />
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-caribbean-100 text-caribbean-900 uppercase tracking-wider">
              {property.operation} • Ref: {property.id}
            </span>
            <h4 className="font-serif text-xs sm:text-sm font-bold text-slate-900 truncate mt-0.5">
              {property.title}
            </h4>
            <p className="text-[11px] text-bronze-700 font-semibold truncate">
              {property.location.zone}, {property.location.city} • ${property.price.toLocaleString('es-MX')} {property.currency}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto max-h-[75vh]">
          {submitted ? (
            /* Confirmation Screen with Calendar Sync Buttons */
            <div className="text-center space-y-6 py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <h4 className="font-serif text-2xl font-bold text-slate-900 mb-1">¡Cita Registrada con Éxito!</h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  Hemos notificado a <strong className="text-slate-900">{advisor}</strong> por WhatsApp y correo electrónico oficial (<span className="text-caribbean-700 font-semibold">dh.realstate.cun@gmail.com</span>).
                </p>
              </div>

              {/* Appointment Summary Box */}
              <div className="p-4 rounded-2xl bg-sand-50 border border-sand-200 text-left text-xs space-y-1.5 max-w-md mx-auto">
                <p><strong className="text-slate-800">Fecha y Hora:</strong> {calDates.formattedDisplay}</p>
                <p><strong className="text-slate-800">Cliente:</strong> {clientName} ({clientPhone})</p>
                <p><strong className="text-slate-800">Asesor D&H:</strong> {advisor} (Tel: {selectedAdvisor.phone})</p>
                <p><strong className="text-slate-800">Propiedad:</strong> {property.title}</p>
              </div>

              {/* Action 1: Google Calendar Sync */}
              <div className="space-y-3 pt-2 max-w-md mx-auto">
                <a
                  href={googleCalendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Añadir a Google Calendar</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>

                {/* Action 2: Download .ICS for Outlook / Apple */}
                <button
                  onClick={handleDownloadICS}
                  className="w-full inline-flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-xs sm:text-sm shadow-sm transition-all"
                >
                  <Download className="w-4 h-4 text-bronze-600" />
                  <span>Descargar Archivo .ICS (Outlook / iPhone)</span>
                </button>

                {/* Action 3: Reopen WhatsApp */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-semibold text-xs transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Reenviar Alerta de WhatsApp al Asesor</span>
                </a>
              </div>

              <div className="pt-3">
                <button
                  onClick={onClose}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800 underline"
                >
                  Cerrar ventana
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Client Name */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Nombre Completo del Cliente *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="Tu nombre y apellido"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:border-bronze-500"
                    />
                  </div>
                </div>

                {/* Phone / WhatsApp */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Celular / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      required
                      placeholder="10 dígitos"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:border-bronze-500"
                    />
                  </div>
                </div>

                {/* Email (Optional) */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Correo Electrónico <span className="text-slate-400 font-normal">(Opcional)</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      placeholder="correo@ejemplo.com"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:border-bronze-500"
                    />
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Fecha de la Visita *
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      min={todayStr}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-bronze-500 font-medium"
                    />
                  </div>
                </div>

                {/* Time */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Horario Preferido *
                  </label>
                  <div className="relative">
                    <input
                      type="time"
                      required
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-bronze-500 font-medium"
                    />
                  </div>
                </div>

                {/* Advisor Assignment */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Asesor de D&H para la Cita
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setAdvisor('Alejandro Herrera')}
                      className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                        advisor === 'Alejandro Herrera'
                          ? 'border-bronze-500 bg-sand-100/80 shadow-sm'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div>
                        <p className="text-xs font-bold text-slate-900">Alejandro Herrera</p>
                        <p className="text-[10px] text-slate-500">998 766 7484</p>
                      </div>
                      {advisor === 'Alejandro Herrera' && <CheckCircle2 className="w-4 h-4 text-bronze-600" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => setAdvisor('Reyna Domínguez')}
                      className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                        advisor === 'Reyna Domínguez'
                          ? 'border-bronze-500 bg-sand-100/80 shadow-sm'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div>
                        <p className="text-xs font-bold text-slate-900">Reyna Domínguez</p>
                        <p className="text-[10px] text-slate-500">55 2270 7664</p>
                      </div>
                      {advisor === 'Reyna Domínguez' && <CheckCircle2 className="w-4 h-4 text-bronze-600" />}
                    </button>
                  </div>
                </div>

                {/* Notes */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Notas o Requerimientos Especiales
                  </label>
                  <textarea
                    rows={2}
                    placeholder="¿Algún horario en particular o dudas legales que desees resolver?"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-bronze-500"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-bronze-500 via-bronze-600 to-bronze-700 hover:from-bronze-600 hover:to-bronze-800 text-white font-bold text-sm shadow-md transition-all"
                >
                  <Calendar className="w-4 h-4 text-amber-200" />
                  <span>{loading ? 'Agendando...' : 'Confirmar y Enviar Alerta'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
