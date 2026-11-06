import React, { useState } from 'react';
import { COMPANY_INFO } from '../content/company';
import { Mail, Phone, MapPin, Send, MessageCircle, CheckCircle2, QrCode } from 'lucide-react';
import { FacebookIcon } from './Icons';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState('Renta');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Try sending to /api/contact or open WhatsApp
    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, email, interest, message })
    }).catch(() => {});

    // Open WhatsApp directly with founders
    const waText = `Hola Alejandro y Reyna, mi nombre es ${name}. Me interesa información sobre propiedades en ${interest}. Mensaje: ${message || 'Deseo que me contacten'}. (Tel: ${phone})`;
    window.open(`https://wa.me/529987667484?text=${encodeURIComponent(waText)}`, '_blank');
    setSubmitted(true);
  };

  return (
    <section id="contacto" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Info Column */}
          <div className="space-y-8">
            <div>
              <span className="text-xs font-bold text-bronze-700 uppercase tracking-widest block mb-2">
                Atención Inmediata
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-4">
                Ponte en Contacto con Nosotros
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                ¿Deseas rentar, comprar o poner en comercialización tu propiedad con blindaje legal en Cancún o la Riviera Maya? Escríbenos directamente o visítanos en nuestras redes sociales.
              </p>
            </div>

            {/* Direct Cards */}
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-sand-50 border border-sand-200">
                <div className="p-3 rounded-xl bg-caribbean-900 text-bronze-300 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Atención Telefónica & WhatsApp</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Alejandro Herrera: <a href="tel:9987667484" className="text-caribbean-700 font-semibold hover:underline">998 766 7484</a>
                  </p>
                  <p className="text-xs text-slate-600">
                    Reyna Domínguez: <a href="tel:5522707664" className="text-caribbean-700 font-semibold hover:underline">55 2270 7664</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-sand-50 border border-sand-200">
                <div className="p-3 rounded-xl bg-caribbean-900 text-bronze-300 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Correo Electrónico</h4>
                  <a href={`mailto:${COMPANY_INFO.email}`} className="text-xs text-caribbean-700 font-semibold hover:underline">
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-sand-50 border border-sand-200">
                <div className="p-3 rounded-xl bg-caribbean-900 text-bronze-300 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Ubicación y Cobertura</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Cancún, Quintana Roo • Cobertura en Cancún, Puerto Morelos, Playa del Carmen y Riviera Maya
                  </p>
                </div>
              </div>
            </div>

            {/* Official Facebook Link Box */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-900/10 via-caribbean-50 to-sand-100 border border-blue-200/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#1877F2] text-white">
                  <FacebookIcon className="w-5 h-5 fill-white" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Facebook Oficial</h4>
                  <p className="text-xs text-slate-500">dh.realstate</p>
                </div>
              </div>

              <a
                href={COMPANY_INFO.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-[#1877F2] hover:bg-[#166fe5] text-white transition-colors"
              >
                <span>Seguir Página</span>
              </a>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="bg-sand-50/80 p-8 sm:p-10 rounded-3xl border border-bronze-300/40 shadow-luxury">
            <h3 className="font-serif text-2xl font-bold text-slate-900 mb-2">
              Envíanos una Consulta
            </h3>
            <p className="text-xs text-slate-600 mb-6">
              Recibirás respuesta directa de Reyna o Alejandro en menos de 24 horas.
            </p>

            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-xl font-bold text-slate-900">¡Mensaje Enviado!</h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Hemos abierto tu canal de WhatsApp para atenderte de inmediato. También puedes escribirnos a nuestro correo.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-semibold text-bronze-700 underline"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nombre Completo *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Tu nombre y apellido"
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-bronze-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Teléfono / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="10 dígitos"
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-bronze-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Interés</label>
                    <select
                      value={interest}
                      onChange={(e) => setInterest(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-bronze-500"
                    >
                      <option value="Renta">Quiero Rentar una Propiedad</option>
                      <option value="Comprar">Quiero Comprar una Propiedad</option>
                      <option value="Consignar Propiedad">Deseo poner mi propiedad en renta/venta</option>
                      <option value="Asesoría Jurídica">Dictamen o Asesoría Jurídica</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Correo Electrónico</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="correo@ejemplo.com"
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-bronze-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Mensaje o Requerimientos</label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Cuéntanos qué tipo de inmueble buscas, presupuesto o dudas legales..."
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-bronze-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-bronze-500 to-bronze-600 hover:from-bronze-600 hover:to-bronze-700 text-slate-950 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-slate-950" />
                  <span>Enviar y Conectar por WhatsApp</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
