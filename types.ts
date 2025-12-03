
export interface Product {
  id: string;
  name: string;
  category: 'original' | 'special';
  price: number;
  image: string;
  isBestSeller?: boolean;
  description?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type DeliveryMethod = 'pickup' | 'delivery';
export type PaymentMethod = 'cash' | 'dana' | 'qris';

export interface OrderDetails {
  name: string;
  phone: string;
  address: string;
  distance: number; // in KM
  method: DeliveryMethod;
}

export const WA_NUMBER = "6289685130707";
export const MAPS_LINK = "https://maps.app.goo.gl/VyZ7kJ15GmbLEzyZ6";
