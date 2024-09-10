import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Card = ({ title, features, price, buttonLabel, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg relative text-left">
        <Skeleton width="100%" height={30} />
        <ul className="mt-4 space-y-2">
          {[...Array(4)].map((_, index) => (
            <li key={index}>
              <Skeleton width="80%" height={20} />
            </li>
          ))}
        </ul>
        <Skeleton width="100%" height={50} className="mt-6" />
      </div>
    );
  }

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg relative text-left transition-transform duration-500 hover:scale-105 hover:shadow-xl hover:before:content-[''] hover:before:absolute hover:before:top-0 hover:before:left-0 hover:before:right-0 hover:before:h-1 hover:before:bg-gradient-pink hover:before:transition-all duration-500">
      <div className="absolute top-4 right-4 text-pink-500 text-2xl font-medium">
        {price}
      </div>
      <h2 className="text-xl font-medium mb-4">{title}</h2>
      <ul className="mb-6">
        {features.map((feature, index) => (
          <li key={index} className="mb-2">
            <span className="text-pink-500 mr-2">•</span>
            {feature}
          </li>
        ))}
      </ul>
      <button className="bg-gradient-pink text-white px-6 py-3 rounded-md shadow-custom-pink transition-all duration-500 hover:brightness-125 hover:shadow-hover-glow w-full">
        {buttonLabel}
      </button>
    </div>
  );
};

export default Card;
