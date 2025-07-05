import { cn } from '@/lib/tiptap-utils';
import React from 'react';

type Variant = 'sky' | 'rose' | 'emerald' | 'black';

interface TextWrapedBorderProps {
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
}

const getVariantStyles = (variant: Variant) => {
  switch (variant) {
    case 'rose':
      return {
        container: 'border-rose-500 dark:bg-neutral-900 bg-background/80',
        text: 'text-rose-600 dark:text-white group-hover/cover:text-white',
        border: 'border-rose-500 bg-background dark:bg-white group-hover/cover:bg-white',
      };
    case 'emerald':
      return {
        container: 'border-emerald-500 dark:bg-neutral-900 bg-background/80',
        text: 'text-emerald-600 dark:text-white group-hover/cover:text-white',
        border: 'border-emerald-500 bg-background dark:bg-white group-hover/cover:bg-white',
      };
    case 'black':
      return {
        container: 'border-black dark:border-white dark:bg-neutral-900 bg-background/80',
        text: 'text-black dark:text-white group-hover/cover:text-white',
        border:
          'border-black dark:border-white bg-background dark:bg-white group-hover/cover:bg-white',
      };
    default: // sky
      return {
        container: 'border-sky-600 dark:bg-neutral-900 bg-background/80',
        text: 'text-sky-600 dark:text-white group-hover/cover:text-white',
        border: 'border-sky-600 bg-background dark:bg-white group-hover/cover:bg-white',
      };
  }
};

const TextWrapedBorder = ({ children, className, variant = 'sky' }: TextWrapedBorderProps) => {
  const variantStyles = getVariantStyles(variant);
  const defaulCssBorder = `pointer-events-none group-hover/cover:opacity-100 group h-3 w-3 border-2 ${variantStyles.border} absolute`;

  return (
    <div
      className={cn(
        'relative inline-block border-2 px-2 py-2 transition duration-200',
        variantStyles.container,
        className,
      )}
    >
      <span
        className={cn('inline-block relative z-20 transition duration-200', variantStyles.text)}
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
