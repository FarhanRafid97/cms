import React, { ReactNode } from 'react';

interface IContainerProps {
  children: ReactNode;
}
const Container: React.FC<IContainerProps> = ({ children }) => {
  return <div className="w-11/12 mx-auto py-3 bg-red-100">{children}</div>;
};

export default Container;
