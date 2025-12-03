import React from 'react';
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { WA_NUMBER } from '../types';

const FloatingWA: React.FC = () => {
  return (
    <motion.a
      href={`https://wa.me/${WA_NUMBER}`}
      target="_blank"
      rel="noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-40 bg-green-500 text-white p-4 rounded-full shadow-[0_10px_20px_rgba(34,197,94,0.4)] hover:bg-green-600 transition-colors flex items-center justify-center group"
    >
      <div className="absolute inset-0 rounded-full border-2 border-green-400 animate-ping opacity-75"></div>
      <Phone size={32} fill="currentColor" className="relative z-10" />
      
      {/* Tooltip */}
      <span className="absolute right-full mr-4 bg-white text-green-700 px-4 py-2 rounded-xl text-sm font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-green-100">
        Chat Admin Sekarang! 👋
      </span>
    </motion.a>
  );
};

export default FloatingWA;