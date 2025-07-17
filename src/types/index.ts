export interface Product {
  id: string;
  name: string;
  price?: number;
  description: string;
  image?: string;
  category: string;
  features: string[];
  link?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

export interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

export interface MousePosition {
  x: number;
  y: number;
}