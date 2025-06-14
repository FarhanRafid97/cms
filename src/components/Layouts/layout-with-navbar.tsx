import React from 'react';
import { Navbar } from './Navbar';
import LayoutSection from '../modules/home-page/layout-section';
import { Footerdemo } from '../modules/home-page/footer';

const layoutWithNavbar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <LayoutSection className="py-2  sticky top-4 z-50 bg-transparent md:py-0">
        <Navbar />
      </LayoutSection>
      {children}
      <Footerdemo />
    </div>
  );
};

export default layoutWithNavbar;
