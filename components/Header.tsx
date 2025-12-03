import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onScrollToSection: (id: string) => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onOpenCart, onScrollToSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Menu', id: 'menu' },
    { label: 'Best Seller', id: 'bestseller' },
    { label: 'Cara Order', id: 'guide' },
  ];

  const handleNavClick = (id: string) => {
    onScrollToSection(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-morphism shadow-lg py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo - Dominan Merah (30%) */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => handleNavClick('home')}
        >
          <div className="bg-red-600 text-white p-2 rounded-xl transform rotate-3 group-hover:rotate-0 transition-transform duration-300 shadow-lg shadow-red-200">
            <h1 className="text-xl md:text-2xl font-bold brand-font leading-none tracking-tight">AYAM<br/>KAGET</h1>
          </div>
        </motion.div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-1 bg-white/50 p-2 rounded-full backdrop-blur-sm border border-white/40 shadow-sm">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="px-6 py-2 rounded-full font-bold text-gray-700 hover:bg-yellow-400 hover:text-red-900 transition-all duration-300"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onOpenCart}
            className="relative bg-white text-red-600 p-3 rounded-full shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-yellow-400"
          >
            <ShoppingCart size={24} />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 bg-green-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white shadow-sm"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          <button 
            className="md:hidden text-red-600 bg-white p-3 rounded-full shadow-lg"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-yellow-50 z-50 flex flex-col p-6 overflow-hidden"
          >
             {/* Decorative Circles */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-yellow-300 rounded-full opacity-50 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-red-200 rounded-full opacity-50 blur-3xl" />

            <div className="relative z-10 flex justify-between items-center mb-12">
              <span className="text-3xl font-bold brand-font text-red-600">Menu</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-3 bg-white text-red-500 rounded-full shadow-md">
                <X size={28} />
              </button>
            </div>
            
            <div className="relative z-10 flex flex-col gap-4">
              {navItems.map((item, idx) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => handleNavClick(item.id)}
                  className="text-left p-4 bg-white rounded-2xl shadow-sm text-xl font-bold text-gray-700 active:scale-95 transition-transform border-l-8 border-transparent hover:border-red-500"
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;