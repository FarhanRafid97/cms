import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  Sheet as WrapperSheet,
} from '@/components/ui/sheet';
import { motion } from 'motion/react';
import React from 'react';

const WrapperSideContent = ({
  children,
  isMobile,
  setIsEdit,
  isEdit,
}: {
  children: React.ReactNode;
  isMobile: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  isEdit: boolean;
}) => {
  if (isMobile) {
    return (
      <WrapperSheet open={isEdit} onOpenChange={setIsEdit}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit Detail POst</SheetTitle>
          </SheetHeader>
          {children}
        </SheetContent>
      </WrapperSheet>
    );
  }
  return (
    <motion.div
      animate={{ width: !isEdit ? '0%' : '20rem' }}
      transition={{ type: 'spring', bounce: 0.1, duration: 0.3 }}
      style={{ position: 'relative' }}
    >
      <div className="w-80 flex-shrink-0  absolute  md:sticky top-16 h-[calc(100vh-5rem)] overflow-y-auto bg-sidebar/10 border-l p-4">
        <div className="disabled:pointer-events-none  w-full ">
          <div className="bg-red-400 w-full h-full flex">{children}</div>
        </div>
      </div>
    </motion.div>
  );
};

export const SideContent = ({
  isMobile,
  setIsEdit,
  isEdit,
}: {
  isMobile: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  isEdit: boolean;
}) => {
  return (
    <WrapperSideContent isMobile={isMobile} setIsEdit={setIsEdit} isEdit={isEdit}>
      <div>Hello world</div>
    </WrapperSideContent>
  );
};
