import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import GenreMovies from './pages/genre/GenreMovies';
import ActorMovies from './pages/actor/ActorMovies';
import PricingPlans from './pages/PricingPlans';
import Catalog from './pages/Catalog';  // Catalog sayfasını içe aktarın
import Header from './components/Header';
import Footer from './components/Footer'; 
import { searchMovies } from './services/movieService';
import './styles/App.css';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [filters, setFilters] = useState({});

  const handleSearch = async (query) => {
    try {
      const response = await searchMovies(query);
      setSearchResults(response.results);
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="App bg-gray-900 min-h-screen text-white">
      <Header onSearch={handleSearch} onFilterChange={handleFilterChange} />
      <main className="py-6 mt-10">
        <Routes>
          <Route path="/" element={<Home searchResults={searchResults} filters={filters} />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/movies/genre/:genreId" element={<GenreMovies />} />
          <Route path="/movies/actor/:actorId" element={<ActorMovies />} />
          <Route path="/pricing" element={<PricingPlans />} />
          <Route path="/catalog" element={<Catalog />} /> {/* Catalog sayfası için route tanımlandı */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
