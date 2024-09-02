import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaFilter } from 'react-icons/fa';
import Hamburger from 'hamburger-react';
import SearchBar from './SearchBar';
import Filters from './Filters';

const Header = ({ onSearch, onFilterChange }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);

  const catalogItems = [
    { label: 'Films', href: '/films' },
    { label: 'TV Series', href: '/tv-series' },
    { label: 'Anime', href: '/anime' },
    { label: 'Cartoons', href: '/cartoons' },
    { label: 'Catalog Grid', href: '/catalog-grid' },
    { label: 'Catalog List', href: '/catalog-list' },
    { label: 'Details Film', href: '/details-film' },
    { label: 'Details TV Series', href: '/details-tv-series' },
  ];

  const pagesItems = [
    { label: 'About us', href: '/about-us' },
    { label: 'Help center', href: '/help-center' },
    { label: 'Profile', href: '/profile' },
    { label: 'Actor', href: '/actor' },
    { label: 'Contacts', href: '/contacts' },
    { label: 'Privacy policy', href: '/privacy-policy' },
  ];

  const handleDropdownToggle = (dropdownName) => {
    setActiveDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <header className="bg-gray-900 text-white py-2 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center px-side-padding">
        {/* Sol Kısım: Logo */}
        <div className="flex items-center space-x-4">
          <div className="text-3xl font-bold">
            <Link to="/">
              <span className="text-white">FLIX</span>
              <span className="bg-gradient-pink text-transparent bg-clip-text">GO</span>
            </Link>
          </div>
          {/* Hamburger Menüsü */}
          <div className="relative" ref={dropdownRef}>
            <Hamburger
              toggled={activeDropdown === 'catalog'}
              toggle={() => handleDropdownToggle('catalog')}
              color="#ff55a5"
            />
            <div
              className={`absolute mt-2 w-64 bg-gray-900 rounded-md shadow-lg z-10 origin-top-left transform transition-all duration-500 ease-in-out ${
                activeDropdown === 'catalog' ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
              }`}
            >
              <div className="h-0.5 bg-gradient-pink rounded-t-md"></div>
              <div className="py-4 px-6">
                <div className="flex flex-col space-y-2">
                  {catalogItems.map((item, index) => (
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
          </div>
        </div>

        {/* Orta Kısım: Navigasyon */}
        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="hover:text-pink-500 transition-colors duration-300">Home</Link>
          <Link to="/catalog" className="hover:text-pink-500 transition-colors duration-300">Catalog</Link>
          <Link to="/pricing" className="hover:text-pink-500 transition-colors duration-300">Pricing Plans</Link>
          <div className="relative">
            <button
              className="hover:text-pink-500 transition-colors duration-300"
              onClick={() => handleDropdownToggle('pages')}
            >
              Pages
            </button>
            <div
              className={`absolute mt-2 w-64 bg-gray-900 rounded-md shadow-lg z-10 origin-top-left transform transition-all duration-500 ease-in-out ${
                activeDropdown === 'pages' ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
              }`}
            >
              <div className="h-0.5 bg-gradient-pink rounded-t-md"></div>
              <div className="py-4 px-6">
                <div className="flex flex-col space-y-2">
                  {pagesItems.map((item, index) => (
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
          </div>
          {/* Filters Dropdown */}
          <div className="relative">
            <button
              className="hover:text-pink-500 transition-colors duration-300 flex items-center space-x-1"
              onClick={() => handleDropdownToggle('filters')}
            >
              <FaFilter />
              <span>Filters</span>
            </button>
            <div
              className={`absolute mt-2 w-64 bg-gray-900 rounded-md shadow-lg z-10 origin-top-left transform transition-all duration-500 ease-in-out ${
                activeDropdown === 'filters' ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
              }`}
            >
              <div className="h-0.5 bg-gradient-pink rounded-t-md"></div>
              <div className="py-4 px-6">
                <Filters onFilterChange={onFilterChange} />
              </div>
            </div>
          </div>
        </nav>

        {/* Sağ Kısım: Arama Çubuğu ve Diğer Butonlar */}
        <div className="grid gap-y-2 md:flex items-center space-x-4">
          <SearchBar onSearch={onSearch} />
          <select className="bg-gray-800 text-white rounded-md py-1 px-2">
            <option>EN</option>
            <option>TR</option>
          </select>
          <button className="bg-gradient-pink text-white px-4 py-2 rounded-md shadow-custom-pink">
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
