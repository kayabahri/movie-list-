// src/pages/Catalog.js
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
