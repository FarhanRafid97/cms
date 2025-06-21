import React from 'react';
import { Footerdemo } from '../modules/home-page/footer';
import { Navbar } from './Navbar';

const layoutWithNavbar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative bg-[#f5f5f5]">
      <Navbar />

      {children}
      <div>
        <Footerdemo />
      </div>
    </div>
  );
};

export default layoutWithNavbar;
