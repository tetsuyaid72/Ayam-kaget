import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = React.useState(1);

  const increment = () => setQuantity(q => q + 1);
  const decrement = () => setQuantity(q => Math.max(1, q - 1));

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setQuantity(1);
  };

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-white rounded-[2rem] p-4 shadow-lg hover:shadow-2xl hover:shadow-yellow-200 transition-all duration-300 border border-yellow-100 group relative flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative h-48 rounded-[1.5rem] overflow-hidden bg-yellow-50 mb-4">
        <div className="absolute inset-0 bg-yellow-200 opacity-0 group-hover:opacity-20 transition-opacity z-10" />
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {product.isBestSeller && (
          <div className="absolute top-0 left-0 bg-red-600 text-white text-xs font-bold px-4 py-2 rounded-br-2xl shadow-md z-20">
            🔥 BEST SELLER
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-gray-800 brand-font leading-tight mb-2 group-hover:text-red-600 transition-colors">
          {product.name}
        </h3>
        
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed flex-1">
          {product.description}
        </p>

        {/* Price & Actions */}
        <div className="mt-auto">
          <div className="mb-4">
             <span className="text-2xl font-black text-gray-800">
               Rp {product.price.toLocaleString('id-ID')}
             </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Quantity Control (Soft Yellow) */}
            <div className="flex items-center bg-yellow-50 rounded-xl p-1 border border-yellow-200">
              <button 
                onClick={decrement}
                className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm text-gray-600 hover:text-red-600 active:scale-95 transition-all"
              >
                <Minus size={16} />
              </button>
              <span className="w-8 text-center font-bold text-gray-800">{quantity}</span>
              <button 
                onClick={increment}
                className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm text-gray-600 hover:text-green-600 active:scale-95 transition-all"
              >
                <Plus size={16} />
              </button>
            </div>

            {/* Add Button (Red - 30%) */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleAdd}
              className="flex-1 bg-red-600 text-white py-2 px-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-red-700 transition-colors shadow-lg shadow-red-200"
            >
              <ShoppingBag size={18} />
              <span className="hidden sm:inline">Tambah</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;