import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ReusableHeader = ({ title, breadcrumb, backgroundImage }) => {
  const { t } = useTranslation();

  return (
    <div
      className="relative h-48 flex items-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.8)',
      }}
    >
      <div className="container mx-auto px-side-padding flex justify-between items-center">
        <h1 className="text-4xl font-normal text-white">{title}</h1>
        <nav className="text-white text-sm">
          <Link to="/" className="hover:text-pink-500 transition-colors duration-300">
            {t('Home')}
          </Link>
          <span className="mx-2"> {'>'} </span>
          <span className="text-gray-400">{breadcrumb}</span>
        </nav>
      </div>
      <div className="absolute bottom-0 left-0 right-0 border-t border-pink-500"></div>
    </div>
  );
};

export default ReusableHeader;
