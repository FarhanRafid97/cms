import ContainerContent from '@/components/Layouts/ContainerContent';
import ContainerSection from '@/components/Layouts/ContainerSection';
import NotFound from '@/components/NotFound';
import { Button } from '@/components/ui/button';

import { HomeIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

const PageNoFound = () => {
  return (
    <ContainerContent>
      <ContainerSection className="min-h-[50vh]">
        <div className="flex flex-col items-center justify-center pb-[50px]">
          <NotFound />
          <Link href="/">
            <Button variant="ghost" className="w-60 gap-2 items-center">
              <HomeIcon width={16} height={16} /> Kembali Ke Home
            </Button>
          </Link>
        </div>
      </ContainerSection>
    </ContainerContent>
  );
};

export default PageNoFound;
