import HeroSection from '@/components/modules/home-page-v2/hero-section';
import ListMenu from '@/components/modules/home-page-v2/list-menu';

export default function Home() {
  return (
    <div className="grid grid-cols-1 relative ">
      <HeroSection />
      <ListMenu />
    </div>
  );
}
