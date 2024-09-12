import React from 'react';

const Dropdown = ({ items, isOpen }) => {
  return (
    <div
      className={`absolute mt-2 w-64 bg-gray-900 rounded-md shadow-lg z-10 origin-top transition-all duration-500 ease-in-out transform ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`}
      style={{ top: '100%' }}
    >
      <div className="h-0.5 bg-gradient-pink rounded-t-md"></div>
      <div className="py-4 px-6">
        <div className="flex flex-col space-y-2">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className="text-white hover:text-pink-500 transition-colors duration-300 text-left"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
