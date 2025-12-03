
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Store, Send, Navigation, ArrowRight, Banknote, Wallet, QrCode, Copy, Check } from 'lucide-react';
import { CartItem, DeliveryMethod, PaymentMethod, WA_NUMBER, MAPS_LINK } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onSuccess: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, items, onSuccess }) => {
  const [method, setMethod] = useState<DeliveryMethod>('pickup');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [distance, setDistance] = useState<number>(0);
  const [copied, setCopied] = useState<string | null>(null);

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const calculateDeliveryFee = (km: number) => {
    if (km <= 0) return 0;
    const multiplier = Math.ceil(km / 3);
    return multiplier * 2000;
  };

  const deliveryFee = method === 'delivery' ? calculateDeliveryFee(distance) : 0;
  const total = subtotal + deliveryFee;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleWhatsApp = () => {
    let message = `*Halo AYAM KAGET!* 🐔\nSaya mau pesan:\n\n`;
    items.forEach(item => {
      message += `• ${item.name} (${item.quantity}x) - Rp ${(item.price * item.quantity).toLocaleString('id-ID')}\n`;
    });
    message += `\n--------------------------------\n`;
    message += `*Subtotal:* Rp ${subtotal.toLocaleString('id-ID')}\n`;
    message += `*Metode:* ${method === 'pickup' ? 'Ambil Sendiri' : 'Diantar'}\n`;
    
    if (method === 'delivery') {
      message += `*Nama:* ${name}\n`;
      message += `*Alamat:* ${address}\n`;
      message += `*Jarak:* ${distance} KM\n`;
      message += `*Ongkir:* Rp ${deliveryFee.toLocaleString('id-ID')}\n`;
    }

    message += `*Pembayaran:* ${
      paymentMethod === 'cash' ? 'Tunai (Cash/COD)' : 
      paymentMethod === 'dana' ? 'Transfer DANA' : 'Scan QRIS'
    }\n`;

    message += `*TOTAL BAYAR: Rp ${total.toLocaleString('id-ID')}*\n\n`;
    
    if (paymentMethod !== 'cash') {
      message += `_Saya akan segera mengirimkan bukti transfer/pembayaran._\n`;
    }
    
    message += `Mohon diproses ya kak! Terima kasih.`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodedMessage}`, '_blank');
    onSuccess();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-yellow-900/40 backdrop-blur-sm z-[80] flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        className="bg-white rounded-[2rem] w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl border-4 border-white"
      >
        <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
          <div>
             <h2 className="text-2xl font-bold brand-font text-gray-800">Checkout</h2>
             <p className="text-sm text-gray-500">Lengkapi data pesananmu</p>
          </div>
          <button onClick={onClose} className="p-2 bg-gray-100 hover:bg-red-100 hover:text-red-600 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Order Summary */}
          <div className="bg-yellow-50 p-5 rounded-2xl border border-yellow-100">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="bg-yellow-400 w-2 h-6 rounded-full"></span>
              Ringkasan Pesanan
            </h3>
            <ul className="space-y-3">
              {items.map(item => (
                <li key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600 font-medium"><span className="text-gray-800 font-bold">{item.quantity}x</span> {item.name}</span>
                  <span className="font-bold text-gray-800">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</span>
                </li>
              ))}
            </ul>
            <div className="border-t border-yellow-200 mt-4 pt-3 flex justify-between font-bold text-lg text-red-600">
              <span>Subtotal</span>
              <span>Rp {subtotal.toLocaleString('id-ID')}</span>
            </div>
          </div>

          {/* Delivery Method Selection */}
          <div>
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
               <span className="bg-red-500 w-2 h-6 rounded-full"></span>
               Metode Pengambilan
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <label 
                className={`cursor-pointer border-2 rounded-2xl p-4 flex flex-col items-center gap-2 transition-all ${
                  method === 'pickup' ? 'border-red-500 bg-red-50 text-red-700 shadow-md' : 'border-gray-200 text-gray-400 hover:border-red-200 hover:bg-gray-50'
                }`}
              >
                <input 
                  type="radio" 
                  name="method" 
                  value="pickup" 
                  checked={method === 'pickup'}
                  onChange={() => setMethod('pickup')}
                  className="hidden"
                />
                <Store size={28} />
                <span className="font-bold">Ambil Sendiri</span>
              </label>

              <label 
                className={`cursor-pointer border-2 rounded-2xl p-4 flex flex-col items-center gap-2 transition-all ${
                  method === 'delivery' ? 'border-red-500 bg-red-50 text-red-700 shadow-md' : 'border-gray-200 text-gray-400 hover:border-red-200 hover:bg-gray-50'
                }`}
              >
                <input 
                  type="radio" 
                  name="method" 
                  value="delivery" 
                  checked={method === 'delivery'}
                  onChange={() => setMethod('delivery')}
                  className="hidden"
                />
                <Navigation size={28} />
                <span className="font-bold">Diantar</span>
              </label>
            </div>
          </div>

          {/* Delivery Details */}
          <AnimatePresence mode="wait">
            {method === 'pickup' ? (
              <motion.div
                key="pickup-info"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-blue-50 p-4 rounded-xl border border-blue-100"
              >
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">Lokasi AYAM KAGET</p>
                    <p className="text-sm text-gray-600 mb-2">Datang langsung ke outlet kami.</p>
                    <a 
                      href={MAPS_LINK} 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-sm font-bold text-blue-600 hover:underline flex items-center gap-1"
                    >
                      Buka Maps <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="delivery-form"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4 bg-gray-50 p-4 rounded-2xl"
              >
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Nama Penerima</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-red-500 outline-none"
                    placeholder="Contoh: Budi"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Alamat Lengkap</label>
                  <textarea 
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-red-500 outline-none"
                    rows={2}
                    placeholder="Jalan, No. Rumah, Patokan..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Jarak (KM)</label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="number" 
                      min="0"
                      step="0.1"
                      value={distance}
                      onChange={(e) => setDistance(parseFloat(e.target.value) || 0)}
                      className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-red-500 outline-none"
                    />
                    <span className="text-gray-500 font-bold">KM</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center bg-white border border-gray-200 p-3 rounded-xl text-sm shadow-sm">
                  <span>Ongkos Kirim ({distance} km)</span>
                  <span className="font-bold text-red-600">Rp {deliveryFee.toLocaleString('id-ID')}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Payment Method Selection */}
          <div>
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
               <span className="bg-green-500 w-2 h-6 rounded-full"></span>
               Metode Pembayaran
            </h3>
            
            <div className="grid grid-cols-3 gap-3 mb-4">
               <button
                 onClick={() => setPaymentMethod('cash')}
                 className={`p-3 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
                   paymentMethod === 'cash' 
                   ? 'border-green-500 bg-green-50 text-green-700' 
                   : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                 }`}
               >
                 <Banknote size={24} />
                 <span className="text-xs font-bold">Tunai</span>
               </button>
               <button
                 onClick={() => setPaymentMethod('dana')}
                 className={`p-3 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
                   paymentMethod === 'dana' 
                   ? 'border-blue-500 bg-blue-50 text-blue-700' 
                   : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                 }`}
               >
                 <Wallet size={24} />
                 <span className="text-xs font-bold">DANA</span>
               </button>
               <button
                 onClick={() => setPaymentMethod('qris')}
                 className={`p-3 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
                   paymentMethod === 'qris' 
                   ? 'border-gray-800 bg-gray-100 text-gray-900' 
                   : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                 }`}
               >
                 <QrCode size={24} />
                 <span className="text-xs font-bold">QRIS</span>
               </button>
            </div>

            {/* Payment Details */}
            <AnimatePresence mode="wait">
              {paymentMethod === 'dana' && (
                <motion.div
                  key="dana-details"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-sm"
                >
                  <p className="font-bold text-blue-800 mb-2">Transfer ke DANA:</p>
                  <div className="bg-white p-3 rounded-lg border border-blue-100 flex items-center justify-between mb-2">
                    <div>
                      <p className="text-gray-500 text-xs">Nomor DANA</p>
                      <p className="font-mono text-lg font-bold text-gray-800">089685130707</p>
                    </div>
                    <button 
                      onClick={() => handleCopy('089685130707', 'dana')}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors relative"
                    >
                      {copied === 'dana' ? <Check size={18} /> : <Copy size={18} />}
                    </button>
                  </div>
                  <p className="text-gray-600">A.N: <span className="font-bold text-gray-800">Ihay</span></p>
                </motion.div>
              )}

              {paymentMethod === 'qris' && (
                <motion.div
                  key="qris-details"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-center"
                >
                  <p className="font-bold text-gray-800 mb-2">Scan QRIS</p>
                  <div className="bg-white p-2 rounded-lg inline-block shadow-sm border border-gray-200 mb-2">
                     {/* 
                         PENTING: Ganti URL src di bawah ini dengan URL/Path gambar QRIS asli Anda.
                         Contoh: src="/images/qris.jpg" jika file ada di folder public/images
                     */}
                     <img 
                       src="https://i.ibb.co/FL0xV478/photo-2025-12-03-14-59-51.jpg" 
                       alt="Scan QRIS" 
                       className="w-48 h-auto object-contain rounded-md" 
                     />
                     <p className="text-[10px] text-gray-400 mt-1 italic">
                        *Ganti gambar ini dengan QRIS asli Anda
                     </p>
                  </div>
                  <div className="text-left bg-white p-3 rounded-lg border border-gray-200 text-sm">
                    <p className="text-gray-500 text-xs">Nama Merchant</p>
                    <p className="font-bold text-gray-800 mb-1">Hasbuna Muhammad</p>
                    <p className="text-gray-500 text-xs">NMID</p>
                    <div className="flex items-center justify-between">
                       <p className="font-mono text-gray-800">ID1021066978417</p>
                       <button 
                        onClick={() => handleCopy('ID1021066978417', 'nmid')}
                        className="text-gray-500 hover:text-gray-800"
                       >
                         {copied === 'nmid' ? <Check size={14} /> : <Copy size={14} />}
                       </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Final Total */}
          <div className="border-t border-dashed border-gray-300 pt-6">
            <div className="flex justify-between items-end mb-6">
              <span className="text-gray-600 font-bold">Total Pembayaran</span>
              <span className="text-4xl font-black brand-font text-gray-800">Rp {total.toLocaleString('id-ID')}</span>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleWhatsApp}
              disabled={method === 'delivery' && (!name || !address || distance <= 0)}
              className="w-full bg-green-500 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-green-200 hover:bg-green-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
            >
              <Send size={24} />
              {paymentMethod === 'cash' ? 'Pesan Sekarang' : 'Konfirmasi Pembayaran'}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CheckoutModal;
