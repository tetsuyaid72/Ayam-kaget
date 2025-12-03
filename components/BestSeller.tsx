import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { MENU_ITEMS } from '../constants';

interface BestSellerProps {
  onAddToCart: (product: Product, quantity: number) => void;
}

const BestSeller: React.FC<BestSellerProps> = ({ onAddToCart }) => {
  const geprek = MENU_ITEMS.find(i => i.id === 'p-5');

  if (!geprek) return null;

  return (
    <section id="bestseller" className="py-24 bg-red-600 text-white overflow-hidden relative">
      {/* Noise Texture & Gradient Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-red-700 to-red-500 opacity-90"></div>
      
      {/* Abstract Pattern */}
      <div className="absolute -top-24 -left-24 w-64 h-64 border-[20px] border-yellow-400 rounded-full opacity-20"></div>
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-yellow-400 rounded-full opacity-10 blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <motion.div 
            className="w-full md:w-1/2"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-yellow-400 text-red-900 px-6 py-2 rounded-full font-bold mb-8 shadow-lg transform -rotate-2">
              <Flame size={24} fill="currentColor" />
              <span className="tracking-wide">BEST SELLER WAJIB COBA!</span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-black brand-font mb-6 leading-none">
              Ayam <br/>
              <span className="text-yellow-300">Geprek</span>
            </h2>
            
            <p className="text-red-100 text-xl mb-10 leading-relaxed font-medium">
              Ayam crispy digeprek hancur dengan <span className="bg-white text-red-600 px-1 font-bold">Sambal Bawang</span> super pedas! 
              Gurih, panas, dan bikin keringetan enak! 🔥🌶️
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20">
                <span className="text-sm text-yellow-200 block mb-1">Harga Spesial</span>
                <span className="text-4xl font-black text-white">Rp {geprek.price.toLocaleString('id-ID')}</span>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onAddToCart(geprek, 1)}
                className="w-full sm:w-auto bg-yellow-400 text-red-700 px-8 py-4 rounded-full font-bold text-lg shadow-[0_10px_20px_rgba(250,204,21,0.3)] hover:bg-yellow-300 transition-colors flex items-center justify-center gap-2"
              >
                <Sparkles size={20} />
                Pesan Geprek Sekarang
              </motion.button>
            </div>
          </motion.div>

          <motion.div 
            className="w-full md:w-1/2 flex justify-center"
            initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
            whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <div className="relative w-80 h-80 md:w-[28rem] md:h-[28rem]">
              <div className="absolute inset-0 bg-white rounded-full opacity-20 animate-pulse blur-xl"></div>
              <img 
                src="/images/geprek.jpg" 
                alt="Ayam Geprek"
                className="w-full h-full object-cover rounded-full border-8 border-yellow-400 shadow-2xl relative z-10"
              />
              
              {/* Sticker Effect */}
              <div className="absolute -top-4 -right-4 bg-white text-red-600 w-24 h-24 rounded-full flex items-center justify-center font-black transform rotate-12 shadow-lg z-20 border-4 border-red-100">
                <div className="text-center leading-none">
                  <span className="text-xs">HANYA</span>
                  <br/>
                  <span className="text-xl">12rb</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BestSeller;