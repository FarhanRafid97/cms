import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
interface ContainerSectionProps {
  children: ReactNode;
  className?: string;
  contentClass?: string;
}

const ContainerSection: React.FC<ContainerSectionProps> = ({ children, className: c }) => {
  return <div className={cn('mt-6 xs:px-0  overflow-auto w-full p-1  ', c)}>{children}</div>;
};

export default ContainerSection;
