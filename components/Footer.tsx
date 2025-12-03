import React from 'react';
import { MapPin, Phone, Instagram, Facebook } from 'lucide-react';
import { WA_NUMBER, MAPS_LINK } from '../types';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10 rounded-t-[3rem] mt-[-2rem] relative z-0">
      <div className="container mx-auto px-4 text-center md:text-left">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="inline-block bg-red-600 text-white p-2 rounded-xl mb-4 transform -rotate-2">
               <h2 className="text-2xl font-bold brand-font">AYAM KAGET</h2>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Street-food fried chicken modern. <br/>
              <span className="text-yellow-400 font-bold">Crispy</span>, <span className="text-red-400 font-bold">Spicy</span>, & <span className="text-green-400 font-bold">Fresh</span> setiap hari!
            </p>
          </div>
          
          {/* Links */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-yellow-400">Temukan Kami</h3>
            <div className="space-y-4">
              <a 
                href={MAPS_LINK}
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-center md:justify-start gap-3 text-gray-400 hover:text-white transition-colors group"
              >
                <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-red-600 transition-colors">
                  <MapPin size={20} />
                </div>
                <span>Lihat di Google Maps</span>
              </a>
              <div className="flex items-center justify-center md:justify-start gap-4 mt-6">
                <a href="#" className="p-3 bg-gray-800 rounded-full hover:bg-pink-600 transition-colors"><Instagram size={20} /></a>
                <a href="#" className="p-3 bg-gray-800 rounded-full hover:bg-blue-600 transition-colors"><Facebook size={20} /></a>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-green-400">Hubungi Admin</h3>
            <a 
              href={`https://wa.me/${WA_NUMBER}`}
              target="_blank" 
              rel="noreferrer"
              className="flex items-center justify-center md:justify-start gap-3 text-gray-400 hover:text-white transition-colors group"
            >
              <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-green-500 transition-colors">
                <Phone size={20} />
              </div>
              <span className="font-mono text-lg tracking-wide">+62 896-8513-0707</span>
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} AYAM KAGET. Made with 🍗 & 🔥.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;