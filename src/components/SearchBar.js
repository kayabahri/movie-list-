import React, { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch && query) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center bg-gray-800 rounded-full">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search"
        className="bg-gray-800 text-white py-2 px-4 pl-10 rounded-full focus:outline-none"
      />
      <button type="submit" className="absolute left-3">
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
      </button>
    </form>
  );
};

export default SearchBar;
