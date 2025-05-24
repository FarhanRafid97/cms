import { FC } from 'react';
import { Separator } from './ui/separator';

interface TitleSectionProps {
  title: string;
  description?: string;
}

const TitleSection: FC<TitleSectionProps> = ({ title, description }) => {
  return (
    <div>
      <h1 className="text-lg font-medium ">{title}</h1>
      <p className="text-xs text-gray-400 font-[300]">{description}</p>
      <Separator className="my-6" />
    </div>
  );
};

export default TitleSection;
