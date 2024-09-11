import React from 'react';
import ReusableHeader from '../components/ReusableHeader';
import cinemaImage from '../assets/cinema.jpg';
import Card from '../components/PricingPlans/Card';
import Feature from '../components/PricingPlans/Feature';
import { FaTv, FaDatabase, FaFilm, FaClosedCaptioning, FaCalendarCheck, FaDesktop } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const PricingPlans = () => {
  const { t } = useTranslation();

  const plans = [
    {
      title: t('Starter'),
      features: [
        t('7 days'),
        t('720p Resolution'),
        t('Limited Availability'),
        t('Desktop Only'),
        t('Limited Support')
      ],
      price: t('Free'),
      buttonLabel: t('REGISTER'),
    },
    {
      title: t('Premium'),
      features: [
        t('1 Month'),
        t('Full HD'),
        t('Lifetime Availability'),
        t('TV & Desktop'),
        t('24/7 Support')
      ],
      price: '$19.99',
      buttonLabel: t('CHOOSE PLAN'),
    },
    {
      title: t('Cinematic'),
      features: [
        t('2 Months'),
        t('Ultra HD'),
        t('Lifetime Availability'),
        t('Any Device'),
        t('24/7 Support')
      ],
      price: '$39.99',
      buttonLabel: t('CHOOSE PLAN'),
    },
  ];

  const features = [
    {
      icon: FaDesktop,
      title: t('Ultra HD'),
      description: t('Experience movies like never before with our Ultra HD feature. Immerse yourself in stunning visuals, vibrant colors, and crystal-clear detail.'),
    },
    {
      icon: FaCalendarCheck,
      title: t('Early access to new items'),
      description: t('Be the first to experience the latest movies and exclusive content with our Early Access feature. Get a sneak peek into upcoming releases, gain access to special screenings, and stay ahead of the curve.'),
    },
    {
      icon: FaDatabase,
      title: t('Large movie database'),
      description: t('Discover a vast and diverse collection of movies in our extensive database. With thousands of titles to choose from, you\'ll never run out of options.'),
    },
    {
      icon: FaTv,
      title: t('Online TV'),
      description: t('Expand your entertainment horizons with our Online TV. Stream live TV channels, catch up on your favorite shows, and enjoy a wide range of television content online.'),
    },
    {
      icon: FaFilm,
      title: t('Airplay'),
      description: t('Seamlessly stream movies from your device to the big screen with Airplay integration. Experience the cinematic magic in the comfort of your living room and share the excitement with friends and family.'),
    },
    {
      icon: FaClosedCaptioning,
      title: t('Multi language subtitles'),
      description: t('Break language barriers and enjoy movies from around the world with our multi-language subtitles. Explore different cultures, expand your cinematic horizons, and appreciate the beauty of global cinema.'),
    },
  ];

  return (
    <div className="bg-gray-900 text-white font-ubuntu max-w-custom-max mx-auto">
      <ReusableHeader
        title={t('Pricing Plans')}
        breadcrumb={t('Pricing Plans')}
        backgroundImage={cinemaImage}
      />

      {/* Kartlar ve diğer bölümler */}
      <div className="container mx-auto px-side-padding py-16">
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

      <div className="container mx-auto px-side-padding py-16">
        <h2 className="text-custom-title font-normal mb-6 text-left">
          {t('Our Features')}
        </h2>
        <p className="text-gray-400 mb-12 text-left">
          {t('Welcome to FlixGo movie site, the ultimate destination for all film enthusiasts. Immerse yourself in a world of captivating stories, stunning visuals, and unforgettable performances. Explore our extensive library of movies, spanning across genres, eras, and cultures.')}
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
