import LayoutSection from '../home-page/layout-section';
import { CarouselMd } from './carousel';

const HeroSection = () => {
  return (
    <LayoutSection>
      <div className="w-full  ">
        {/* Hero Carousel */}
        <CarouselMd />

        {/* Overlay for additional content if needed */}
        <div className="absolute inset-0 pointer-events-none">
          {/* You can add floating elements or additional content here */}
        </div>
      </div>
    </LayoutSection>
  );
};

export default HeroSection;
