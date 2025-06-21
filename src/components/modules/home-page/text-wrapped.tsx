import { cn } from '@/lib/tiptap-utils';
import React from 'react';
const defaulCssBorder =
  'pointer-events-none  group-hover/cover:opacity-100 group h-3 w-3 border-sky-600 border-2 bg-background dark:bg-white  group-hover/cover:bg-white absolute';
const TextWrapedBorder = ({
  children,
  className: c,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'relative   inline-block border-2 border-sky-600  dark:bg-neutral-900 bg-background/80 px-2 py-2  transition duration-200',
      )}
    >
      <span
        className={cn(
          'dark:text-white inline-block text-sky-600 relative z-20 group-hover/cover:text-white transition duration-200',
          c,
        )}
        style={{ transform: 'none' }}
      >
        {children}
      </span>
      <div className={cn(defaulCssBorder, '-right-[6px] -top-[6px]')}></div>
      <div className={cn(defaulCssBorder, '-bottom-[6px] -right-[6px]')}></div>
      <div className={cn(defaulCssBorder, '-left-[6px] -top-[6px]')}></div>
      <div className={cn(defaulCssBorder, '-bottom-[6px] -left-[6px]')}></div>
    </div>
  );
};

export default TextWrapedBorder;
