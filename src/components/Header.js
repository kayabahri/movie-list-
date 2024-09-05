import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hamburger from 'hamburger-react';
import SearchBar from './SearchBar';
import Dropdown from './Dropdown';  // Dropdown bileşenini içe aktarın

const Header = ({ onSearch }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const menuItems = [
    { label: 'Films', href: '/' },
    { label: 'TV Series', href: '/' },
    { label: 'Anime', href: '/' },
    { label: 'Cartoons', href: '/' },
    { label: 'Catalog Grid', href: '/' },
    { label: 'Catalog List', href: '/' },
    { label: 'Details Film', href: '/' },
    { label: 'Details TV Series', href: '/' },
  ];

  return (
    <header className="bg-gray-900 text-white py-2 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-side-padding flex justify-between items-center">
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
              toggled={isDropdownOpen}
              toggle={handleDropdownToggle}
              color="#ff55a5"
            />
            {isDropdownOpen && (
              <Dropdown items={menuItems} isOpen={isDropdownOpen} />
            )}
          </div>
        </div>

        {/* Orta Kısım: Navigasyon */}
        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="hover:text-pink-500 transition-colors duration-300">Home</Link>
          <Link to="/catalog" className="hover:text-pink-500 transition-colors duration-300">Catalog</Link>
          <Link to="/pricing" className="hover:text-pink-500 transition-colors duration-300">Pricing Plans</Link>
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
