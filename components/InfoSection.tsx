import React from 'react';
import { ShoppingCart, Truck, MessageCircle, CheckCircle } from 'lucide-react';

const steps = [
  { icon: <ShoppingCart className="text-red-600" size={32} />, title: "Pilih Menu", desc: "Klik tambah menu favorit ke keranjang." },
  { icon: <Truck className="text-yellow-600" size={32} />, title: "Opsi Kirim", desc: "Bisa ambil sendiri atau kami antar." },
  { icon: <MessageCircle className="text-green-600" size={32} />, title: "WhatsApp", desc: "Pesanan dikirim otomatis ke Admin." },
  { icon: <CheckCircle className="text-blue-600" size={32} />, title: "Siap Santap", desc: "Makanan fresh siap dinikmati!" }
];

const InfoSection: React.FC = () => {
  return (
    <section id="guide" className="py-20 bg-white rounded-t-[3rem] -mt-10 relative z-10 shadow-inner">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold brand-font text-center mb-16 text-gray-800">
          Cara Pesan <span className="text-red-600">Mudah!</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="relative group">
              {/* Connector Line */}
              {idx !== steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-1/2 w-full h-1 bg-gray-100 -z-10"></div>
              )}
              
              <div className="flex flex-col items-center text-center p-6 rounded-[2rem] bg-yellow-50 border border-yellow-100 hover:bg-white hover:shadow-xl hover:shadow-yellow-100 transition-all duration-300">
                <div className="bg-white p-5 rounded-2xl shadow-md mb-6 transform group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <h3 className="font-bold text-xl mb-3 text-gray-800">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed px-2">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-gradient-to-r from-yellow-400 to-yellow-300 p-10 rounded-[2.5rem] text-center shadow-xl shadow-yellow-200">
          <h3 className="text-3xl font-bold brand-font text-red-800 mb-3">Jam Operasional ⏰</h3>
          <p className="text-red-900 font-bold text-lg opacity-80 mb-4">Buka Setiap Hari: 10.00 - 21.00 WIB</p>
          <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full text-red-900 text-sm font-semibold">
            Menerima Pesanan untuk Ulang Tahun & Acara
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;