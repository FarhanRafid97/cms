'use client';
import { useMediaQuery } from '@/hooks/useMediaQuery';
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
  const isMobile = useMediaQuery('(max-width: 768px)');
  return (
    <section className={cn('w-full border-custome-bottom', className)}>
      <div
        className={cn(
          `container mx-auto lg:px-8 max-w-6xl   py-4 ${containerClassName}`,
          isMobile ? '' : 'border-custome-x',
        )}
      >
        {children}
      </div>
    </section>
  );
}
