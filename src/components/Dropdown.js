import React from 'react';

const Dropdown = ({ items, isOpen }) => {
  return (
    <div
      className={`absolute mt-2 w-64 bg-gray-900 rounded-md shadow-lg z-10 origin-top-left transform transition-all duration-500 ease-in-out ${
        isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
      }`}
      style={{ top: '100%' }} // Header'ın hemen altından hizalanacak
    >
      <div className="h-0.5 bg-gradient-pink rounded-t-md"></div>
      <div className="py-4 px-6">
        <div className="flex flex-col space-y-2">
          {items.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="text-white hover:text-pink-500 transition-colors duration-300 whitespace-nowrap overflow-hidden"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;