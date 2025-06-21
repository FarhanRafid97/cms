import BentoSection from '@/components/modules/home-page/bento-section';
import { Hero7 } from '@/components/modules/home-page/hero';
import TentangKomunistas from '@/components/modules/home-page/tentang-komunitas';
import LayoutWithNavbar from '@/components/Layouts/layout-with-navbar';
import Faq from '@/components/modules/home-page/faq';
import { ContactUs } from '@/components/modules/home-page/contact-us';

export default function Home() {
  return (
    <LayoutWithNavbar>
      <div className="grid grid-cols-1 relative ">
        <Hero7 />
        <TentangKomunistas />

        <BentoSection />
        <Faq />
        <ContactUs />
      </div>
    </LayoutWithNavbar>
  );
}
