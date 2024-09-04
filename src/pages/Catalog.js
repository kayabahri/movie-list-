import React from 'react';
import ReusableHeader from '../components/ReusableHeader';
import cinemaImage from '../assets/cinema.jpg';

const Catalog = () => {
  return (
    <div className="bg-gray-900 text-white font-ubuntu max-w-custom-max mx-auto mt-[-64px]">
      <ReusableHeader
        title="Catalog"
        breadcrumb="Catalog"
        backgroundImage={cinemaImage}
      />

      {/* Filtreleme seçenekleri */}
      <div className="px-side-padding py-8 flex items-center justify-between space-x-4">
        <div className="flex space-x-4">
          <button className="bg-gray-800 text-white py-2 px-4 rounded-lg">All genres</button>
          <button className="bg-gray-800 text-white py-2 px-4 rounded-lg">Any quality</button>
          <button className="bg-gray-800 text-white py-2 px-4 rounded-lg">from 7.0</button>
          <button className="bg-gray-800 text-white py-2 px-4 rounded-lg">Relevance</button>
        </div>
        <button className="bg-gradient-pink text-white py-2 px-6 rounded-lg shadow-custom-pink">APPLY</button>
      </div>

      {/* Catalog içeriği burada yer alacak */}
      <div className="px-side-padding py-16">
        <h2 className="text-custom-title font-normal mb-6 text-left">Catalog Content</h2>
        <p className="text-gray-400 mb-12 text-left">
          Burada Catalog sayfasına özel içerikler olacak.
        </p>
      </div>
    </div>
  );
};

export default Catalog;
