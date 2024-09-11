import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

const SearchBar = () => {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query) {
      navigate(`/catalog?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center bg-gray-800 rounded-full">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t('Search')}
        className="bg-gray-800 text-white py-2 px-4 pl-10 rounded-full focus:outline-none"
      />
      <button type="submit" className="absolute left-3">
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
      </button>
    </form>
  );
};

export default SearchBar;
