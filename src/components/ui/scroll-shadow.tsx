'use client';

import React, { useRef, useState, useEffect, ReactNode } from 'react';

interface ScrollShadowProps {
  children: ReactNode;
}
export function ScrollShadow({ children }: ScrollShadowProps) {
  const [showTopShadow, setShowTopShadow] = useState(false);
  const [showBottomShadow, setShowBottomShadow] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const element = contentRef.current;
    if (element) {
      const { scrollTop, scrollHeight, clientHeight } = element;
      setShowTopShadow(scrollTop > 0);
      setShowBottomShadow(scrollTop < scrollHeight - clientHeight);
    }
  };

  useEffect(() => {
    const element = contentRef.current;
    if (element) {
      handleScroll(); // Check initial state
      element.addEventListener('scroll', handleScroll);
      return () => element.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className="relative w-full  mx-auto h-[75vh]  py-4 px-2  overflow-hidden">
      <div
        className={`absolute top-0 left-0 right-0 h-14 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none transition-opacity duration-200 ${
          showTopShadow ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div
        ref={contentRef}
        className="h-full overflow-auto px-4 py-2 !select-text"
        onScroll={handleScroll}
      >
        {children}
      </div>
      <div
        className={`absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none transition-opacity duration-200 ${
          showBottomShadow ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}
