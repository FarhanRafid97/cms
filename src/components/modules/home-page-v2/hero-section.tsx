import LayoutSection from '../home-page/layout-section';
import { CarouselMd } from './carousel';

const HeroSection = () => {
  return (
    <LayoutSection>
      <div className="w-full  min-h-[70vh] flex items-center ">
        <CarouselMd />
      </div>
    </LayoutSection>
  );
};

export default HeroSection;
