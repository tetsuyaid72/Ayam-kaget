
import { Product } from './types';

export const MENU_ITEMS: Product[] = [
  {
    id: 'p-1',
    name: 'Ayam Dada',
    category: 'original',
    price: 8000,
    image: '/images/dada.png',
    description: 'Dada ayam tebal dengan kulit crispy.'
  },
  {
    id: 'p-2',
    name: 'Ayam Paha Atas',
    category: 'original',
    price: 7000,
    image: '/images/pahaatas.png',
    description: 'Daging lembut dan juicy di bagian atas.'
  },
  {
    id: 'p-3',
    name: 'Ayam Paha Bawah',
    category: 'original',
    price: 7000,
    image: '/images/pahabawah.png',
    description: 'Favorit semua orang, paha pentung crispy.'
  },
  {
    id: 'p-4',
    name: 'Sayap',
    category: 'original',
    price: 6000,
    image: '/images/sayap.png',
    description: 'Sayap renyah, pas buat camilan.'
  },
  {
    id: 'p-5',
    name: 'Ayam Geprek',
    category: 'special',
    price: 10000,
    isBestSeller: true,
    image: '/images/geprek.jpg',
    description: 'Ayam crispy digeprek dengan sambal bawang pedas nampol!'
  },
  {
    id: 'p-6',
    name: 'Ayam Richeese',
    category: 'special',
    price: 10000,
    image: '/images/ricis.jpg',
    description: 'Berlumur saus keju pedas manis yang creamy.'
  },
  {
    id: 'p-7',
    name: 'Extra Nasi Putih',
    category: 'original',
    price: 3000,
    image: '/images/nasi.jpg',
    description: 'Nasi putih pulen dan hangat, pas untuk pendamping ayam.'
  },
  {
    id: 'p-8',
    name: 'Tahu Crispy',
    category: 'original',
    price: 1000,
    image: '/images/tahu.jpg',
    description: 'Tahu goreng tepung renyah, pas buat teman makan ayam.'
  }
];
