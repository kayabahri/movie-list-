import React from 'react';
import { Link } from 'react-router-dom';
import cinemaImage from '../assets/cinema.jpg';
import Card from '../components/PricingPlans/Card';
import Feature from '../components/PricingPlans/Feature';
import { FaTv, FaDatabase, FaFilm, FaClosedCaptioning, FaCalendarCheck, FaDesktop } from 'react-icons/fa';

const PricingPlans = () => {
  const plans = [
    {
      title: 'Starter',
      features: ['7 days', '720p Resolution', 'Limited Availability', 'Desktop Only', 'Limited Support'],
      price: 'Free',
      buttonLabel: 'REGISTER',
    },
    {
      title: 'Premium',
      features: ['1 Month', 'Full HD', 'Lifetime Availability', 'TV & Desktop', '24/7 Support'],
      price: '$19.99',
      buttonLabel: 'CHOOSE PLAN',
    },
    {
      title: 'Cinematic',
      features: ['2 Months', 'Ultra HD', 'Lifetime Availability', 'Any Device', '24/7 Support'],
      price: '$39.99',
      buttonLabel: 'CHOOSE PLAN',
    },
  ];

  const features = [
    {
      icon: FaDesktop,
      title: 'Ultra HD',
      description: 'Experience movies like never before with our Ultra HD feature. Immerse yourself in stunning visuals, vibrant colors, and crystal-clear detail.',
    },
    {
      icon: FaCalendarCheck,
      title: 'Early access to new items',
      description: 'Be the first to experience the latest movies and exclusive content with our Early Access feature. Get a sneak peek into upcoming releases, gain access to special screenings, and stay ahead of the curve.',
    },
    {
      icon: FaDatabase,
      title: 'Large movie database',
      description: 'Discover a vast and diverse collection of movies in our extensive database. With thousands of titles to choose from, you\'ll never run out of options.',
    },
    {
      icon: FaTv,
      title: 'Online TV',
      description: 'Expand your entertainment horizons with our Online TV. Stream live TV channels, catch up on your favorite shows, and enjoy a wide range of television content online.',
    },
    {
      icon: FaFilm,
      title: 'Airplay',
      description: 'Seamlessly stream movies from your device to the big screen with Airplay integration. Experience the cinematic magic in the comfort of your living room and share the excitement with friends and family.',
    },
    {
      icon: FaClosedCaptioning,
      title: 'Multi language subtitles',
      description: 'Break language barriers and enjoy movies from around the world with our multi-language subtitles. Explore different cultures, expand your cinematic horizons, and appreciate the beauty of global cinema.',
    },
  ];

  return (
    <div className="bg-gray-900 text-white font-ubuntu max-w-custom-max mx-auto mt-[-64px]"> {/* Negatif margin-top eklendi */}
      {/* Üst Bölüm */}
      <div
        className="relative h-48 flex items-center justify-between bg-cover bg-center px-side-padding"
        style={{
          backgroundImage: `url(${cinemaImage})`,
          boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.8)',
        }}
      >
        {/* Başlık */}
        <h1 className="text-custom-title font-normal">
          Pricing Plans
        </h1>

        {/* Yönlendirme (Breadcrumb) */}
        <div className="text-white text-sm">
          <nav className="flex items-center space-x-2">
            <Link to="/" className="hover:text-pink-500 transition-colors duration-300">
              Home
            </Link>
            <span>{'>'}</span>
            <span className="text-gray-400">Pricing Plans</span>
          </nav>
        </div>

        {/* Alt Çizgi */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-pink"></div>
      </div>

      {/* Kartlar Bölümü */}
      <div className="px-side-padding py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card
              key={index}
              title={plan.title}
              features={plan.features}
              price={plan.price}
              buttonLabel={plan.buttonLabel}
            />
          ))}
        </div>
      </div>

      {/* Our Features Bölümü */}
      <div className="px-side-padding py-16">
        <h2 className="text-custom-title font-normal mb-6 text-left">
          Our Features
        </h2>
        <p className="text-gray-400 mb-12 text-left">
          Welcome to FlixGo movie site, the ultimate destination for all film enthusiasts. Immerse yourself in a world of captivating stories, stunning visuals, and unforgettable performances. Explore our extensive library of movies, spanning across genres, eras, and cultures.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {features.map((feature, index) => (
            <Feature
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </div>
  );  
};

export default PricingPlans;
