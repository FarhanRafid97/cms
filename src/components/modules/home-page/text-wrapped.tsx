import { cn } from '@/lib/tiptap-utils';
import React from 'react';

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
        'relative hover:bg-neutral-900  group/cover inline-block dark:bg-neutral-900 bg-neutral-100 px-2 py-2  transition duration-200 rounded-sm',
      )}
    >
      <span
        className={cn(
          'dark:text-white inline-block text-rose-500 relative z-20 group-hover/cover:text-white transition duration-200',
          c,
        )}
        style={{ transform: 'none' }}
      >
        {children}
      </span>
      <div className="pointer-events-none animate-pulse group-hover/cover:hidden group-hover/cover:opacity-100 group h-2 w-2 rounded-full bg-neutral-600 dark:bg-white opacity-20 group-hover/cover:bg-white absolute -right-[2px] -top-[2px]"></div>
      <div className="pointer-events-none animate-pulse group-hover/cover:hidden group-hover/cover:opacity-100 group h-2 w-2 rounded-full bg-neutral-600 dark:bg-white opacity-20 group-hover/cover:bg-white absolute -bottom-[2px] -right-[2px]"></div>
      <div className="pointer-events-none animate-pulse group-hover/cover:hidden group-hover/cover:opacity-100 group h-2 w-2 rounded-full bg-neutral-600 dark:bg-white opacity-20 group-hover/cover:bg-white absolute -left-[2px] -top-[2px]"></div>
      <div className="pointer-events-none animate-pulse group-hover/cover:hidden group-hover/cover:opacity-100 group h-2 w-2 rounded-full bg-neutral-600 dark:bg-white opacity-20 group-hover/cover:bg-white absolute -bottom-[2px] -left-[2px]"></div>
    </div>
  );
};

export default TextWrapedBorder;
