import React from 'react';
import { Link } from 'react-router-dom';

const ReusableHeader = ({ title, breadcrumb, backgroundImage }) => {
  return (
    <div
      className="relative h-48 flex items-center justify-between bg-cover bg-center px-side-padding"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.8)',
      }}
    >
      {/* Başlık */}
      <h1 className="text-custom-title font-normal">
        {title}
      </h1>

      {/* Yönlendirme (Breadcrumb) */}
      <div className="text-white text-sm">
        <nav className="flex items-center space-x-2">
          <Link to="/" className="hover:text-pink-500 transition-colors duration-300">
            Home
          </Link>
          <span>{'>'}</span>
          <span className="text-gray-400">{breadcrumb}</span>
        </nav>
      </div>

      {/* Alt Çizgi */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-pink"></div>
    </div>
  );
};

export default ReusableHeader;
