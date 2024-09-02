import React from 'react';

const Feature = ({ icon, title, description }) => {
  const IconComponent = icon;  // İkon bileşeni dinamik olarak belirlenir
  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0">
        <IconComponent className="h-12 w-12 text-pink-500" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  );
};

export default Feature;
