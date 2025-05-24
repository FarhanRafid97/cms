import ContainerContent from '@/components/Layouts/ContainerContent';
import ContainerSection from '@/components/Layouts/ContainerSection';
import TableListCategory from '@/components/modules/dashboard/category/Table/table-categry';
import TitlePage from '@/components/TitlePage';
import { Shield } from 'lucide-react';

const Category = () => {
  return (
    <ContainerContent>
      <TitlePage Icon={<Shield className="text-background" />} title="Category" />
      <ContainerSection>
        <TableListCategory />
      </ContainerSection>
    </ContainerContent>
  );
};

export default Category;
