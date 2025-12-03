import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, MessageCircle } from 'lucide-react';
import { WA_NUMBER } from '../types';

interface HeroProps {
  onScrollToMenu: () => void;
}

const Hero: React.FC<HeroProps> = ({ onScrollToMenu }) => {
  return (
    <section id="home" className="relative min-h-[95vh] flex items-center pt-24 overflow-hidden">
      {/* Background Gradient (60% Yellow Dominance) */}
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-300 via-yellow-100 to-yellow-50 z-0" />
      
      {/* Abstract Shapes */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
      
      <div className="container mx-auto px-4 z-10 grid md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div className="order-2 md:order-1 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm border border-red-200 text-red-600 rounded-full font-bold text-sm mb-6 shadow-sm"
            >
              <span className="bg-red-600 text-white p-1 rounded-full text-xs">HOT</span>
              <span>Pedasnya Bikin Nagih!</span>
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl font-black brand-font text-gray-900 leading-[0.9] mb-6 drop-shadow-sm">
              AYAM <br/>
              <span className="text-red-600 inline-block transform -rotate-2">KAGET</span>
            </h1>
            
            <p className="text-xl text-gray-700 font-medium mb-10 max-w-lg mx-auto md:mx-0 leading-relaxed">
              Sensasi Fried Chicken <span className="text-red-600 font-bold">crispy</span> & <span className="text-yellow-600 font-bold">juicy</span> dengan harga kaki lima, rasa bintang lima! 🍗✨
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(220, 38, 38, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={onScrollToMenu}
                className="px-8 py-4 bg-red-600 text-white font-bold rounded-full shadow-lg flex items-center justify-center gap-2 border-2 border-red-600"
              >
                Pesan Sekarang <ChevronRight size={20} />
              </motion.button>
              
              <motion.a
                href={`https://wa.me/${WA_NUMBER}`}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-green-600 font-bold rounded-full shadow-lg flex items-center justify-center gap-2 border-2 border-green-500 hover:bg-green-50"
              >
                <MessageCircle size={20} />
                Order via WA
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Image Content */}
        <div className="order-1 md:order-2 relative perspective-1000">
          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotate: 10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="relative z-10"
          >
            {/* Circle Background behind image */}
            <div className="absolute inset-0 bg-yellow-400 rounded-full transform scale-90 translate-y-4 opacity-50"></div>
            
            <img 
              src="/images/rombong.jpg" 
              alt="Ayam Goreng Crispy" 
              className="w-full max-w-lg mx-auto drop-shadow-2xl rounded-[3rem] border-4 border-white transform hover:scale-105 transition-transform duration-500 cursor-pointer"
            />
            
            {/* Floating Badge (10% Green Accent) */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -bottom-6 right-0 md:bottom-10 md:-right-4 bg-white p-4 rounded-3xl shadow-xl border border-green-100 flex items-center gap-3"
            >
              <div className="bg-green-100 p-3 rounded-full text-green-600">
                <span className="text-2xl">🌿</span>
              </div>
              <div>
                <p className="font-bold text-gray-800 text-lg">Always Fresh</p>
                <p className="text-sm text-green-600 font-semibold">Digoreng Dadakan</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Wave Separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#FEFce8" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;