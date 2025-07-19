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
  // eslint-disable-next-line no-unused-vars
  setIsEdit: (value: boolean) => void;
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
      animate={{ marginLeft: isEdit ? '0px' : '-320px', x: isEdit ? '0px' : '320px' }}
      transition={{ ease: [0.79, 0.14, 0.15, 0.86], duration: 0.15 }}
    >
      <div className="w-80 flex-shrink-0    md:sticky top-12 h-[calc(100vh-5rem)]  bg-background border-l-[0.5px] border-border-clean p-4">
        <div className="disabled:pointer-events-none  w-full ">
          <div className="w-full h-full flex">{children}</div>
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
  // eslint-disable-next-line no-unused-vars
  setIsEdit: (value: boolean) => void;
  isEdit: boolean;
}) => {
  return (
    <WrapperSideContent isMobile={isMobile} setIsEdit={setIsEdit} isEdit={isEdit}>
      <div>Hello world</div>
    </WrapperSideContent>
  );
};
