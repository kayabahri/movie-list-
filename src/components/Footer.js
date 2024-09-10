import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaTelegram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      {/* Üstteki Çizgi */}
      <div className="w-full border-t border-pink-500 mb-8"></div>
      
      <div className="container mx-auto px-side-padding grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="text-left">
          <h2 className="text-2xl font-bold text-white">
            <span className="text-white">FLIX</span><span className="text-pink-500">GO</span>
          </h2>
          <p className="mt-2 max-w-md">
            Movies & TV Shows, Online cinema, Movie database HTML Template.
            <br />
            The perfect choice for your project.
          </p>
          <div className="mt-4 flex space-x-4">
            <a href="#" className="hover:text-pink-500 transition-colors duration-300">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="hover:text-pink-500 transition-colors duration-300">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="hover:text-pink-500 transition-colors duration-300">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="hover:text-pink-500 transition-colors duration-300">
              <FaTelegram size={24} />
            </a>
          </div>
        </div>
        
        <div className="text-left">
          <h3 className="text-xl font-semibold">Resources</h3>
          <ul className="mt-2 space-y-2">
            <li><a href="#" className="hover:text-pink-500 transition-colors duration-300">About us</a></li>
            <li><a href="#" className="hover:text-pink-500 transition-colors duration-300">Pricing plans</a></li>
            <li><a href="#" className="hover:text-pink-500 transition-colors duration-300">Help center</a></li>
            <li><a href="#" className="hover:text-pink-500 transition-colors duration-300">Contacts</a></li>
          </ul>
        </div>

        <div className="text-left">
          <h3 className="text-xl font-semibold">Browse</h3>
          <ul className="mt-2 space-y-2">
            <li><a href="#" className="hover:text-pink-500 transition-colors duration-300">Movies</a></li>
            <li><a href="#" className="hover:text-pink-500 transition-colors duration-300">TV Shows</a></li>
            <li><a href="#" className="hover:text-pink-500 transition-colors duration-300">Anime</a></li>
            <li><a href="#" className="hover:text-pink-500 transition-colors duration-300">Cartoons</a></li>
          </ul>
        </div>

        <div className="text-left">
          <h3 className="text-xl font-semibold">Help</h3>
          <ul className="mt-2 space-y-2">
            <li><a href="#" className="hover:text-pink-500 transition-colors duration-300">Account & Billing</a></li>
            <li><a href="#" className="hover:text-pink-500 transition-colors duration-300">Plans & Pricing</a></li>
            <li><a href="#" className="hover:text-pink-500 transition-colors duration-300">Supported devices</a></li>
            <li><a href="#" className="hover:text-pink-500 transition-colors duration-300">Accessibility</a></li>
          </ul>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-400">
        © FlixGo, 2024. Created by Bahri KAYA.
      </div>
    </footer>
  );
};

export default Footer;
