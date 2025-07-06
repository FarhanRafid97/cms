import BentoSection from '@/components/modules/home-page/bento-section';
import Faq from '@/components/modules/home-page/faq';
import { Hero7 } from '@/components/modules/home-page/hero';

export default function Home() {
  return (
    <div className="grid grid-cols-1 relative ">
      <Hero7 />
      {/* <TentangKomunistas /> */}

      <BentoSection />
      <Faq />
      {/* <ContactUs /> */}
    </div>
  );
}
