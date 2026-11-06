export interface Founder {
  name: string;
  role: string;
  specialty: string;
  phone: string;
  phoneDisplay: string;
  email: string;
  cardImage: string;
  qrImage: string;
  whatsappMessage: string;
  bio: string;
}

export const COMPANY_INFO = {
  name: 'D&H Real Estate Cancún',
  tagline: 'Asesoría Inmobiliaria y Jurídica Integral',
  slogan: 'Tu patrimonio en el Caribe, con absoluta certeza legal y exclusividad.',
  location: 'Cancún, Quintana Roo, México',
  serviceAreas: ['Cancún', 'Playa del Carmen', 'Puerto Morelos', 'Riviera Maya'],
  email: 'dh.realstate.cun@gmail.com',
  facebook: 'https://www.facebook.com/dh.realstate',
  logoUrl: '/assets/Logo.png',
  
  philosophy: {
    title: 'Nuestra Filosofía',
    quote: 'La verdadera exclusividad no radica solo en la vista al mar, sino en la paz y tranquilidad de saber que tu patrimonio descansa sobre cimientos jurídicos inquebrantables.',
    description: 'En D&H Real Estate Cancún transformamos la experiencia de adquirir o rentar una propiedad en el Caribe Mexicano. Combinamos una curaduría exhaustiva de residencias y departamentos con un respaldo legal riguroso y transparente, asegurando que cada operación sea ágil, segura y blindada de principio a fin.'
  },

  mission: {
    title: 'Misión',
    description: 'Brindar un servicio fiduciario de excelencia en corretaje y consultoría jurídica inmobiliaria en Cancún y la Riviera Maya, cuidando el patrimonio de cada cliente mediante dictámenes técnicos y legales minuciosos, asesoría humana uno a uno y transacciones impecables.'
  },

  vision: {
    title: 'Visión',
    description: 'Ser reconocidos como el corretaje boutique insignia en el Caribe Mexicano, referente de confianza, ética profesional y solidez jurídica, guiando a familias, inversionistas locales e internacionales hacia el éxito patrimonial seguro.'
  },

  values: [
    {
      title: 'Certeza Jurídica Total',
      desc: 'Cada propiedad cuenta con análisis legal previo: escrituración, gravámenes y solvencia documental.',
      icon: 'ShieldCheck'
    },
    {
      title: 'Atención Boutique 1 a 1',
      desc: 'Trato directo con los fundadores Alejandro y Reyna, sin intermediarios impersonales.',
      icon: 'UserCheck'
    },
    {
      title: 'Dominio del Mercado Caribeño',
      desc: 'Conocimiento profundo de las mejores zonas de Cancún y la Riviera Maya: plusvalía, servicios y estilo de vida.',
      icon: 'Compass'
    },
    {
      title: 'Transparencia y Ética',
      desc: 'Claridad absoluta en honorarios, contratos claros y comunicación continua durante todo el proceso.',
      icon: 'Scale'
    }
  ],

  founders: [
    {
      name: 'Reyna Domínguez',
      role: 'Socia Fundadora & Asesora Jurídica Inmobiliaria',
      specialty: 'Derecho Inmobiliario, Contratos y Blindaje Legal',
      phone: '5522707664',
      phoneDisplay: '55 2270 7664',
      email: 'dh.realstate.cun@gmail.com',
      cardImage: '/assets/reyna_dominguez_con_qr.png',
      qrImage: '/assets/Reyna QR.png',
      whatsappMessage: 'Hola Reyna, me gustaría recibir asesoría inmobiliaria y legal para una propiedad en Cancún/Riviera Maya con D&H Real Estate.',
      bio: 'Especialista en derecho inmobiliario y gestión contractual. Su enfoque analítico y protector garantiza que cada arrendatario, comprador o propietario cuente con un marco legal blindado, protegiendo su inversión en todo momento.'
    },
    {
      name: 'Alejandro Herrera',
      role: 'Socio Fundador & Asesor Inmobiliario Jurídico',
      specialty: 'Comercialización Premium, Negociación y Relaciones Patrimoniales',
      phone: '9987667484',
      phoneDisplay: '998 766 7484',
      email: 'dh.realstate.cun@gmail.com',
      cardImage: '/assets/business_card_alejandro_herrera.png',
      qrImage: '/assets/qr-Alex.png',
      whatsappMessage: 'Hola Alejandro, me interesa consultar el catálogo de propiedades y recibir asesoría con D&H Real Estate Cancún.',
      bio: 'Experto en el dinamismo inmobiliario de Cancún y la Riviera Maya. Dedicado a conectar clientes con las mejores oportunidades habitacionales y de inversión, aportando visión estratégica, agilidad y calidez en el trato.'
    }
  ],

  services: [
    {
      title: 'Arrendamiento Residencial Protegido',
      description: 'Gestión completa de renta con póliza jurídica, investigación de perfiles y contratos redactados por expertos.',
      tag: 'Para Propietarios e Inquilinos'
    },
    {
      title: 'Compra y Venta Patrimonial',
      description: 'Acompañamiento integral desde la valuación comercial y búsqueda selecta hasta la firma notarial y entrega de llaves.',
      tag: 'Inversión Segura'
    },
    {
      title: 'Due Diligence & Dictamen Jurídico',
      description: 'Revisión exhaustiva del estatus de la propiedad: libertad de gravamen, predial, régimen condominal y antecedentes registrales.',
      tag: 'Seguridad Legal'
    },
    {
      title: 'Asesoría para Inversionistas',
      description: 'Identificación de propiedades con alto rendimiento en renta a largo plazo o vacacional en Cancún y Playa del Carmen.',
      tag: 'Máxima Plusvalía'
    }
  ]
};
