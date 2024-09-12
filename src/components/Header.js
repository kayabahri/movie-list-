import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Hamburger from 'hamburger-react';
import SearchBar from './SearchBar';
import Dropdown from './Dropdown';
import { useTranslation } from 'react-i18next';

const Header = ({ onSearch }) => {
  const { t, i18n } = useTranslation();
  const [isHamburgerDropdownOpen, setIsHamburgerDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const hamburgerRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (hamburgerRef.current && !hamburgerRef.current.contains(event.target)) {
        setIsHamburgerDropdownOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleHamburgerToggle = () => {
    setIsHamburgerDropdownOpen((prev) => !prev);
    setIsProfileDropdownOpen(false);
  };

  const handleProfileToggle = () => {
    setIsProfileDropdownOpen((prev) => !prev);
    setIsHamburgerDropdownOpen(false);
  };

  const handleSignInClick = () => {
    navigate('/signin');
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Oturum kapatma hatası:', error);
    }
  };

  const menuItems = [
    { label: t('Films'), href: '/' },
    { label: t('TV Series'), href: '/' },
    { label: t('Anime'), href: '/' },
    { label: t('Cartoons'), href: '/' },
    { label: t('Catalog Grid'), href: '/' },
    { label: t('Catalog List'), href: '/' },
    { label: t('Details Film'), href: '/' },
    { label: t('Details TV Series'), href: '/' },
  ];

  return (
    <header className="bg-gray-900 text-white py-2 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-side-padding flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="text-3xl font-bold">
            <Link to="/">
              <span className="text-white">FLIX</span>
              <span className="bg-gradient-pink text-transparent bg-clip-text">GO</span>
            </Link>
          </div>
          <div className="relative" ref={hamburgerRef}>
            <Hamburger
              toggled={isHamburgerDropdownOpen}
              toggle={handleHamburgerToggle}
              color="#ff55a5"
            />
            {isHamburgerDropdownOpen && (
              <Dropdown items={menuItems} isOpen={isHamburgerDropdownOpen} />
            )}
          </div>
        </div>

        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="hover:text-pink-500 transition-colors duration-300">{t('Home')}</Link>
          <Link to="/catalog" className="hover:text-pink-500 transition-colors duration-300">{t('Catalog')}</Link>
          <Link to="/pricing" className="hover:text-pink-500 transition-colors duration-300">{t('Pricing Plans')}</Link>
        </nav>

        <div className="flex items-center space-x-4">
          <SearchBar onSearch={onSearch} />
          <select
            className="bg-gray-800 text-white rounded-md py-1 px-2"
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            value={i18n.language}
          >
            <option value="en">EN</option>
            <option value="tr">TR</option>
          </select>

          {user ? (
            <div className="relative" ref={profileRef}>
              <button
                className="focus:outline-none"
                onClick={handleProfileToggle}
              >
                <div className="w-10 h-10 rounded-full bg-pink-500 flex justify-center items-center text-white font-bold">
                  {user.email.charAt(0).toUpperCase()}
                </div>
              </button>
              {isProfileDropdownOpen && (
                <Dropdown
                  items={[
                    { label: t('Sign Out'), onClick: handleSignOut },
                  ]}
                  isOpen={isProfileDropdownOpen}
                />
              )}
            </div>
          ) : (
            <button
              className="bg-gradient-pink text-white px-4 py-2 rounded-md shadow-custom-pink"
              onClick={handleSignInClick}
            >
              {t('Sign In')}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
