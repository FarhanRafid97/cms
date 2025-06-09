import HeroSection from '@/components/modules/home-page/hero-section';

import BentoSection from '@/components/modules/home-page/bento-section';

export default function Home() {
  return (
    <div className="grid grid-cols-1 gap-4">
      <HeroSection />
      <BentoSection />
    </div>
  );
}
