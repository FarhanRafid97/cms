'use client';
import { cn } from '@/lib/utils';

export default function LayoutNavbar({
  children,
  className = '',
  containerClassName = '',
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) {
  return (
    <section className={cn('w-full border-custome-bottom md:px-0 px-3', className)}>
      <div
        className={cn(
          `container mx-auto lg:px-8 max-w-6xl border-custome-x  px-1 py-4 ${containerClassName}`,
        )}
      >
        {children}
      </div>
    </section>
  );
}
