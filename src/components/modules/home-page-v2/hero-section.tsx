import React from 'react';
import CarouselHero from './carousel-hero';

const HeroSection = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Hero Carousel */}
      <CarouselHero />

      {/* Overlay for additional content if needed */}
      <div className="absolute inset-0 pointer-events-none">
        {/* You can add floating elements or additional content here */}
      </div>
    </section>
  );
};

export default HeroSection;
