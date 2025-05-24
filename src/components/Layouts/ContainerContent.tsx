import { ReactNode } from 'react';

interface ContainerContentProps {
  children: ReactNode;
}

const ContainerContent: React.FC<ContainerContentProps> = ({ children }) => {
  return <div className="px-4  md:px-4  w-full ">{children}</div>;
};

export default ContainerContent;
