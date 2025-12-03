import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { Product } from '../types';
import { MENU_ITEMS } from '../constants';

interface MenuSectionProps {
  onAddToCart: (product: Product, quantity: number) => void;
}

const MenuSection: React.FC<MenuSectionProps> = ({ onAddToCart }) => {
  return (
    <section id="menu" className="py-24 bg-yellow-50 relative">
      {/* Decorative Dots */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-red-100 rounded-full blur-2xl opacity-60" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-yellow-200 rounded-full blur-2xl opacity-60" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold brand-font text-red-600 mb-3 drop-shadow-sm">Menu Favorit</h2>
          <div className="w-24 h-2 bg-yellow-400 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 text-lg max-w-xl mx-auto font-medium">
            Pilih bagian ayam favoritmu! <br/>
            Mau yang <span className="text-yellow-600 font-bold">Original Crispy</span> atau <span className="text-red-600 font-bold">Geprek Pedas</span>?
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {MENU_ITEMS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard product={item} onAddToCart={onAddToCart} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;