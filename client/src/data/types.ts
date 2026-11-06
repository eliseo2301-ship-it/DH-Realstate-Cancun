export type OperationType = 'Renta' | 'Venta' | 'Todos';
export type PropertyCategory = 'Casa' | 'Departamento' | 'Terreno' | 'Local' | 'Todos';
export type PropertyStatus = 'Disponible' | 'Apartada' | 'Vendida' | 'Rentada';

export interface PropertySpecs {
  bedrooms: number;
  bathrooms: number;
  parking: number;
  furnished: boolean | 'Semi-amueblada';
  areaM2?: number;
  level?: string;
  parkingCovered?: boolean;
}

export interface PropertyLocation {
  address: string;
  city: string;
  state: string;
  zone: string;
}

export interface AdvisorRef {
  name: string;
  role: string;
  phone: string;
  email: string;
}

export interface Property {
  id: string;
  title: string;
  operation: 'Renta' | 'Venta';
  propertyType: 'Casa' | 'Departamento' | 'Terreno' | 'Local';
  price: number;
  currency: 'MXN' | 'USD';
  period?: 'mensual' | 'venta';
  location: PropertyLocation;
  specs: PropertySpecs;
  features: string[];
  highlight: string;
  featured: boolean;
  images: string[];
  mainImage: string;
  status: PropertyStatus;
  createdAt: string;
  updatedAt: string;
  advisors: AdvisorRef[];
}

export interface PropertyFilterState {
  operation: OperationType;
  propertyType: PropertyCategory;
  city: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: string;
  searchQuery: string;
}

export interface Appointment {
  id?: string;
  propertyId: string;
  propertyTitle: string;
  propertyAddress: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  date: string;
  time: string;
  advisorName: string;
  advisorPhone: string;
  notes?: string;
  createdAt?: string;
}
